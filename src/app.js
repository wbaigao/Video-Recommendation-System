const state = {
  database: null,
  graph: null,
  selectedId: null
};

const dom = {
  topicInput: document.querySelector("#topicInput"),
  generateBtn: document.querySelector("#generateBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  graph: document.querySelector("#graph"),
  graphTitle: document.querySelector("#graphTitle"),
  statusText: document.querySelector("#statusText"),
  selectedConcept: document.querySelector("#selectedConcept"),
  selectedDescription: document.querySelector("#selectedDescription"),
  relationList: document.querySelector("#relationList"),
  jsonPreview: document.querySelector("#jsonPreview")
};

const stageLabels = {
  all: "全阶段",
  primary: "小学",
  middle: "初中",
  high: "高中",
  university: "大学"
};

const relationLabels = {
  PREREQUISITE_OF: "前置",
  PART_OF: "属于",
  RELATED_TO: "相关"
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
}

async function loadDatabase() {
  if (window.MATH_KNOWLEDGE_GRAPH) {
    state.database = window.MATH_KNOWLEDGE_GRAPH;
    return;
  }

  const response = await fetch("./data/math-knowledge-graph.json");
  if (!response.ok) {
    throw new Error("数学知识库加载失败。");
  }
  state.database = await response.json();
}

function findConcept(query) {
  const normalized = normalizeText(query);
  if (!normalized) {
    return null;
  }

  const exact = state.database.nodes.find((node) => {
    return normalizeText(node.id) === normalized || normalizeText(node.name) === normalized || normalizeText(node.label) === normalized;
  });
  if (exact) {
    return exact;
  }

  return state.database.nodes.find((node) => {
    return normalizeText(node.name).includes(normalized) || normalized.includes(normalizeText(node.name));
  });
}

function getNode(id) {
  return state.graph.nodes.find((node) => node.id === id);
}

function getDatabaseNode(id) {
  return state.database.nodes.find((node) => node.id === id);
}

function getIncomingPrerequisites(targetId, maxDepth = 5) {
  const visited = new Set();
  const result = [];

  function visit(id, depth) {
    if (depth > maxDepth) {
      return;
    }

    const incoming = state.database.edges.filter((edge) => edge.type === "PREREQUISITE_OF" && edge.to === id);
    for (const edge of incoming) {
      if (visited.has(edge.from)) {
        continue;
      }
      visited.add(edge.from);
      visit(edge.from, depth + 1);
      result.push(edge.from);
    }
  }

  visit(targetId, 1);
  return [...new Set(result)];
}

function getOutgoingNext(targetId) {
  return state.database.edges
    .filter((edge) => edge.type === "PREREQUISITE_OF" && edge.from === targetId)
    .map((edge) => edge.to);
}

function getRelatedNodes(targetId) {
  return state.database.edges
    .filter((edge) => edge.type !== "PREREQUISITE_OF" && (edge.from === targetId || edge.to === targetId))
    .map((edge) => (edge.from === targetId ? edge.to : edge.from));
}

function buildSubgraph(target) {
  const prerequisiteIds = getIncomingPrerequisites(target.id);
  const nextIds = getOutgoingNext(target.id);
  const relatedIds = getRelatedNodes(target.id);
  const selectedIds = [...new Set([...prerequisiteIds, target.id, ...nextIds, ...relatedIds])];
  const nodes = selectedIds.map((id) => {
    const source = getDatabaseNode(id);
    return {
      id: source.id,
      label: source.name,
      name: source.name,
      stage: source.stage,
      domain: source.domain,
      description: source.description,
      type: classifyNode(source.id, target.id, prerequisiteIds, nextIds),
      depth: source.id === target.id ? 0 : prerequisiteIds.includes(source.id) ? -1 : 1,
      x: 50,
      y: 50
    };
  });

  const nodeIds = new Set(nodes.map((node) => node.id));
  const edges = state.database.edges
    .filter((edge) => nodeIds.has(edge.from) && nodeIds.has(edge.to))
    .map((edge) => ({
      from: edge.from,
      to: edge.to,
      relation: edge.relation,
      type: edge.type,
      label: relationLabels[edge.type] || "相关"
    }));

  return {
    topic: target.name,
    summary: `从数学知识库中查询“${target.name}”的前置知识、后续知识和相关概念。`,
    generator: "static-math-knowledge-base-v1",
    nodeCount: nodes.length,
    edgeCount: edges.length,
    nodes: layoutGraph(nodes),
    edges
  };
}

function classifyNode(id, targetId, prerequisiteIds, nextIds) {
  if (id === targetId) {
    return "target";
  }
  if (prerequisiteIds.includes(id)) {
    return "prerequisite";
  }
  if (nextIds.includes(id)) {
    return "application";
  }
  return "related";
}

function layoutGraph(nodes) {
  const groups = {
    prerequisite: nodes.filter((node) => node.type === "prerequisite"),
    target: nodes.filter((node) => node.type === "target"),
    other: nodes.filter((node) => !["prerequisite", "target"].includes(node.type))
  };

  placeGroup(groups.prerequisite, 18, 12, 88);
  placeGroup(groups.target, 50, 44, 56);
  placeGroup(groups.other, 78, 12, 88);
  return nodes;
}

function placeGroup(nodes, x, yStart, yEnd) {
  if (!nodes.length) {
    return;
  }
  const step = nodes.length === 1 ? 0 : (yEnd - yStart) / (nodes.length - 1);
  nodes.forEach((node, index) => {
    node.x = x;
    node.y = nodes.length === 1 ? (yStart + yEnd) / 2 : yStart + step * index;
  });
}

function createNotFoundGraph(topic) {
  return {
    topic,
    summary: "当前数学知识库暂未收录该概念。",
    generator: "static-math-knowledge-base-v1",
    nodeCount: 1,
    edgeCount: 0,
    nodes: [
      {
        id: "not-found",
        label: "未收录",
        name: "未收录",
        type: "target",
        stage: "all",
        domain: "unknown",
        description: `当前数学知识库中没有找到“${topic}”。可以后续扩充该概念及其前置关系。`,
        x: 50,
        y: 50
      }
    ],
    edges: []
  };
}

function generateGraph() {
  const topic = dom.topicInput.value.trim() || "导数";
  const target = findConcept(topic);
  state.graph = target ? buildSubgraph(target) : createNotFoundGraph(topic);
  state.selectedId = state.graph.nodes.find((node) => node.type === "target")?.id || state.graph.nodes[0].id;
  dom.statusText.textContent = target
    ? `已从数学知识库查询到 ${state.graph.nodes.length} 个相关节点、${state.graph.edges.length} 条关系。`
    : "当前知识库未收录该概念。";
  render();
}

function renderGraph() {
  const width = dom.graph.clientWidth || 900;
  const height = dom.graph.clientHeight || 620;
  const nodesById = Object.fromEntries(state.graph.nodes.map((node) => [node.id, node]));
  const scaleX = (value) => (value / 100) * width;
  const scaleY = (value) => (value / 100) * height;

  const edges = state.graph.edges
    .map((edge) => {
      const from = nodesById[edge.from];
      const to = nodesById[edge.to];
      return `
        <g class="edge-group">
          <line class="edge ${edge.relation}" x1="${scaleX(from.x)}" y1="${scaleY(from.y)}" x2="${scaleX(to.x)}" y2="${scaleY(to.y)}"></line>
          <text class="edge-label" x="${(scaleX(from.x) + scaleX(to.x)) / 2}" y="${(scaleY(from.y) + scaleY(to.y)) / 2 - 6}">${escapeHtml(edge.label)}</text>
        </g>
      `;
    })
    .join("");

  const nodes = state.graph.nodes
    .map((node) => {
      const status = node.id === state.selectedId ? "selected" : node.type;
      return `
        <g class="node ${status}" data-node="${node.id}" transform="translate(${scaleX(node.x)}, ${scaleY(node.y)})">
          <circle r="38"></circle>
          ${splitLabel(node.label)
            .map((line, index, lines) => `<text y="${(index - (lines.length - 1) / 2) * 15 + 4}">${escapeHtml(line)}</text>`)
            .join("")}
        </g>
      `;
    })
    .join("");

  dom.graph.setAttribute("viewBox", `0 0 ${width} ${height}`);
  dom.graph.innerHTML = `${edges}${nodes}`;
}

function splitLabel(label) {
  if (label.length <= 7) {
    return [label];
  }
  const midpoint = Math.ceil(label.length / 2);
  return [label.slice(0, midpoint), label.slice(midpoint)];
}

function renderInspector() {
  const node = getNode(state.selectedId);
  dom.selectedConcept.textContent = node.label;
  dom.selectedDescription.textContent = `${node.description}（阶段：${stageLabels[node.stage] || node.stage}；领域：${node.domain}）`;

  const relatedEdges = state.graph.edges.filter((edge) => edge.from === node.id || edge.to === node.id);
  dom.relationList.innerHTML = relatedEdges.length
    ? relatedEdges
        .map((edge) => {
          const from = getNode(edge.from).label;
          const to = getNode(edge.to).label;
          return `<li><strong>${escapeHtml(from)}</strong> → <strong>${escapeHtml(to)}</strong><span class="empty"> · ${escapeHtml(edge.label)}</span></li>`;
        })
        .join("")
    : `<li class="empty">当前节点暂无关系。</li>`;

  dom.jsonPreview.textContent = JSON.stringify(state.graph, null, 2);
}

function render() {
  dom.graphTitle.textContent = `${state.graph.topic} 数学知识图谱`;
  renderGraph();
  renderInspector();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function copyGraphJson() {
  const json = JSON.stringify(state.graph, null, 2);
  try {
    await navigator.clipboard.writeText(json);
    dom.exportBtn.textContent = "已复制";
    window.setTimeout(() => {
      dom.exportBtn.textContent = "复制 JSON";
    }, 1200);
  } catch {
    dom.exportBtn.textContent = "复制失败";
    window.setTimeout(() => {
      dom.exportBtn.textContent = "复制 JSON";
    }, 1200);
  }
}

dom.generateBtn.addEventListener("click", generateGraph);
dom.topicInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateGraph();
  }
});

document.querySelector(".suggestions").addEventListener("click", (event) => {
  const target = event.target.closest("[data-example]");
  if (!target) {
    return;
  }
  dom.topicInput.value = target.dataset.example;
  generateGraph();
});

dom.graph.addEventListener("click", (event) => {
  const target = event.target.closest("[data-node]");
  if (!target) {
    return;
  }
  state.selectedId = target.dataset.node;
  render();
});

dom.exportBtn.addEventListener("click", copyGraphJson);
window.addEventListener("resize", renderGraph);

loadDatabase()
  .then(() => {
    dom.statusText.textContent = `数学知识库已加载：${state.database.nodeCount} 个概念，${state.database.edgeCount} 条关系。`;
    generateGraph();
  })
  .catch((error) => {
    console.error(error);
    state.graph = createNotFoundGraph("数学知识库");
    state.selectedId = state.graph.nodes[0].id;
    dom.statusText.textContent = error.message;
    render();
  });
