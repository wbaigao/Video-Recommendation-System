// 查询某个概念的直接前置知识
MATCH (pre:Concept)-[:PREREQUISITE_OF]->(target:Concept {name: '导数'})
RETURN pre.name AS prerequisite, pre.stage AS stage, pre.domain AS domain
ORDER BY pre.stage, pre.name;

// 查询某个概念的多层前置知识路径
MATCH path = (pre:Concept)-[:PREREQUISITE_OF*1..5]->(target:Concept {name: '导数'})
RETURN path
LIMIT 50;

// 查询某个概念的后续可学习内容
MATCH (target:Concept {name: '导数'})-[:PREREQUISITE_OF]->(next:Concept)
RETURN next.name AS next_concept, next.stage AS stage, next.domain AS domain
ORDER BY next.stage, next.name;

// 查询某个阶段的所有概念
MATCH (c:Concept {stage: 'university'})
RETURN c.name AS concept, c.domain AS domain, c.description AS description
ORDER BY c.domain, c.name;

// 查询从小学到大学数学的阶段结构
MATCH (c:Concept)-[:PART_OF]->(parent:Concept)
RETURN c.name AS child, parent.name AS parent, c.stage AS stage, c.domain AS domain
ORDER BY parent.name, c.stage, c.domain, c.name;
