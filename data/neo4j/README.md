# 数学知识图谱 Neo4j 数据

本目录保存数学知识图谱的 Neo4j 导入脚本。

## 文件

- `math-knowledge-graph.cypher`：创建数学概念节点和关系。
- `math-queries.cypher`：常用查询示例。

## 图谱范围 v1

当前版本覆盖四个学习阶段的核心数学概念：

- 小学数学：数感、四则运算、分数、小数、百分数、测量、图形、统计。
- 初中数学：有理数、实数、代数式、方程、不等式、函数、三角形、圆、概率。
- 高中数学：集合、逻辑、函数、三角函数、数列、向量、解析几何、复数、排列组合、统计。
- 大学数学：微积分、线性代数、概率论、统计推断、离散数学、数论、抽象代数、实分析、拓扑、最优化、数值方法。

这不是最终穷尽版，而是可运行的专业主干图谱。后续可以继续增加节点、别名、教材章节、视频资源映射和诊断问题映射。

## 导入方式

Neo4j 启动后，在 Neo4j Browser 或 `cypher-shell` 中执行：

```cypher
:source data/neo4j/math-knowledge-graph.cypher
```

如果使用 `cypher-shell`，可在项目根目录执行：

```powershell
type .\data\neo4j\math-knowledge-graph.cypher | .\tools\neo4j\<neo4j-folder>\bin\cypher-shell.bat -u neo4j -p <password>
```

注意：运行 Neo4j 前需要先解压并启动本地 Neo4j Server。
