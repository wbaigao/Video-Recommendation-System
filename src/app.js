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
        required: ["id", "label", "type", "depth", "description", "x", "y"],
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          type: {
            type: "string",
            enum: ["target", "prerequisite", "core", "related", "application"]
          },
          depth: {
            type: "integer",
            description: "0 表示目标概念，负数表示前置知识，正数表示目标之后的延伸概念。"
          },
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
            enum: ["prerequisite_of", "depends_on", "part_of", "related_to", "applied_to", "extends_to"]
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
            "你是教育推荐系统中的知识图谱生成模块。你的任务是为一个学习主题生成局部知识图谱，重点是发现学习该主题之前必须掌握的具体前置知识。只输出符合 schema 的 JSON。不要生成诊断问题。"
        },
        {
          role: "user",
          content: buildKnowledgeGraphPrompt(topic)
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
    throw new Error(body.error?.message || "LLM 请求失败。");
  }

  const text = extractResponseText(body);
  if (!text) {
    throw new Error("LLM 没有返回可解析的 JSON。");
  }

  return normalizeGraph(JSON.parse(text), topic, "openai-structured-output");
}

function buildKnowledgeGraphPrompt(topic) {
  return `
学习主题：${topic}

请生成“学习 ${topic} 之前需要了解什么”的局部知识图谱。

核心要求：
1. 节点必须是具体知识点，不能使用“${topic}的基础概念”“${topic}的核心定义”“${topic}的相关概念”这类模板化节点。
2. 至少生成 3 个具体 prerequisite 节点，并按学习先后形成前置链。
3. 必须包含 1 个 target 节点，label 必须是“${topic}”。
4. 可以包含少量 core、related、application 节点，用来说明 ${topic} 本身和后续用途。
5. edges 必须表达真实学习依赖，例如 A prerequisite_of B 表示学习 B 之前应先理解 A。
6. 不要为了凑数量加入泛泛节点；宁可少一些，也要具体、可学习、可解释。
7. description 要说明该节点为什么和学习 ${topic} 有关。
8. x、y 是可视化坐标，范围 5 到 95。前置知识放左侧，目标放中间，延伸概念放右侧。

输出目标：
让系统能够根据这张图谱判断用户学习 ${topic} 之前应该先检查哪些前置知识。
`.trim();
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
  const apiKey = dom.apiKeyInput.value.trim();
  dom.generateBtn.disabled = true;
  dom.statusText.textContent = apiKey ? "正在调用 LLM 分析具体前置知识..." : "请填写 API Key。没有 LLM 时不会伪造具体前置知识。";

  try {
    state.graph = apiKey ? await generateKnowledgeGraphWithLLM(topic, apiKey) : createPlaceholderGraph(topic);
    dom.statusText.textContent = apiKey ? "LLM 已生成具体前置知识图谱。" : "当前是占位图：填写 API Key 后可生成真实图谱。";
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

generateGraph();
