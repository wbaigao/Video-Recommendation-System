const state = {
  graph: null,
  selectedId: null
};

const dom = {
  topicInput: document.querySelector("#topicInput"),
  apiKeyInput: document.querySelector("#apiKeyInput"),
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

const graphSchema = {
  type: "object",
  additionalProperties: false,
  required: ["topic", "summary", "nodes", "edges"],
  properties: {
    topic: { type: "string" },
    summary: { type: "string" },
    nodes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "label", "type", "description", "x", "y"],
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          type: { type: "string", enum: ["target", "prerequisite", "concept"] },
          description: { type: "string" },
          x: { type: "number" },
          y: { type: "number" }
        }
      }
    },
    edges: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["from", "to", "relation", "label"],
        properties: {
          from: { type: "string" },
          to: { type: "string" },
          relation: {
            type: "string",
            enum: ["prerequisite_of", "part_of", "related_to", "includes", "applied_to", "contrasts_with", "supports"]
          },
          label: { type: "string" }
        }
      }
    }
  }
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

async function generateKnowledgeGraphWithLLM(topicValue, apiKey) {
  const topic = normalizeTopic(topicValue) || "导数";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "你是教育技术研究系统中的知识图谱生成模块。请根据用户输入的学习主题，生成一个局部、可学习、可用于教育视频推荐的知识图谱。必须使用中文。不要生成诊断问题。"
        },
        {
          role: "user",
          content: `学习主题：${topic}\n\n要求：\n1. 生成 7 到 12 个节点。\n2. 必须包含一个 type 为 target 的目标节点，label 使用用户输入主题。\n3. 至少包含 2 个 prerequisite 前置知识节点。\n4. 其他节点可以是定义、性质、方法、应用、常见误区、相关概念等。\n5. edges 必须只引用 nodes 中存在的 id。\n6. id 使用简短英文或拼音，不能重复。\n7. x 和 y 是可视化坐标，范围 5 到 95。`
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "knowledge_graph",
          strict: true,
          schema: graphSchema
        }
      }
    })
  });

  const body = await response.json();
  if (!response.ok) {
    const message = body.error?.message || "LLM 请求失败。";
    throw new Error(message);
  }

  const text = extractResponseText(body);
  if (!text) {
    throw new Error("LLM 没有返回可解析的 JSON。");
  }

  return normalizeGraph(JSON.parse(text), topic, "openai-structured-output");
}

function extractResponseText(body) {
  if (body.output_text) {
    return body.output_text;
  }

  const chunks = [];
  for (const item of body.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) {
        chunks.push(content.text);
      }
    }
  }
  return chunks.join("");
}

function normalizeGraph(graph, topic, generator) {
  const seen = new Set();
  const nodes = graph.nodes
    .map((node, index) => ({
      id: toId(node.id || node.label || `${topic}-${index}`),
      label: node.label || `${topic}${index + 1}`,
      type: node.type === "target" || node.type === "prerequisite" ? node.type : "concept",
      description: node.description || `${node.label} 是与 ${topic} 相关的知识点。`,
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
    nodes.unshift({
      id: toId(topic),
      label: topic,
      type: "target",
      description: `${topic} 是当前学习目标。`,
      x: 50,
      y: 48
    });
  }

  const nodeIds = new Set(nodes.map((node) => node.id));
  const edges = graph.edges
    .map((edge) => ({
      from: toId(edge.from || ""),
      to: toId(edge.to || ""),
      relation: edge.relation || "related_to",
      label: edge.label || relationLabel(edge.relation)
    }))
    .filter((edge) => nodeIds.has(edge.from) && nodeIds.has(edge.to) && edge.from !== edge.to);

  return {
    topic: graph.topic || topic,
    summary: graph.summary || `围绕 ${topic} 自动生成的局部知识图谱。`,
    generatedAt: new Date().toISOString(),
    generator,
    nodes,
    edges
  };
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
    part_of: "组成",
    related_to: "相关",
    includes: "包含",
    applied_to: "应用",
    contrasts_with: "对比",
    supports: "支撑"
  };
  return labels[relation] || "相关";
}

function getNode(id) {
  return state.graph.nodes.find((node) => node.id === id);
}

async function generateGraph() {
  const topic = normalizeTopic(dom.topicInput.value) || "导数";
  const apiKey = dom.apiKeyInput.value.trim();
  dom.generateBtn.disabled = true;
  dom.statusText.textContent = apiKey ? "正在调用 LLM 生成知识图谱..." : "未输入 API Key，使用本地规则生成器。";

  try {
    state.graph = apiKey ? await generateKnowledgeGraphWithLLM(topic, apiKey) : generateKnowledgeGraph(topic);
    dom.statusText.textContent = apiKey ? "LLM 知识图谱生成完成。" : "本地规则知识图谱生成完成。";
  } catch (error) {
    console.error(error);
    state.graph = generateKnowledgeGraph(topic);
    dom.statusText.textContent = `LLM 调用失败，已使用本地规则图谱：${error.message}`;
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
