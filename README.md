# 数学知识图谱

这是教育视频推荐系统的第一个模块，当前重点解决“根据用户输入数学概念，查询该概念的前置知识图谱”的问题。

当前版本使用项目内置的数学知识库，不需要每次调用 LLM。知识库同时提供网页 JSON 版本和 Neo4j Cypher 版本。

- 小学到大学核心数学概念
- 前置知识关系
- 所属关系
- 相关关系
- 可在网页中直接搜索和可视化
- 可导入 Neo4j 数据库

直接在浏览器中打开 `index.html` 即可运行原型。

## 当前数据文件

- `data/math-knowledge-graph.json`：网页直接读取的数学知识库。
- `data/neo4j/math-knowledge-graph.cypher`：Neo4j 导入脚本。
- `data/neo4j/math-queries.cypher`：Neo4j 查询示例。

## 网页查询流程

```text
输入数学概念，例如“导数”
  -> 在本地数学知识库中查找节点
  -> 查询多层前置知识
  -> 查询后续可学习内容和相关概念
  -> 生成局部图谱
  -> 在 HTML 页面中可视化展示
```

## Neo4j

Neo4j 数据暂时以 Cypher 脚本形式保存。启动 Neo4j 后，可以执行 `data/neo4j/math-knowledge-graph.cypher` 将图谱写入数据库。

当前网页不依赖 Neo4j 正在运行，因为 GitHub Pages 只能托管静态文件。后续正式系统可以让后端连接 Neo4j 查询图谱。

## 本地运行后端

如果需要运行后端：

```powershell
node server.js
```

然后打开：

```text
http://localhost:3000
```

## 后续模块

1. 继续扩充数学知识库节点和别名。
2. 将数学知识库导入 Neo4j。
3. 后端连接 Neo4j 查询图谱。
4. 根据图谱节点生成诊断问题。
5. 接入真实视频元数据和字幕文本。
