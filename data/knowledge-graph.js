window.KNOWLEDGE_GRAPH_DATA = {
  calculus: {
    title: "微积分基础",
    description: "用于测试“前置知识感知”的教育视频推荐知识图谱。",
    concepts: [
      {
        id: "function",
        label: "函数",
        level: 1,
        x: 12,
        y: 48,
        description: "函数表示一种输入与输出之间的对应关系，每个输入只能对应一个输出。",
        questions: [
          "什么样的关系可以称为函数？",
          "如何判断一个函数的输入和输出？"
        ]
      },
      {
        id: "graph",
        label: "图像",
        level: 1,
        x: 20,
        y: 20,
        description: "图像用于直观表示函数的变化趋势和数值关系。",
        questions: [
          "从函数图像中可以读出哪些信息？",
          "图像如何体现函数的递增和递减？"
        ]
      },
      {
        id: "limit",
        label: "极限",
        level: 2,
        x: 38,
        y: 40,
        description: "极限描述自变量逐渐接近某个点时，函数值趋近的结果。",
        questions: [
          "极限主要描述什么数学现象？",
          "当函数在某点没有定义时，该点的极限一定不存在吗？"
        ]
      },
      {
        id: "continuity",
        label: "连续性",
        level: 2,
        x: 40,
        y: 68,
        description: "连续性表示函数在某点或某个区间内没有断裂。",
        questions: [
          "函数在一点连续需要满足哪些条件？",
          "连续性和极限之间有什么关系？"
        ]
      },
      {
        id: "derivative",
        label: "导数",
        level: 3,
        x: 62,
        y: 35,
        description: "导数表示函数的瞬时变化率，也可以理解为切线斜率。",
        questions: [
          "从几何角度看，导数表示什么？",
          "为什么定义导数时需要使用极限？"
        ]
      },
      {
        id: "chain-rule",
        label: "链式法则",
        level: 4,
        x: 82,
        y: 22,
        description: "链式法则用于求复合函数的导数。",
        questions: [
          "什么情况下需要使用链式法则？",
          "如何识别复合函数中的内层函数和外层函数？"
        ]
      },
      {
        id: "optimization",
        label: "最优化",
        level: 4,
        x: 84,
        y: 48,
        description: "最优化问题使用导数寻找函数的最大值或最小值。",
        questions: [
          "导数如何帮助寻找最大值或最小值？",
          "临界点在最优化问题中有什么意义？"
        ]
      },
      {
        id: "integral",
        label: "积分",
        level: 3,
        x: 62,
        y: 72,
        description: "积分用于描述累积量，也常被解释为曲线下方的面积。",
        questions: [
          "从图像角度看，积分可以表示什么？",
          "积分和累积量之间有什么关系？"
        ]
      },
      {
        id: "definite-integral",
        label: "定积分",
        level: 4,
        x: 84,
        y: 76,
        description: "定积分是在指定区间上计算积分结果。",
        questions: [
          "定积分上下限分别表示什么？",
          "定积分和不定积分有什么区别？"
        ]
      }
    ],
    edges: [
      { from: "function", to: "limit", relation: "prerequisite_of" },
      { from: "graph", to: "limit", relation: "supports" },
      { from: "limit", to: "continuity", relation: "prerequisite_of" },
      { from: "limit", to: "derivative", relation: "prerequisite_of" },
      { from: "function", to: "derivative", relation: "prerequisite_of" },
      { from: "derivative", to: "chain-rule", relation: "prerequisite_of" },
      { from: "derivative", to: "optimization", relation: "prerequisite_of" },
      { from: "continuity", to: "integral", relation: "supports" },
      { from: "function", to: "integral", relation: "prerequisite_of" },
      { from: "integral", to: "definite-integral", relation: "prerequisite_of" }
    ],
    videos: [
      {
        id: "v1",
        title: "理解函数与函数图像",
        concepts: ["function", "graph"],
        difficulty: "beginner",
        duration: "12 分钟"
      },
      {
        id: "v2",
        title: "直观理解极限",
        concepts: ["function", "limit"],
        difficulty: "beginner",
        duration: "16 分钟"
      },
      {
        id: "v3",
        title: "连续与不连续",
        concepts: ["limit", "continuity"],
        difficulty: "beginner",
        duration: "14 分钟"
      },
      {
        id: "v4",
        title: "导数：瞬时变化率",
        concepts: ["limit", "derivative"],
        difficulty: "intermediate",
        duration: "18 分钟"
      },
      {
        id: "v5",
        title: "复合函数的链式法则",
        concepts: ["derivative", "chain-rule"],
        difficulty: "intermediate",
        duration: "20 分钟"
      },
      {
        id: "v6",
        title: "积分与曲线下面积",
        concepts: ["function", "integral", "definite-integral"],
        difficulty: "intermediate",
        duration: "19 分钟"
      }
    ]
  },
  python: {
    title: "Python 编程基础",
    description: "用于后续扩展的编程概念知识图谱。",
    concepts: [
      {
        id: "variables",
        label: "变量",
        level: 1,
        x: 16,
        y: 42,
        description: "变量是程序中用于保存和引用数据的名称。",
        questions: ["变量通常用来做什么？", "在 Python 中如何给变量赋值？"]
      },
      {
        id: "types",
        label: "数据类型",
        level: 1,
        x: 18,
        y: 66,
        description: "数据类型表示数据的类别，例如字符串、数字和布尔值。",
        questions: ["请举出两种常见的 Python 数据类型。", "为什么数据类型会影响程序运行？"]
      },
      {
        id: "conditionals",
        label: "条件语句",
        level: 2,
        x: 42,
        y: 34,
        description: "条件语句根据判断结果决定执行哪一段代码。",
        questions: ["if 语句的作用是什么？", "布尔表达式在条件语句中起什么作用？"]
      },
      {
        id: "loops",
        label: "循环",
        level: 2,
        x: 42,
        y: 68,
        description: "循环用于重复执行一段代码。",
        questions: ["什么情况下适合使用循环？", "for 循环和 while 循环有什么区别？"]
      },
      {
        id: "functions",
        label: "函数",
        level: 3,
        x: 66,
        y: 50,
        description: "函数是可重复使用的代码块，可以接收输入并返回结果。",
        questions: ["为什么编程中需要函数？", "函数参数是什么意思？"]
      },
      {
        id: "lists",
        label: "列表",
        level: 2,
        x: 40,
        y: 84,
        description: "列表是一种有序集合，可以保存多个值。",
        questions: ["如何访问列表中的某个元素？", "为什么列表经常和循环一起使用？"]
      },
      {
        id: "modules",
        label: "模块",
        level: 4,
        x: 86,
        y: 48,
        description: "模块是可复用的代码文件或库。",
        questions: ["import 的作用是什么？", "为什么程序员会使用模块？"]
      }
    ],
    edges: [
      { from: "variables", to: "conditionals", relation: "prerequisite_of" },
      { from: "types", to: "conditionals", relation: "prerequisite_of" },
      { from: "variables", to: "loops", relation: "prerequisite_of" },
      { from: "types", to: "lists", relation: "supports" },
      { from: "loops", to: "functions", relation: "supports" },
      { from: "conditionals", to: "functions", relation: "supports" },
      { from: "functions", to: "modules", relation: "prerequisite_of" }
    ],
    videos: [
      { id: "p1", title: "Python 变量与数据类型", concepts: ["variables", "types"], difficulty: "beginner", duration: "11 分钟" },
      { id: "p2", title: "Python 条件语句", concepts: ["conditionals"], difficulty: "beginner", duration: "13 分钟" },
      { id: "p3", title: "循环与列表", concepts: ["loops", "lists"], difficulty: "beginner", duration: "15 分钟" },
      { id: "p4", title: "编写 Python 函数", concepts: ["functions"], difficulty: "intermediate", duration: "17 分钟" },
      { id: "p5", title: "使用 Python 模块", concepts: ["modules"], difficulty: "intermediate", duration: "10 分钟" }
    ]
  }
};
