window.KNOWLEDGE_GRAPH_DATA = {
  calculus: {
    title: "Calculus Foundations",
    description: "A small concept graph for testing prerequisite-aware educational video recommendation.",
    concepts: [
      {
        id: "function",
        label: "Function",
        level: 1,
        x: 12,
        y: 48,
        description: "A relation that maps each input to exactly one output.",
        questions: [
          "What does it mean for a relation to be a function?",
          "How can you identify the input and output of a function?"
        ]
      },
      {
        id: "graph",
        label: "Graph",
        level: 1,
        x: 20,
        y: 20,
        description: "A visual representation of how a function behaves.",
        questions: [
          "What information can you read from the graph of a function?",
          "How does a graph show increasing and decreasing behavior?"
        ]
      },
      {
        id: "limit",
        label: "Limit",
        level: 2,
        x: 38,
        y: 40,
        description: "The value a function approaches as the input gets close to a point.",
        questions: [
          "What does a limit describe?",
          "Can a limit exist when the function value at that point is undefined?"
        ]
      },
      {
        id: "continuity",
        label: "Continuity",
        level: 2,
        x: 40,
        y: 68,
        description: "A property showing that a function has no break at a point or interval.",
        questions: [
          "What conditions are needed for a function to be continuous at a point?",
          "How is continuity related to limits?"
        ]
      },
      {
        id: "derivative",
        label: "Derivative",
        level: 3,
        x: 62,
        y: 35,
        description: "A measure of instantaneous rate of change or slope of a tangent line.",
        questions: [
          "What does a derivative represent geometrically?",
          "Why are limits used to define derivatives?"
        ]
      },
      {
        id: "chain-rule",
        label: "Chain Rule",
        level: 4,
        x: 82,
        y: 22,
        description: "A rule for differentiating composite functions.",
        questions: [
          "When should the chain rule be used?",
          "How do you identify the inner and outer functions?"
        ]
      },
      {
        id: "optimization",
        label: "Optimization",
        level: 4,
        x: 84,
        y: 48,
        description: "Using derivatives to find maximum or minimum values.",
        questions: [
          "How can derivatives help find maximum or minimum values?",
          "What does a critical point mean?"
        ]
      },
      {
        id: "integral",
        label: "Integral",
        level: 3,
        x: 62,
        y: 72,
        description: "A mathematical tool for accumulation and area under a curve.",
        questions: [
          "What does an integral represent visually?",
          "How are integrals related to accumulated quantities?"
        ]
      },
      {
        id: "definite-integral",
        label: "Definite Integral",
        level: 4,
        x: 84,
        y: 76,
        description: "An integral evaluated over a specific interval.",
        questions: [
          "What do the lower and upper limits of integration mean?",
          "How is a definite integral different from an indefinite integral?"
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
        title: "Understanding Functions and Graphs",
        concepts: ["function", "graph"],
        difficulty: "beginner",
        duration: "12 min"
      },
      {
        id: "v2",
        title: "Limits Intuitively Explained",
        concepts: ["function", "limit"],
        difficulty: "beginner",
        duration: "16 min"
      },
      {
        id: "v3",
        title: "Continuity and Discontinuity",
        concepts: ["limit", "continuity"],
        difficulty: "beginner",
        duration: "14 min"
      },
      {
        id: "v4",
        title: "Derivative as Instantaneous Rate of Change",
        concepts: ["limit", "derivative"],
        difficulty: "intermediate",
        duration: "18 min"
      },
      {
        id: "v5",
        title: "Chain Rule for Composite Functions",
        concepts: ["derivative", "chain-rule"],
        difficulty: "intermediate",
        duration: "20 min"
      },
      {
        id: "v6",
        title: "Integrals and Area Under Curves",
        concepts: ["function", "integral", "definite-integral"],
        difficulty: "intermediate",
        duration: "19 min"
      }
    ]
  },
  python: {
    title: "Python Programming Basics",
    description: "A compact programming concept graph for later expansion.",
    concepts: [
      {
        id: "variables",
        label: "Variables",
        level: 1,
        x: 16,
        y: 42,
        description: "Named references to values used in a program.",
        questions: ["What is a variable used for?", "How do you assign a value to a variable in Python?"]
      },
      {
        id: "types",
        label: "Data Types",
        level: 1,
        x: 18,
        y: 66,
        description: "Categories of values such as strings, numbers, and booleans.",
        questions: ["Name two common Python data types.", "Why does the type of a value matter?"]
      },
      {
        id: "conditionals",
        label: "Conditionals",
        level: 2,
        x: 42,
        y: 34,
        description: "Control flow statements that run code depending on a condition.",
        questions: ["What does an if statement do?", "What is the role of a boolean expression?"]
      },
      {
        id: "loops",
        label: "Loops",
        level: 2,
        x: 42,
        y: 68,
        description: "Structures for repeating code.",
        questions: ["When would you use a loop?", "What is the difference between for and while loops?"]
      },
      {
        id: "functions",
        label: "Functions",
        level: 3,
        x: 66,
        y: 50,
        description: "Reusable blocks of code that can take inputs and return outputs.",
        questions: ["Why are functions useful?", "What is a function parameter?"]
      },
      {
        id: "lists",
        label: "Lists",
        level: 2,
        x: 40,
        y: 84,
        description: "Ordered collections that can store multiple values.",
        questions: ["How do you access an item in a list?", "Why are lists useful with loops?"]
      },
      {
        id: "modules",
        label: "Modules",
        level: 4,
        x: 86,
        y: 48,
        description: "Files or libraries that provide reusable code.",
        questions: ["What does import do?", "Why do programmers use modules?"]
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
      { id: "p1", title: "Python Variables and Types", concepts: ["variables", "types"], difficulty: "beginner", duration: "11 min" },
      { id: "p2", title: "If Statements in Python", concepts: ["conditionals"], difficulty: "beginner", duration: "13 min" },
      { id: "p3", title: "Loops and Lists", concepts: ["loops", "lists"], difficulty: "beginner", duration: "15 min" },
      { id: "p4", title: "Writing Python Functions", concepts: ["functions"], difficulty: "intermediate", duration: "17 min" },
      { id: "p5", title: "Using Python Modules", concepts: ["modules"], difficulty: "intermediate", duration: "10 min" }
    ]
  }
};
