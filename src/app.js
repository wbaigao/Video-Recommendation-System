const state = {
  graph: null,
  selectedId: null
};

const dom = {
  topicInput: document.querySelector("#topicInput"),
  generateBtn: document.querySelector("#generateBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  graph: document.querySelector("#graph"),
  graphTitle: document.querySelector("#graphTitle"),
  selectedConcept: document.querySelector("#selectedConcept"),
  selectedDescription: document.querySelector("#selectedDescription"),
  relationList: document.querySelector("#relationList"),
  jsonPreview: document.querySelector("#jsonPreview")
};

function normalizeTopic(value) {
  return value.trim().replace(/\s+/g, " ");
}

function toId(label) {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

function createNode(topic, suffix, type, x, y, description) {
  const label = suffix ? `${topic}${suffix}` : topic;
  return {
    id: suffix ? `${toId(topic)}-${toId(suffix)}` : toId(topic),
    label,
    type,
    x,
    y,
    description
  };
}

function generateKnowledgeGraph(topicValue) {
  const topic = normalizeTopic(topicValue) || "导数";

  const nodes = [
    createNode(topic, "", "target", 50, 48, `${topic} 是当前用户输入的学习目标，系统会围绕它生成可解释的概念关系。`),
    createNode(topic, "的基础概念", "prerequisite", 16, 28, `学习 ${topic} 之前通常需要先理解的基础概念。`),
    createNode(topic, "的前置知识", "prerequisite", 18, 68, `支撑理解 ${topic} 的前置知识点，可用于后续判断学习者是否具备学习条件。`),
    createNode(topic, "的核心定义", "concept", 46, 18, `${topic} 的定义、基本含义和核心解释。`),
    createNode(topic, "的表示方法", "concept", 74, 22, `${topic} 在公式、图像、文字或代码中的表达方式。`),
    createNode(topic, "的关键性质", "concept", 78, 48, `${topic} 的重要性质、规则或约束条件。`),
    createNode(topic, "的解题方法", "concept", 72, 74, `围绕 ${topic} 的典型解题步骤、使用方法或操作流程。`),
    createNode(topic, "的应用场景", "concept", 46, 82, `${topic} 在实际问题、课程内容或视频案例中的应用。`),
    createNode(topic, "的常见误区", "concept", 28, 48, `学习 ${topic} 时容易混淆或理解错误的地方。`)
  ];

  const rootId = toId(topic);
  const nodeId = (suffix) => `${rootId}-${toId(suffix)}`;
  const edges = [
    { from: nodeId("的基础概念"), to: rootId, relation: "prerequisite_of", label: "前置" },
    { from: nodeId("的前置知识"), to: rootId, relation: "prerequisite_of", label: "前置" },
    { from: rootId, to: nodeId("的核心定义"), relation: "has_definition", label: "定义" },
    { from: nodeId("的核心定义"), to: nodeId("的表示方法"), relation: "represented_by", label: "表示" },
    { from: nodeId("的核心定义"), to: nodeId("的关键性质"), relation: "has_property", label: "性质" },
    { from: nodeId("的关键性质"), to: nodeId("的解题方法"), relation: "supports_method", label: "方法" },
    { from: nodeId("的解题方法"), to: nodeId("的应用场景"), relation: "applied_to", label: "应用" },
    { from: nodeId("的常见误区"), to: rootId, relation: "clarifies", label: "澄清" },
    { from: nodeId("的前置知识"), to: nodeId("的核心定义"), relation: "supports", label: "支撑" }
  ];

  return {
    topic,
    generatedAt: new Date().toISOString(),
    generator: "rule-based-dynamic-generator-v1",
    nodes,
    edges
  };
}

function getNode(id) {
  return state.graph.nodes.find((node) => node.id === id);
}

function generateGraph() {
  state.graph = generateKnowledgeGraph(dom.topicInput.value);
  state.selectedId = state.graph.nodes[0].id;
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
            .map((line, index, lines) => `<text y="${(index - (lines.length - 1) / 2) * 15 + 4}">${line}</text>`)
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
          return `<li><strong>${from}</strong> → <strong>${to}</strong><span class="empty"> · ${edge.label}</span></li>`;
        })
        .join("")
    : `<li class="empty">当前节点暂无关系。</li>`;

  dom.jsonPreview.textContent = JSON.stringify(state.graph, null, 2);
}

function render() {
  dom.graphTitle.textContent = `${state.graph.topic} 知识图谱`;
  renderGraph();
  renderInspector();
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

generateGraph();
