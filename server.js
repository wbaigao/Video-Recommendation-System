const http = require("http");
const fs = require("fs");
const path = require("path");

loadEnvFile(path.join(__dirname, ".env"));

const port = Number(process.env.PORT || 3000);
const publicDir = __dirname;

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
          depth: { type: "integer" },
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

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/knowledge-graph") {
      await handleKnowledgeGraph(req, res);
      return;
    }

    if (req.method === "GET") {
      serveStatic(req, res);
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Server error" });
  }
});

server.listen(port, () => {
  console.log(`Knowledge graph server running at http://localhost:${port}`);
});

async function handleKnowledgeGraph(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    sendJson(res, 500, { error: "OPENAI_API_KEY is not configured on the server." });
    return;
  }

  const body = await readJson(req);
  const topic = normalizeTopic(body.topic || "导数");
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

  const result = await response.json();
  if (!response.ok) {
    sendJson(res, response.status, {
      error: result.error?.message || "OpenAI request failed."
    });
    return;
  }

  const text = extractResponseText(result);
  if (!text) {
    sendJson(res, 502, { error: "OpenAI returned no parseable JSON text." });
    return;
  }

  const graph = JSON.parse(text);
  sendJson(res, 200, {
    ...graph,
    generatedAt: new Date().toISOString(),
    generator: "server-openai-structured-output"
  });
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

function serveStatic(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const safePath = path
    .normalize(urlPath)
    .replace(/^(\.\.[/\\])+/, "")
    .replace(/^[/\\]+/, "");
  const filePath = path.join(publicDir, safePath === "/" ? "index.html" : safePath);

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": getContentType(filePath) });
    res.end(data);
  });
}

function getContentType(filePath) {
  const ext = path.extname(filePath);
  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8"
  };
  return types[ext] || "application/octet-stream";
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function normalizeTopic(value) {
  return String(value || "").trim().replace(/\s+/g, " ") || "导数";
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (key && !process.env[key]) {
      process.env[key] = value.replace(/^["']|["']$/g, "");
    }
  }
}
