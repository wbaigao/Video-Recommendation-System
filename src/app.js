const state = {
  graph: null,
  selectedId: null
};

const dom = {
  topicInput: document.querySelector("#topicInput"),
  apiEndpointInput: document.querySelector("#apiEndpointInput"),
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

function normalizeTopic(value) {
  return value.trim().replace(/\s+/g, " ");
}

function toId(value) {
  const cleaned = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
  return cleaned || `node-${Math.random().toString(36).slice(2, 8)}`;
}

function createPlaceholderGraph(topicValue) {
  const topic = normalizeTopic(topicValue) || "导数";
  const targetId = toId(topic);
  return {
    topic,
    summary: "没有填写 API Key 时，系统不会伪造具体前置知识。请填写 API Key 后由 LLM 生成真实局部知识图谱。",
    generatedAt: new Date().toISOString(),
    generator: "placeholder-requires-llm",
    nodes: [
      {
        id: targetId,
        label: topic,
        type: "target",
        depth: 0,
        x: 50,
        y: 48,
        description: `${topic} 是当前学习目标。要获得真实前置知识链，请填写 OpenAI API Key 后重新生成。`
      },
      {
        id: "llm-required",
        label: "需要 LLM 分析",
        type: "prerequisite",
        depth: -1,
        x: 24,
        y: 42,
        description: "具体前置知识不能用固定模板可靠生成，需要 LLM 根据主题语义判断。"
      },
      {
        id: "validated-graph",
        label: "结构化校验",
        type: "core",
        depth: 1,
        x: 76,
        y: 54,
        description: "LLM 返回 nodes 和 edges 后，系统会检查节点去重和关系合法性。"
      }
    ],
    edges: [
      { from: "llm-required", to: targetId, relation: "prerequisite_of", label: "需要分析" },
      { from: targetId, to: "validated-graph", relation: "extends_to", label: "生成后校验" }
    ]
  };
}

async function generateKnowledgeGraphWithLLM(topicValue, endpoint) {
  const topic = normalizeTopic(topicValue) || "导数";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ topic })
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error?.message || "LLM 请求失败。");
  }

  return normalizeGraph(body, topic, body.generator || "backend-openai");
}

function normalizeGraph(graph, topic, generator) {
  const rawNodes = Array.isArray(graph.nodes) ? graph.nodes : [];
  const rawEdges = Array.isArray(graph.edges) ? graph.edges : [];
  const seen = new Set();

  const nodes = rawNodes
    .map((node, index) => ({
      id: toId(node.id || node.label || `${topic}-${index}`),
      label: String(node.label || `${topic}${index + 1}`).trim(),
      type: normalizeNodeType(node.type),
      depth: Number.isInteger(node.depth) ? node.depth : inferDepth(node.type),
      description: String(node.description || `${node.label || topic} 是与 ${topic} 相关的知识点。`).trim(),
      x: clampNumber(node.x, 8, 92),
      y: clampNumber(node.y, 8, 92)
    }))
    .filter((node) => {
      if (!node.id || seen.has(node.id)) {
        return false;
      }
      seen.add(node.id);
      return true;
    });

  if (!nodes.some((node) => node.type === "target")) {
    nodes.push({
      id: toId(topic),
      label: topic,
      type: "target",
      depth: 0,
      description: `${topic} 是当前学习目标。`,
      x: 50,
      y: 48
    });
  }

  const nodeIds = new Set(nodes.map((node) => node.id));
  const edges = rawEdges
    .map((edge) => ({
      from: toId(edge.from || ""),
      to: toId(edge.to || ""),
      relation: normalizeRelation(edge.relation),
      label: String(edge.label || relationLabel(edge.relation)).trim()
    }))
    .filter((edge) => nodeIds.has(edge.from) && nodeIds.has(edge.to) && edge.from !== edge.to);

  return {
    topic: graph.topic || topic,
    summary: graph.summary || `围绕 ${topic} 生成的局部前置知识图谱。`,
    generatedAt: new Date().toISOString(),
    generator,
    nodes: layoutGraph(nodes),
    edges
  };
}

function normalizeNodeType(type) {
  if (["target", "prerequisite", "core", "related", "application"].includes(type)) {
    return type;
  }
  return "related";
}

function normalizeRelation(relation) {
  if (["prerequisite_of", "depends_on", "part_of", "related_to", "applied_to", "extends_to"].includes(relation)) {
    return relation;
  }
  return "related_to";
}

function inferDepth(type) {
  if (type === "prerequisite") {
    return -1;
  }
  if (type === "target") {
    return 0;
  }
  return 1;
}

function layoutGraph(nodes) {
  const groups = {
    prerequisite: nodes.filter((node) => node.type === "prerequisite"),
    target: nodes.filter((node) => node.type === "target"),
    other: nodes.filter((node) => !["prerequisite", "target"].includes(node.type))
  };

  placeGroup(groups.prerequisite, 18, 20, 80);
  placeGroup(groups.target, 50, 40, 60);
  placeGroup(groups.other, 78, 20, 80);
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

function clampNumber(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return (min + max) / 2;
  }
  return Math.max(min, Math.min(max, number));
}

function relationLabel(relation) {
  const labels = {
    prerequisite_of: "前置",
    depends_on: "依赖",
    part_of: "组成",
    related_to: "相关",
    applied_to: "应用",
    extends_to: "延伸"
  };
  return labels[relation] || "相关";
}

function getNode(id) {
  return state.graph.nodes.find((node) => node.id === id);
}

async function generateGraph() {
  const topic = normalizeTopic(dom.topicInput.value) || "导数";
  const endpoint = dom.apiEndpointInput.value.trim();
  dom.generateBtn.disabled = true;
  dom.statusText.textContent = endpoint ? "正在请求后端，让 LLM 分析具体前置知识..." : "请填写知识图谱生成接口。";

  try {
    state.graph = endpoint ? await generateKnowledgeGraphWithLLM(topic, endpoint) : createPlaceholderGraph(topic);
    dom.statusText.textContent = endpoint ? "LLM 已生成具体前置知识图谱。" : "当前是占位图：填写接口后可生成真实图谱。";
  } catch (error) {
    console.error(error);
    state.graph = createPlaceholderGraph(topic);
    dom.statusText.textContent = `LLM 调用失败：${error.message}`;
  } finally {
    state.selectedId = (state.graph.nodes.find((node) => node.type === "target") || state.graph.nodes[0]).id;
    dom.generateBtn.disabled = false;
    render();
  }
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
          <text class="edge-label" x="${(scaleX(from.x) + scaleX(to.x)) / 2}" y="${(scaleY(from.y) + scaleY(to.y)) / 2 - 6}">${edge.label}</text>
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
  dom.selectedDescription.textContent = node.description;

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
  dom.graphTitle.textContent = `${state.graph.topic} 前置知识图谱`;
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

state.graph = createPlaceholderGraph(dom.topicInput.value);
state.selectedId = state.graph.nodes[0].id;
dom.statusText.textContent = "等待点击生成。LLM 调用由后端接口完成。";
render();
