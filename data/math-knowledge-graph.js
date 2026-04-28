window.MATH_KNOWLEDGE_GRAPH = {
  "version": "math-v1",
  "title": "??????????? v1",
  "description": "???????????????????????????",
  "generatedFrom": "data/neo4j/math-knowledge-graph.cypher",
  "nodeCount": 114,
  "edgeCount": 144,
  "nodes": [
    {
      "id": "math",
      "label": "数学",
      "name": "数学",
      "stage": "all",
      "domain": "root",
      "description": "从小学到大学数学知识体系的总入口。"
    },
    {
      "id": "primary_math",
      "label": "小学数学",
      "name": "小学数学",
      "stage": "primary",
      "domain": "overview",
      "description": "数与运算、图形、测量、简单统计等基础内容。"
    },
    {
      "id": "number_sense",
      "label": "数感",
      "name": "数感",
      "stage": "primary",
      "domain": "number",
      "description": "理解数量、大小、顺序和数的意义。"
    },
    {
      "id": "natural_numbers",
      "label": "自然数",
      "name": "自然数",
      "stage": "primary",
      "domain": "number",
      "description": "用于计数和排序的基本数。"
    },
    {
      "id": "place_value",
      "label": "位值制",
      "name": "位值制",
      "stage": "primary",
      "domain": "number",
      "description": "理解个位、十位、百位等数位含义。"
    },
    {
      "id": "addition",
      "label": "加法",
      "name": "加法",
      "stage": "primary",
      "domain": "arithmetic",
      "description": "表示数量合并的基本运算。"
    },
    {
      "id": "subtraction",
      "label": "减法",
      "name": "减法",
      "stage": "primary",
      "domain": "arithmetic",
      "description": "表示数量减少或比较差异的基本运算。"
    },
    {
      "id": "multiplication",
      "label": "乘法",
      "name": "乘法",
      "stage": "primary",
      "domain": "arithmetic",
      "description": "重复加法和成倍关系的基本运算。"
    },
    {
      "id": "division",
      "label": "除法",
      "name": "除法",
      "stage": "primary",
      "domain": "arithmetic",
      "description": "平均分和包含关系的基本运算。"
    },
    {
      "id": "fractions",
      "label": "分数",
      "name": "分数",
      "stage": "primary",
      "domain": "number",
      "description": "表示整体的一部分或两个量的比。"
    },
    {
      "id": "decimals",
      "label": "小数",
      "name": "小数",
      "stage": "primary",
      "domain": "number",
      "description": "以十进制表示非整数数量。"
    },
    {
      "id": "percent",
      "label": "百分数",
      "name": "百分数",
      "stage": "primary",
      "domain": "number",
      "description": "以百分之一为单位表示比例。"
    },
    {
      "id": "ratio",
      "label": "比",
      "name": "比",
      "stage": "primary",
      "domain": "number",
      "description": "描述两个数量之间的相对关系。"
    },
    {
      "id": "measurement",
      "label": "测量",
      "name": "测量",
      "stage": "primary",
      "domain": "geometry",
      "description": "用单位描述长度、面积、体积、时间等量。"
    },
    {
      "id": "length",
      "label": "长度",
      "name": "长度",
      "stage": "primary",
      "domain": "geometry",
      "description": "一维空间距离的度量。"
    },
    {
      "id": "perimeter",
      "label": "周长",
      "name": "周长",
      "stage": "primary",
      "domain": "geometry",
      "description": "平面图形边界长度之和。"
    },
    {
      "id": "area",
      "label": "面积",
      "name": "面积",
      "stage": "primary",
      "domain": "geometry",
      "description": "平面区域大小的度量。"
    },
    {
      "id": "volume",
      "label": "体积",
      "name": "体积",
      "stage": "primary",
      "domain": "geometry",
      "description": "立体空间占据大小的度量。"
    },
    {
      "id": "basic_shapes",
      "label": "基本图形",
      "name": "基本图形",
      "stage": "primary",
      "domain": "geometry",
      "description": "三角形、四边形、圆等基础平面图形。"
    },
    {
      "id": "angles",
      "label": "角",
      "name": "角",
      "stage": "primary",
      "domain": "geometry",
      "description": "由两条射线形成的几何对象。"
    },
    {
      "id": "basic_statistics",
      "label": "简单统计",
      "name": "简单统计",
      "stage": "primary",
      "domain": "statistics",
      "description": "数据收集、整理和简单图表表示。"
    },
    {
      "id": "middle_math",
      "label": "初中数学",
      "name": "初中数学",
      "stage": "middle",
      "domain": "overview",
      "description": "有理数、代数、函数、平面几何和概率统计基础。"
    },
    {
      "id": "integers",
      "label": "整数",
      "name": "整数",
      "stage": "middle",
      "domain": "number",
      "description": "包含正整数、零和负整数。"
    },
    {
      "id": "rational_numbers",
      "label": "有理数",
      "name": "有理数",
      "stage": "middle",
      "domain": "number",
      "description": "可表示为两个整数之比的数。"
    },
    {
      "id": "real_numbers",
      "label": "实数",
      "name": "实数",
      "stage": "middle",
      "domain": "number",
      "description": "包含有理数和无理数的数系。"
    },
    {
      "id": "powers",
      "label": "乘方",
      "name": "乘方",
      "stage": "middle",
      "domain": "number",
      "description": "相同因数重复相乘的表示。"
    },
    {
      "id": "roots",
      "label": "开方",
      "name": "开方",
      "stage": "middle",
      "domain": "number",
      "description": "求一个数的方根。"
    },
    {
      "id": "algebraic_expressions",
      "label": "代数式",
      "name": "代数式",
      "stage": "middle",
      "domain": "algebra",
      "description": "由数、字母和运算符组成的表达式。"
    },
    {
      "id": "monomials_polynomials",
      "label": "整式",
      "name": "整式",
      "stage": "middle",
      "domain": "algebra",
      "description": "单项式和多项式的统称。"
    },
    {
      "id": "factoring",
      "label": "因式分解",
      "name": "因式分解",
      "stage": "middle",
      "domain": "algebra",
      "description": "把多项式化为因式乘积形式。"
    },
    {
      "id": "linear_equations",
      "label": "一元一次方程",
      "name": "一元一次方程",
      "stage": "middle",
      "domain": "algebra",
      "description": "未知数最高次数为一的一元方程。"
    },
    {
      "id": "systems_linear_equations",
      "label": "二元一次方程组",
      "name": "二元一次方程组",
      "stage": "middle",
      "domain": "algebra",
      "description": "多个一次方程共同约束多个未知数。"
    },
    {
      "id": "inequalities",
      "label": "不等式",
      "name": "不等式",
      "stage": "middle",
      "domain": "algebra",
      "description": "描述数量大小关系的不等式表达。"
    },
    {
      "id": "coordinate_plane",
      "label": "平面直角坐标系",
      "name": "平面直角坐标系",
      "stage": "middle",
      "domain": "function",
      "description": "用坐标表示平面中点的位置。"
    },
    {
      "id": "proportional_function",
      "label": "正比例函数",
      "name": "正比例函数",
      "stage": "middle",
      "domain": "function",
      "description": "形如 y=kx 的函数关系。"
    },
    {
      "id": "linear_function",
      "label": "一次函数",
      "name": "一次函数",
      "stage": "middle",
      "domain": "function",
      "description": "形如 y=kx+b 的函数关系。"
    },
    {
      "id": "quadratic_equations",
      "label": "一元二次方程",
      "name": "一元二次方程",
      "stage": "middle",
      "domain": "algebra",
      "description": "未知数最高次数为二的一元方程。"
    },
    {
      "id": "quadratic_function_intro",
      "label": "二次函数基础",
      "name": "二次函数基础",
      "stage": "middle",
      "domain": "function",
      "description": "形如 y=ax^2+bx+c 的函数及其图像基础。"
    },
    {
      "id": "triangle",
      "label": "三角形",
      "name": "三角形",
      "stage": "middle",
      "domain": "geometry",
      "description": "由三条边组成的基本多边形。"
    },
    {
      "id": "congruence",
      "label": "全等",
      "name": "全等",
      "stage": "middle",
      "domain": "geometry",
      "description": "两个图形形状和大小完全相同。"
    },
    {
      "id": "similarity",
      "label": "相似",
      "name": "相似",
      "stage": "middle",
      "domain": "geometry",
      "description": "两个图形形状相同但大小可不同。"
    },
    {
      "id": "pythagorean_theorem",
      "label": "勾股定理",
      "name": "勾股定理",
      "stage": "middle",
      "domain": "geometry",
      "description": "直角三角形三边之间的平方关系。"
    },
    {
      "id": "circle_geometry",
      "label": "圆",
      "name": "圆",
      "stage": "middle",
      "domain": "geometry",
      "description": "平面上到定点距离相等的点的集合。"
    },
    {
      "id": "probability_intro",
      "label": "概率初步",
      "name": "概率初步",
      "stage": "middle",
      "domain": "probability",
      "description": "描述随机事件发生可能性的基础知识。"
    },
    {
      "id": "high_math",
      "label": "高中数学",
      "name": "高中数学",
      "stage": "high",
      "domain": "overview",
      "description": "集合、函数、三角、数列、解析几何、概率统计与初步微积分思想。"
    },
    {
      "id": "sets",
      "label": "集合",
      "name": "集合",
      "stage": "high",
      "domain": "foundation",
      "description": "具有确定性的对象整体。"
    },
    {
      "id": "logic",
      "label": "逻辑命题",
      "name": "逻辑命题",
      "stage": "high",
      "domain": "foundation",
      "description": "命题、充分必要条件和推理基础。"
    },
    {
      "id": "function_concept",
      "label": "函数概念",
      "name": "函数概念",
      "stage": "high",
      "domain": "function",
      "description": "从一个集合到另一个集合的对应关系。"
    },
    {
      "id": "function_properties",
      "label": "函数性质",
      "name": "函数性质",
      "stage": "high",
      "domain": "function",
      "description": "单调性、奇偶性、周期性、最值等性质。"
    },
    {
      "id": "quadratic_function",
      "label": "二次函数",
      "name": "二次函数",
      "stage": "high",
      "domain": "function",
      "description": "二次函数的图像、性质和应用。"
    },
    {
      "id": "exponential_function",
      "label": "指数函数",
      "name": "指数函数",
      "stage": "high",
      "domain": "function",
      "description": "自变量出现在指数位置的函数。"
    },
    {
      "id": "logarithmic_function",
      "label": "对数函数",
      "name": "对数函数",
      "stage": "high",
      "domain": "function",
      "description": "指数函数的反函数。"
    },
    {
      "id": "trigonometric_functions",
      "label": "三角函数",
      "name": "三角函数",
      "stage": "high",
      "domain": "function",
      "description": "正弦、余弦、正切等周期函数。"
    },
    {
      "id": "trig_identities",
      "label": "三角恒等变换",
      "name": "三角恒等变换",
      "stage": "high",
      "domain": "function",
      "description": "三角函数公式与恒等变形。"
    },
    {
      "id": "sequences",
      "label": "数列",
      "name": "数列",
      "stage": "high",
      "domain": "algebra",
      "description": "按一定规律排列的数的序列。"
    },
    {
      "id": "arithmetic_sequence",
      "label": "等差数列",
      "name": "等差数列",
      "stage": "high",
      "domain": "algebra",
      "description": "相邻两项差为常数的数列。"
    },
    {
      "id": "geometric_sequence",
      "label": "等比数列",
      "name": "等比数列",
      "stage": "high",
      "domain": "algebra",
      "description": "相邻两项比为常数的数列。"
    },
    {
      "id": "vectors",
      "label": "向量",
      "name": "向量",
      "stage": "high",
      "domain": "geometry",
      "description": "具有大小和方向的量。"
    },
    {
      "id": "plane_vectors",
      "label": "平面向量",
      "name": "平面向量",
      "stage": "high",
      "domain": "geometry",
      "description": "平面中向量的线性运算与坐标表示。"
    },
    {
      "id": "analytic_geometry",
      "label": "解析几何",
      "name": "解析几何",
      "stage": "high",
      "domain": "geometry",
      "description": "用代数方法研究几何对象。"
    },
    {
      "id": "line_equations",
      "label": "直线方程",
      "name": "直线方程",
      "stage": "high",
      "domain": "geometry",
      "description": "平面中直线的代数表示。"
    },
    {
      "id": "conic_sections",
      "label": "圆锥曲线",
      "name": "圆锥曲线",
      "stage": "high",
      "domain": "geometry",
      "description": "椭圆、双曲线、抛物线等曲线。"
    },
    {
      "id": "complex_numbers",
      "label": "复数",
      "name": "复数",
      "stage": "high",
      "domain": "number",
      "description": "形如 a+bi 的数。"
    },
    {
      "id": "permutation_combination",
      "label": "排列组合",
      "name": "排列组合",
      "stage": "high",
      "domain": "probability",
      "description": "计数原理及排列、组合方法。"
    },
    {
      "id": "binomial_theorem",
      "label": "二项式定理",
      "name": "二项式定理",
      "stage": "high",
      "domain": "algebra",
      "description": "二项式幂展开公式。"
    },
    {
      "id": "random_variables_intro",
      "label": "随机变量初步",
      "name": "随机变量初步",
      "stage": "high",
      "domain": "probability",
      "description": "用数值描述随机试验结果。"
    },
    {
      "id": "statistics_intro",
      "label": "统计初步",
      "name": "统计初步",
      "stage": "high",
      "domain": "statistics",
      "description": "均值、方差、抽样和数据分析基础。"
    },
    {
      "id": "limits_intro",
      "label": "极限思想",
      "name": "极限思想",
      "stage": "high",
      "domain": "calculus",
      "description": "用趋近思想理解函数变化。"
    },
    {
      "id": "university_math",
      "label": "大学数学",
      "name": "大学数学",
      "stage": "university",
      "domain": "overview",
      "description": "微积分、线性代数、概率统计、离散数学、分析、代数、拓扑和优化等。"
    },
    {
      "id": "calculus",
      "label": "微积分",
      "name": "微积分",
      "stage": "university",
      "domain": "calculus",
      "description": "研究极限、连续、微分、积分及其应用的数学分支。"
    },
    {
      "id": "limits",
      "label": "极限",
      "name": "极限",
      "stage": "university",
      "domain": "calculus",
      "description": "函数或数列在变量趋近某值时的趋势。"
    },
    {
      "id": "continuity",
      "label": "连续性",
      "name": "连续性",
      "stage": "university",
      "domain": "calculus",
      "description": "函数在点或区间上没有跳跃或断裂。"
    },
    {
      "id": "derivative",
      "label": "导数",
      "name": "导数",
      "stage": "university",
      "domain": "calculus",
      "description": "函数瞬时变化率和切线斜率。"
    },
    {
      "id": "differentiation_rules",
      "label": "求导法则",
      "name": "求导法则",
      "stage": "university",
      "domain": "calculus",
      "description": "常见函数及复合函数的求导规则。"
    },
    {
      "id": "chain_rule",
      "label": "链式法则",
      "name": "链式法则",
      "stage": "university",
      "domain": "calculus",
      "description": "复合函数求导的基本法则。"
    },
    {
      "id": "implicit_differentiation",
      "label": "隐函数求导",
      "name": "隐函数求导",
      "stage": "university",
      "domain": "calculus",
      "description": "对隐式关系中的变量进行求导。"
    },
    {
      "id": "integral",
      "label": "积分",
      "name": "积分",
      "stage": "university",
      "domain": "calculus",
      "description": "累积量、面积和反导数相关概念。"
    },
    {
      "id": "definite_integral",
      "label": "定积分",
      "name": "定积分",
      "stage": "university",
      "domain": "calculus",
      "description": "在区间上累积函数值的极限。"
    },
    {
      "id": "indefinite_integral",
      "label": "不定积分",
      "name": "不定积分",
      "stage": "university",
      "domain": "calculus",
      "description": "求函数原函数的运算。"
    },
    {
      "id": "series",
      "label": "级数",
      "name": "级数",
      "stage": "university",
      "domain": "calculus",
      "description": "无穷项求和及其收敛性。"
    },
    {
      "id": "multivariable_functions",
      "label": "多元函数",
      "name": "多元函数",
      "stage": "university",
      "domain": "calculus",
      "description": "含多个自变量的函数。"
    },
    {
      "id": "partial_derivatives",
      "label": "偏导数",
      "name": "偏导数",
      "stage": "university",
      "domain": "calculus",
      "description": "多元函数对单个变量的变化率。"
    },
    {
      "id": "gradient",
      "label": "梯度",
      "name": "梯度",
      "stage": "university",
      "domain": "calculus",
      "description": "由偏导数组成的向量，表示函数增长最快方向。"
    },
    {
      "id": "multiple_integrals",
      "label": "重积分",
      "name": "重积分",
      "stage": "university",
      "domain": "calculus",
      "description": "多元函数在区域上的积分。"
    },
    {
      "id": "differential_equations",
      "label": "微分方程",
      "name": "微分方程",
      "stage": "university",
      "domain": "calculus",
      "description": "包含未知函数及其导数的方程。"
    },
    {
      "id": "linear_algebra",
      "label": "线性代数",
      "name": "线性代数",
      "stage": "university",
      "domain": "linear_algebra",
      "description": "研究向量、矩阵、线性方程组和线性变换的数学分支。"
    },
    {
      "id": "matrix",
      "label": "矩阵",
      "name": "矩阵",
      "stage": "university",
      "domain": "linear_algebra",
      "description": "按行列排列的数表。"
    },
    {
      "id": "linear_systems",
      "label": "线性方程组",
      "name": "线性方程组",
      "stage": "university",
      "domain": "linear_algebra",
      "description": "多个线性方程构成的方程组。"
    },
    {
      "id": "determinant",
      "label": "行列式",
      "name": "行列式",
      "stage": "university",
      "domain": "linear_algebra",
      "description": "方阵对应的数值，用于判断可逆性等。"
    },
    {
      "id": "vector_space",
      "label": "向量空间",
      "name": "向量空间",
      "stage": "university",
      "domain": "linear_algebra",
      "description": "满足线性运算封闭性的向量集合。"
    },
    {
      "id": "linear_transformations",
      "label": "线性变换",
      "name": "线性变换",
      "stage": "university",
      "domain": "linear_algebra",
      "description": "保持加法和数乘结构的映射。"
    },
    {
      "id": "eigenvalues",
      "label": "特征值与特征向量",
      "name": "特征值与特征向量",
      "stage": "university",
      "domain": "linear_algebra",
      "description": "线性变换下方向不变的向量及伸缩因子。"
    },
    {
      "id": "orthogonality",
      "label": "正交性",
      "name": "正交性",
      "stage": "university",
      "domain": "linear_algebra",
      "description": "向量内积为零的垂直关系。"
    },
    {
      "id": "probability_theory",
      "label": "概率论",
      "name": "概率论",
      "stage": "university",
      "domain": "probability",
      "description": "系统研究随机现象的数学理论。"
    },
    {
      "id": "random_variables",
      "label": "随机变量",
      "name": "随机变量",
      "stage": "university",
      "domain": "probability",
      "description": "把随机结果映射为数值的函数。"
    },
    {
      "id": "distributions",
      "label": "概率分布",
      "name": "概率分布",
      "stage": "university",
      "domain": "probability",
      "description": "随机变量取值规律。"
    },
    {
      "id": "expectation_variance",
      "label": "期望与方差",
      "name": "期望与方差",
      "stage": "university",
      "domain": "probability",
      "description": "描述随机变量中心趋势和离散程度。"
    },
    {
      "id": "statistical_inference",
      "label": "统计推断",
      "name": "统计推断",
      "stage": "university",
      "domain": "statistics",
      "description": "利用样本推断总体性质。"
    },
    {
      "id": "hypothesis_testing",
      "label": "假设检验",
      "name": "假设检验",
      "stage": "university",
      "domain": "statistics",
      "description": "根据样本判断统计假设是否成立。"
    },
    {
      "id": "regression",
      "label": "回归分析",
      "name": "回归分析",
      "stage": "university",
      "domain": "statistics",
      "description": "研究变量之间数量关系的统计方法。"
    },
    {
      "id": "discrete_math",
      "label": "离散数学",
      "name": "离散数学",
      "stage": "university",
      "domain": "discrete",
      "description": "研究离散结构的数学分支。"
    },
    {
      "id": "logic_discrete",
      "label": "数理逻辑",
      "name": "数理逻辑",
      "stage": "university",
      "domain": "discrete",
      "description": "形式化命题、谓词和推理规则。"
    },
    {
      "id": "set_theory",
      "label": "集合论",
      "name": "集合论",
      "stage": "university",
      "domain": "foundation",
      "description": "研究集合及其运算和关系的理论。"
    },
    {
      "id": "graph_theory",
      "label": "图论",
      "name": "图论",
      "stage": "university",
      "domain": "discrete",
      "description": "研究点和边构成的图结构。"
    },
    {
      "id": "combinatorics",
      "label": "组合数学",
      "name": "组合数学",
      "stage": "university",
      "domain": "discrete",
      "description": "研究计数、排列组合和离散结构。"
    },
    {
      "id": "number_theory",
      "label": "数论",
      "name": "数论",
      "stage": "university",
      "domain": "number",
      "description": "研究整数性质的数学分支。"
    },
    {
      "id": "abstract_algebra",
      "label": "抽象代数",
      "name": "抽象代数",
      "stage": "university",
      "domain": "algebra",
      "description": "研究群、环、域等代数结构。"
    },
    {
      "id": "groups",
      "label": "群",
      "name": "群",
      "stage": "university",
      "domain": "algebra",
      "description": "满足封闭、结合、单位元和逆元的代数结构。"
    },
    {
      "id": "rings_fields",
      "label": "环与域",
      "name": "环与域",
      "stage": "university",
      "domain": "algebra",
      "description": "具有加法和乘法运算的代数结构。"
    },
    {
      "id": "real_analysis",
      "label": "实分析",
      "name": "实分析",
      "stage": "university",
      "domain": "analysis",
      "description": "严格研究实数、极限、连续、微分和积分。"
    },
    {
      "id": "metric_spaces",
      "label": "度量空间",
      "name": "度量空间",
      "stage": "university",
      "domain": "analysis",
      "description": "带距离函数的集合。"
    },
    {
      "id": "topology",
      "label": "拓扑学",
      "name": "拓扑学",
      "stage": "university",
      "domain": "geometry",
      "description": "研究连续变形下不变性质的数学分支。"
    },
    {
      "id": "optimization",
      "label": "最优化",
      "name": "最优化",
      "stage": "university",
      "domain": "applied",
      "description": "寻找目标函数最大或最小值的方法。"
    },
    {
      "id": "numerical_methods",
      "label": "数值方法",
      "name": "数值方法",
      "stage": "university",
      "domain": "applied",
      "description": "用计算方法近似求解数学问题。"
    }
  ],
  "edges": [
    {
      "from": "primary_math",
      "to": "math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "middle_math",
      "to": "math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "high_math",
      "to": "math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "university_math",
      "to": "math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "number_sense",
      "to": "primary_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "natural_numbers",
      "to": "number_sense",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "place_value",
      "to": "addition",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "addition",
      "to": "subtraction",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "addition",
      "to": "multiplication",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "subtraction",
      "to": "division",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "multiplication",
      "to": "division",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "division",
      "to": "fractions",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "fractions",
      "to": "decimals",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "decimals",
      "to": "percent",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "fractions",
      "to": "ratio",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "measurement",
      "to": "length",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "length",
      "to": "perimeter",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "basic_shapes",
      "to": "area",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "area",
      "to": "volume",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "basic_shapes",
      "to": "angles",
      "type": "RELATED_TO",
      "relation": "related_to"
    },
    {
      "from": "basic_statistics",
      "to": "statistics_intro",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "natural_numbers",
      "to": "integers",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "fractions",
      "to": "rational_numbers",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "integers",
      "to": "rational_numbers",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "rational_numbers",
      "to": "real_numbers",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "multiplication",
      "to": "powers",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "powers",
      "to": "roots",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "rational_numbers",
      "to": "algebraic_expressions",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "algebraic_expressions",
      "to": "monomials_polynomials",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "monomials_polynomials",
      "to": "factoring",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "algebraic_expressions",
      "to": "linear_equations",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "linear_equations",
      "to": "systems_linear_equations",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "linear_equations",
      "to": "inequalities",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "coordinate_plane",
      "to": "proportional_function",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "proportional_function",
      "to": "linear_function",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "factoring",
      "to": "quadratic_equations",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "quadratic_equations",
      "to": "quadratic_function_intro",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "angles",
      "to": "triangle",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "triangle",
      "to": "congruence",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "congruence",
      "to": "similarity",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "triangle",
      "to": "pythagorean_theorem",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "basic_shapes",
      "to": "circle_geometry",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "ratio",
      "to": "probability_intro",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "sets",
      "to": "function_concept",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "logic",
      "to": "function_concept",
      "type": "RELATED_TO",
      "relation": "related_to"
    },
    {
      "from": "coordinate_plane",
      "to": "function_concept",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "function_concept",
      "to": "function_properties",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "quadratic_function_intro",
      "to": "quadratic_function",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "powers",
      "to": "exponential_function",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "exponential_function",
      "to": "logarithmic_function",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "angles",
      "to": "trigonometric_functions",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "trigonometric_functions",
      "to": "trig_identities",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "algebraic_expressions",
      "to": "sequences",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "sequences",
      "to": "arithmetic_sequence",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "sequences",
      "to": "geometric_sequence",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "coordinate_plane",
      "to": "vectors",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "vectors",
      "to": "plane_vectors",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "coordinate_plane",
      "to": "analytic_geometry",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "linear_function",
      "to": "line_equations",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "line_equations",
      "to": "conic_sections",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "real_numbers",
      "to": "complex_numbers",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "multiplication",
      "to": "permutation_combination",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "permutation_combination",
      "to": "binomial_theorem",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "probability_intro",
      "to": "random_variables_intro",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "basic_statistics",
      "to": "statistics_intro",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "function_concept",
      "to": "limits_intro",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "limits_intro",
      "to": "limits",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "function_concept",
      "to": "limits",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "limits",
      "to": "continuity",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "limits",
      "to": "derivative",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "function_properties",
      "to": "derivative",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "derivative",
      "to": "differentiation_rules",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "differentiation_rules",
      "to": "chain_rule",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "derivative",
      "to": "implicit_differentiation",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "continuity",
      "to": "integral",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "derivative",
      "to": "integral",
      "type": "RELATED_TO",
      "relation": "related_to"
    },
    {
      "from": "integral",
      "to": "definite_integral",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "integral",
      "to": "indefinite_integral",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "sequences",
      "to": "series",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "function_concept",
      "to": "multivariable_functions",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "derivative",
      "to": "partial_derivatives",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "partial_derivatives",
      "to": "gradient",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "integral",
      "to": "multiple_integrals",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "derivative",
      "to": "differential_equations",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "integral",
      "to": "differential_equations",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "systems_linear_equations",
      "to": "linear_systems",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "linear_systems",
      "to": "matrix",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "matrix",
      "to": "determinant",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "matrix",
      "to": "vector_space",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "vector_space",
      "to": "linear_transformations",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "determinant",
      "to": "eigenvalues",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "linear_transformations",
      "to": "eigenvalues",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "vectors",
      "to": "orthogonality",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "probability_intro",
      "to": "probability_theory",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "random_variables_intro",
      "to": "random_variables",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "probability_theory",
      "to": "random_variables",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "random_variables",
      "to": "distributions",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "distributions",
      "to": "expectation_variance",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "statistics_intro",
      "to": "statistical_inference",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "expectation_variance",
      "to": "statistical_inference",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "statistical_inference",
      "to": "hypothesis_testing",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "statistical_inference",
      "to": "regression",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "logic",
      "to": "logic_discrete",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "sets",
      "to": "set_theory",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "logic_discrete",
      "to": "discrete_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "set_theory",
      "to": "discrete_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "discrete_math",
      "to": "graph_theory",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "permutation_combination",
      "to": "combinatorics",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "combinatorics",
      "to": "graph_theory",
      "type": "RELATED_TO",
      "relation": "related_to"
    },
    {
      "from": "integers",
      "to": "number_theory",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "sets",
      "to": "abstract_algebra",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "abstract_algebra",
      "to": "groups",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "groups",
      "to": "rings_fields",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "limits",
      "to": "real_analysis",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "real_numbers",
      "to": "real_analysis",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "real_analysis",
      "to": "metric_spaces",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "metric_spaces",
      "to": "topology",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "derivative",
      "to": "optimization",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "gradient",
      "to": "optimization",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "linear_algebra",
      "to": "optimization",
      "type": "RELATED_TO",
      "relation": "related_to"
    },
    {
      "from": "calculus",
      "to": "numerical_methods",
      "type": "RELATED_TO",
      "relation": "related_to"
    },
    {
      "from": "matrix",
      "to": "numerical_methods",
      "type": "PREREQUISITE_OF",
      "relation": "prerequisite_of"
    },
    {
      "from": "calculus",
      "to": "university_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "linear_algebra",
      "to": "university_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "probability_theory",
      "to": "university_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "statistical_inference",
      "to": "university_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "discrete_math",
      "to": "university_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "abstract_algebra",
      "to": "university_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "real_analysis",
      "to": "university_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "topology",
      "to": "university_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "optimization",
      "to": "university_math",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "limits",
      "to": "calculus",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "continuity",
      "to": "calculus",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "derivative",
      "to": "calculus",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "integral",
      "to": "calculus",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "series",
      "to": "calculus",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "multivariable_functions",
      "to": "calculus",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "differential_equations",
      "to": "calculus",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "matrix",
      "to": "linear_algebra",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "linear_systems",
      "to": "linear_algebra",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "determinant",
      "to": "linear_algebra",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "vector_space",
      "to": "linear_algebra",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "linear_transformations",
      "to": "linear_algebra",
      "type": "PART_OF",
      "relation": "part_of"
    },
    {
      "from": "eigenvalues",
      "to": "linear_algebra",
      "type": "PART_OF",
      "relation": "part_of"
    }
  ]
};
