const data = window.KNOWLEDGE_GRAPH_DATA;

const state = {
  domainKey: "calculus",
  selectedId: "derivative",
  learnerState: {}
};

const dom = {
  domainSelect: document.querySelector("#domainSelect"),
  goalInput: document.querySelector("#goalInput"),
  analyzeBtn: document.querySelector("#analyzeBtn"),
  suggestions: document.querySelector("#suggestions"),
  knowledgeState: document.querySelector("#knowledgeState"),
  resetStateBtn: document.querySelector("#resetStateBtn"),
  graph: document.querySelector("#graph"),
  domainTitle: document.querySelector("#domainTitle"),
  selectedConcept: document.querySelector("#selectedConcept"),
  selectedDescription: document.querySelector("#selectedDescription"),
  pathList: document.querySelector("#pathList"),
  questionList: document.querySelector("#questionList"),
  videoList: document.querySelector("#videoList")
};

function getDomain() {
  return data[state.domainKey];
}

function getConcept(id) {
  return getDomain().concepts.find((concept) => concept.id === id);
}

function normalizeText(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function findConceptByText(value) {
  const query = normalizeText(value);
  return getDomain().concepts.find((concept) => {
    return concept.id === query || normalizeText(concept.label) === query || concept.label.toLowerCase().includes(value.trim().toLowerCase());
  });
}

function getPrerequisites(targetId, visited = new Set()) {
  if (visited.has(targetId)) {
    return [];
  }
  visited.add(targetId);

  const direct = getDomain().edges
    .filter((edge) => edge.to === targetId)
    .map((edge) => edge.from);

  const expanded = direct.flatMap((id) => getPrerequisites(id, visited));
  return [...new Set([...expanded, ...direct])];
}

function getRelatedVideos(conceptIds) {
  const wanted = new Set(conceptIds);
  return getDomain().videos
    .map((video) => {
      const overlap = video.concepts.filter((id) => wanted.has(id));
      return { ...video, overlap, score: overlap.length };
    })
    .filter((video) => video.score > 0)
    .sort((a, b) => b.score - a.score || a.difficulty.localeCompare(b.difficulty));
}

function setLearnerState(conceptId, value) {
  state.learnerState[conceptId] = state.learnerState[conceptId] === value ? undefined : value;
  render();
}

function analyzeGoal() {
  const match = findConceptByText(dom.goalInput.value);
  if (match) {
    state.selectedId = match.id;
  }
  render();
}

function renderDomainOptions() {
  dom.domainSelect.innerHTML = Object.entries(data)
    .map(([key, domain]) => `<option value="${key}">${domain.title}</option>`)
    .join("");
  dom.domainSelect.value = state.domainKey;
}

function renderSuggestions() {
  const concepts = getDomain().concepts;
  dom.suggestions.innerHTML = concepts
    .slice()
    .sort((a, b) => a.level - b.level || a.label.localeCompare(b.label))
    .map((concept) => `<button class="chip" type="button" data-suggestion="${concept.id}">${concept.label}</button>`)
    .join("");
}

function renderKnowledgeState() {
  dom.knowledgeState.innerHTML = getDomain().concepts
    .slice()
    .sort((a, b) => a.level - b.level || a.label.localeCompare(b.label))
    .map((concept) => {
      const current = state.learnerState[concept.id];
      return `
        <div class="state-row">
          <span>${concept.label}</span>
          <button class="known-btn" type="button" data-state="${concept.id}:known" aria-pressed="${current === "known"}">Known</button>
          <button class="weak-btn" type="button" data-state="${concept.id}:weak" aria-pressed="${current === "weak"}">Weak</button>
        </div>
      `;
    })
    .join("");
}

function renderGraph() {
  const domain = getDomain();
  const width = dom.graph.clientWidth || 900;
  const height = dom.graph.clientHeight || 620;
  const conceptsById = Object.fromEntries(domain.concepts.map((concept) => [concept.id, concept]));
  const scaleX = (value) => (value / 100) * width;
  const scaleY = (value) => (value / 100) * height;

  const edges = domain.edges
    .map((edge) => {
      const from = conceptsById[edge.from];
      const to = conceptsById[edge.to];
      return `
        <line class="edge ${edge.relation === "supports" ? "supports" : ""}"
          x1="${scaleX(from.x)}" y1="${scaleY(from.y)}"
          x2="${scaleX(to.x)}" y2="${scaleY(to.y)}">
        </line>
      `;
    })
    .join("");

  const nodes = domain.concepts
    .map((concept) => {
      const status = state.selectedId === concept.id ? "target" : state.learnerState[concept.id] || "";
      const label = concept.label.length > 14 ? concept.label.replace(" ", "\n") : concept.label;
      return `
        <g class="node ${status}" data-node="${concept.id}" transform="translate(${scaleX(concept.x)}, ${scaleY(concept.y)})">
          <circle r="34"></circle>
          ${label
            .split("\n")
            .map((line, index, lines) => `<text y="${(index - (lines.length - 1) / 2) * 15 + 4}">${line}</text>`)
            .join("")}
        </g>
      `;
    })
    .join("");

  dom.graph.setAttribute("viewBox", `0 0 ${width} ${height}`);
  dom.graph.innerHTML = `${edges}${nodes}`;
}

function renderInspector() {
  const concept = getConcept(state.selectedId);
  if (!concept) {
    return;
  }

  const prerequisiteIds = getPrerequisites(concept.id);
  const recommendationConceptIds = [...new Set([...prerequisiteIds, concept.id])];
  const questions = recommendationConceptIds
    .map((id) => getConcept(id))
    .filter(Boolean)
    .flatMap((item) => item.questions.slice(0, 1).map((question) => ({ concept: item.label, question })));
  const videos = getRelatedVideos(recommendationConceptIds);

  dom.selectedConcept.textContent = concept.label;
  dom.selectedDescription.textContent = concept.description;

  dom.pathList.innerHTML = prerequisiteIds.length
    ? prerequisiteIds
        .map((id) => {
          const item = getConcept(id);
          const status = state.learnerState[id] ? ` · ${state.learnerState[id]}` : "";
          return `<li>${item.label}<span class="empty">${status}</span></li>`;
        })
        .join("") + `<li><strong>${concept.label}</strong><span class="empty"> · target</span></li>`
    : `<li><strong>${concept.label}</strong><span class="empty"> · no prerequisite found</span></li>`;

  dom.questionList.innerHTML = questions.length
    ? questions
        .map((item) => `
          <article class="question-card">
            <p><strong>${item.concept}:</strong> ${item.question}</p>
          </article>
        `)
        .join("")
    : `<p class="empty">No diagnostic question is attached to this concept yet.</p>`;

  dom.videoList.innerHTML = videos.length
    ? videos
        .map((video) => `
          <article class="video-card">
            <p><strong>${video.title}</strong></p>
            <div class="video-meta">
              <span>${video.difficulty}</span>
              <span>${video.duration}</span>
              <span>${video.overlap.length} concept match${video.overlap.length > 1 ? "es" : ""}</span>
            </div>
          </article>
        `)
        .join("")
    : `<p class="empty">No video is connected to this concept yet.</p>`;
}

function render() {
  const domain = getDomain();
  dom.domainTitle.textContent = domain.title;
  if (!getConcept(state.selectedId)) {
    state.selectedId = domain.concepts[0].id;
  }
  dom.goalInput.value = getConcept(state.selectedId).label;
  renderSuggestions();
  renderKnowledgeState();
  renderGraph();
  renderInspector();
}

dom.domainSelect.addEventListener("change", (event) => {
  state.domainKey = event.target.value;
  state.selectedId = getDomain().concepts[0].id;
  state.learnerState = {};
  render();
});

dom.analyzeBtn.addEventListener("click", analyzeGoal);
dom.goalInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    analyzeGoal();
  }
});

dom.suggestions.addEventListener("click", (event) => {
  const target = event.target.closest("[data-suggestion]");
  if (!target) {
    return;
  }
  state.selectedId = target.dataset.suggestion;
  render();
});

dom.knowledgeState.addEventListener("click", (event) => {
  const target = event.target.closest("[data-state]");
  if (!target) {
    return;
  }
  const [conceptId, value] = target.dataset.state.split(":");
  setLearnerState(conceptId, value);
});

dom.graph.addEventListener("click", (event) => {
  const target = event.target.closest("[data-node]");
  if (!target) {
    return;
  }
  state.selectedId = target.dataset.node;
  render();
});

dom.resetStateBtn.addEventListener("click", () => {
  state.learnerState = {};
  render();
});

window.addEventListener("resize", renderGraph);

renderDomainOptions();
render();
