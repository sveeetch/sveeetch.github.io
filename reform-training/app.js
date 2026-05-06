const DEFAULT_PROGRAM = [
  {
    id: "fullbody-1",
    name: "Reform fullbody 1",
    exercises: [
      item("bench-press", "Жим штанги лежа", "90", [7, 7, 8], "Кладу на грудь", "chest"),
      item("lat-pulldown", "Тяга верх блока", "85", [12, 12, 12, 12], "Параллельный широкий хват", "back"),
      item("lateral-raise", "Гантели на плечи махи", "10", [20, 20, 20], "Руки прямые", "shoulders"),
      item("triceps-bar", "Трицепс прямой гриф", "55", [15, 15, 15, 15], "Делай медленно. Последний сет можно 40кг x 15", "arms"),
      item("db-curl", "Бицепс гантели по одной", "25", [16, 16, 16, 15], "Последний сет можно 15кг x 15", "arms"),
      item("leg-press", "Жим ногами", "200", [15, 15, 15, 15], "", "legs"),
      item("seated-calf", "Икры сидя тренажер", "100", [15, 15, 15, 15], "", "calves")
    ]
  },
  {
    id: "fullbody-2",
    name: "Reform fullbody 2",
    exercises: [
      item("squat", "Присед", "80", [13, 13, 13, 13], "Глубоко", "legs"),
      item("pec-deck", "Бабочка", "94", [12, 12, 12, 12], "Макс вес. Сидушка на 8, сверху 2", "chest"),
      item("low-row", "Тяга нижн блока", "90", [12, 12, 12], "45+45кг", "back"),
      item("shoulder-press", "Жим плечи", "80", [15, 15, 15, 20, 30], "Гриф 20кг и 30кг блины. Потом 20кг, пустой гриф 30", "shoulders"),
      item("french-press", "Французкий жим", "30", [18, 18, 18], "", "arms"),
      item("ez-curl", "Кривая штанга", "40", [12, 12, 13], "", "arms")
    ]
  },
  {
    id: "pump-day",
    name: "Pump day",
    exercises: [
      item("pullups", "Подтягивания", "", [10, 10, 10], "Памп день", "back"),
      item("pushups", "Отжимания", "", [20, 20, 20], "Памп день", "chest")
    ]
  }
];

const DEFAULT_DASHA_PROGRAM = [
  {
    id: "dasha-glutes-1",
    name: "Dasha glutes 1",
    exercises: [
      item("dasha-hip-thrust", "Hip thrust", "40", [12, 12, 10, 10], "Главное упражнение на ягодицы", "glutes"),
      item("dasha-rdl", "Romanian deadlift", "30", [12, 12, 12], "Медленно, растяжение внизу", "glutes"),
      item("dasha-abduction", "Abduction machine", "35", [18, 18, 18], "Разведение бедра в тренажере", "glutes"),
      item("dasha-kickback", "Cable kickback", "10", [15, 15, 15], "Контроль, пауза сверху", "glutes"),
      item("dasha-plank", "Plank", "", [45, 45, 45], "Секунды вместо повторов", "core")
    ]
  },
  {
    id: "dasha-lower-2",
    name: "Dasha lower 2",
    exercises: [
      item("dasha-bulgarian", "Bulgarian split squat", "10", [12, 12, 12], "На каждую ногу", "legs"),
      item("dasha-leg-press", "Leg press glute focus", "80", [15, 15, 15], "Стопы выше и шире", "glutes"),
      item("dasha-glute-bridge", "Glute bridge", "30", [15, 15, 15], "Пауза вверху", "glutes"),
      item("dasha-ham-curl", "Leg curl", "25", [14, 14, 14], "Бицепс бедра", "legs"),
      item("dasha-calf", "Standing calves", "40", [18, 18, 18], "", "calves")
    ]
  },
  {
    id: "dasha-upper-pump",
    name: "Dasha upper pump",
    exercises: [
      item("dasha-pulldown", "Lat pulldown", "30", [12, 12, 12], "", "back"),
      item("dasha-pec-deck", "Pec deck", "25", [14, 14, 14], "", "chest"),
      item("dasha-lateral", "Lateral raise", "4", [18, 18, 18], "", "shoulders"),
      item("dasha-triceps", "Rope triceps", "15", [15, 15, 15], "", "arms")
    ]
  }
];

const DEFAULT_USERS = ["Dima", "Dasha", "Artem", "Danil", "Guest"];
const DEFAULT_PROGRAMS_BY_USER = {
  Dima: DEFAULT_PROGRAM,
  Artem: DEFAULT_PROGRAM,
  Danil: DEFAULT_PROGRAM,
  Guest: DEFAULT_PROGRAM,
  Dasha: DEFAULT_DASHA_PROGRAM
};
const CATEGORY_LABELS = {
  chest: "CH",
  back: "BA",
  shoulders: "SH",
  arms: "AR",
  legs: "LG",
  calves: "CA",
  glutes: "GL",
  core: "CO"
};

const els = {
  syncStatus: document.querySelector("#syncStatus"),
  todayTitle: document.querySelector("#todayTitle"),
  todayMeta: document.querySelector("#todayMeta"),
  userSelect: document.querySelector("#userSelect"),
  userNameInput: document.querySelector("#userNameInput"),
  renameUserBtn: document.querySelector("#renameUserBtn"),
  addGuestBtn: document.querySelector("#addGuestBtn"),
  deleteUserBtn: document.querySelector("#deleteUserBtn"),
  startSessionBtn: document.querySelector("#startSessionBtn"),
  daySwitch: document.querySelector("#daySwitch"),
  sessionState: document.querySelector("#sessionState"),
  skipDayBtn: document.querySelector("#skipDayBtn"),
  exerciseList: document.querySelector("#exerciseList"),
  historyList: document.querySelector("#historyList"),
  refreshBtn: document.querySelector("#refreshBtn"),
  progressExercise: document.querySelector("#progressExercise"),
  progressChart: document.querySelector("#progressChart"),
  statsGrid: document.querySelector("#statsGrid"),
  programEditor: document.querySelector("#programEditor"),
  addExerciseBtn: document.querySelector("#addExerciseBtn"),
  addDayBtn: document.querySelector("#addDayBtn"),
  resetProgramBtn: document.querySelector("#resetProgramBtn"),
  dialog: document.querySelector("#exerciseDialog"),
  dialogTitle: document.querySelector("#dialogTitle"),
  exerciseName: document.querySelector("#exerciseName"),
  exerciseMachine: document.querySelector("#exerciseMachine"),
  exerciseCategory: document.querySelector("#exerciseCategory"),
  saveExerciseBtn: document.querySelector("#saveExerciseBtn")
};

let state = {
  programsByUser: loadLocal("reform-programs-by-user", DEFAULT_PROGRAMS_BY_USER),
  sessions: loadLocal("reform-sessions", []),
  users: loadLocal("reform-users", DEFAULT_USERS),
  selectedDay: loadLocal("reform-selected-day", "fullbody-1"),
  selectedUser: loadLocal("reform-user", DEFAULT_USERS[0]),
  currentSessionId: loadLocal("reform-current-session", ""),
  editingExerciseId: null,
  editingProgramDayId: null,
  onlineReady: false
};

normalizeState();

function item(id, name, weight, reps, note, category) {
  return {
    id,
    name,
    machine: note,
    category,
    sets: reps.map((rep, index) => ({
      id: `${id}-set-${index + 1}`,
      weight,
      reps: String(rep),
      done: false
    }))
  };
}

function loadLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeState() {
  if (state.users.includes("David")) {
    state.users = state.users.map(user => user === "David" ? "Dima" : user);
    if (state.selectedUser === "David") state.selectedUser = "Dima";
  }
  DEFAULT_USERS.forEach(user => {
    if (!state.users.includes(user)) state.users.push(user);
  });
  if (!state.programsByUser || Array.isArray(state.programsByUser)) {
    state.programsByUser = structuredClone(DEFAULT_PROGRAMS_BY_USER);
  }
  if (state.program) {
    state.programsByUser.Dima = state.program;
    delete state.program;
  }
  Object.entries(DEFAULT_PROGRAMS_BY_USER).forEach(([user, program]) => {
    if (!state.programsByUser[user]?.length) state.programsByUser[user] = structuredClone(program);
  });
  state.users.forEach(user => {
    if (!state.programsByUser[user]) state.programsByUser[user] = structuredClone(DEFAULT_PROGRAM);
    restoreEmptyDefaultDays(user);
  });
  if (!state.users.includes(state.selectedUser)) state.selectedUser = state.users[0] || "Dima";
  if (!currentProgram().some(day => day.id === state.selectedDay)) {
    state.selectedDay = currentProgram()[0]?.id || "";
  }
}

function restoreEmptyDefaultDays(user) {
  const defaults = DEFAULT_PROGRAMS_BY_USER[user] || DEFAULT_PROGRAM;
  const program = state.programsByUser[user];
  program.forEach((day, index) => {
    const defaultDay = defaults.find(item => item.id === day.id) || defaults[index];
    if (defaultDay && (!day.exercises || day.exercises.length === 0)) {
      day.exercises = structuredClone(defaultDay.exercises);
    }
  });
}

function saveLocal() {
  localStorage.setItem("reform-programs-by-user", JSON.stringify(state.programsByUser));
  localStorage.setItem("reform-sessions", JSON.stringify(state.sessions));
  localStorage.setItem("reform-users", JSON.stringify(state.users));
  localStorage.setItem("reform-selected-day", JSON.stringify(state.selectedDay));
  localStorage.setItem("reform-user", JSON.stringify(state.selectedUser));
  localStorage.setItem("reform-current-session", JSON.stringify(state.currentSessionId));
}

function supabaseConfig() {
  const config = window.REFORM_CONFIG || {};
  return {
    url: (config.supabaseUrl || "").replace(/\/$/, ""),
    key: config.supabaseAnonKey || ""
  };
}

async function api(path, options = {}) {
  const config = supabaseConfig();
  if (!config.url || !config.key) throw new Error("Supabase is not configured");
  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {})
    }
  });
  if (!response.ok) throw new Error(await response.text());
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function syncFromCloud() {
  try {
    const rows = await api("workout_state?id=eq.reform&select=*");
    if (rows[0]?.payload) {
      state = {
        ...state,
        programsByUser: rows[0].payload.programsByUser || migrateProgramPayload(rows[0].payload.program),
        sessions: rows[0].payload.sessions || state.sessions,
        users: rows[0].payload.users?.length ? rows[0].payload.users : state.users,
        selectedDay: rows[0].payload.selectedDay || state.selectedDay,
        selectedUser: rows[0].payload.selectedUser || state.selectedUser,
        currentSessionId: rows[0].payload.currentSessionId || "",
        onlineReady: true
      };
      normalizeState();
    } else {
      await syncToCloud();
      state.onlineReady = true;
    }
    status("Online shared", "online");
  } catch (error) {
    state.onlineReady = false;
    status("Local until Supabase", "local");
  }
  render();
}

async function syncToCloud() {
  saveLocal();
  const payload = {
    id: "reform",
    payload: {
      programsByUser: state.programsByUser,
      sessions: state.sessions,
      users: state.users,
      selectedDay: state.selectedDay,
      selectedUser: state.selectedUser,
      currentSessionId: state.currentSessionId
    },
    updated_at: new Date().toISOString()
  };
  try {
    await api("workout_state", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { Prefer: "resolution=merge-duplicates,return=representation" }
    });
    state.onlineReady = true;
    status("Online shared", "online");
  } catch {
    state.onlineReady = false;
    status("Saved locally", "local");
  }
}

function migrateProgramPayload(program) {
  if (!program?.length) return state.programsByUser;
  return {
    ...structuredClone(DEFAULT_PROGRAMS_BY_USER),
    Dima: structuredClone(program),
    Artem: structuredClone(program),
    Danil: structuredClone(program),
    Guest: structuredClone(program),
    Dasha: structuredClone(DEFAULT_DASHA_PROGRAM)
  };
}

function status(text, mode) {
  els.syncStatus.textContent = text;
  els.syncStatus.className = `sync-pill ${mode}`;
}

function currentProgram() {
  return state.programsByUser[state.selectedUser] || state.programsByUser.Dima || DEFAULT_PROGRAM;
}

function currentDay() {
  const program = currentProgram();
  return program.find(day => day.id === state.selectedDay) || program[0];
}

function currentSession() {
  return state.sessions.find(session => session.id === state.currentSessionId && session.status === "active");
}

function startSession() {
  if (currentSession()) {
    finishSession();
    return;
  }
  const day = currentDay();
  const session = {
    id: crypto.randomUUID(),
    dayId: day.id,
    dayName: day.name,
    user: state.selectedUser,
    date: new Date().toISOString(),
    status: "active",
    exercises: structuredClone(day.exercises)
  };
  state.sessions.unshift(session);
  state.currentSessionId = session.id;
  persist();
}

function finishSession() {
  const session = currentSession();
  if (!session) return;
  session.status = "completed";
  session.finishedAt = new Date().toISOString();
  state.currentSessionId = "";
  persist();
}

function skipDay() {
  if (!confirm(`Skip "${currentDay().name}" for ${state.selectedUser}?`)) return;
  const day = currentDay();
  state.sessions.unshift({
    id: crypto.randomUUID(),
    dayId: day.id,
    dayName: day.name,
    user: state.selectedUser,
    date: new Date().toISOString(),
    status: "skipped",
    exercises: []
  });
  state.currentSessionId = "";
  persist();
}

function persist() {
  saveLocal();
  render();
  syncToCloud();
}

function persistWithTransition() {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      saveLocal();
      render();
    });
    syncToCloud();
    return;
  }
  persist();
}

function render() {
  renderUsers();
  renderDays();
  renderWorkout();
  renderHistory();
  renderProgressOptions();
  renderProgress();
  renderProgramEditor();
}

function renderUsers() {
  els.userSelect.innerHTML = state.users.map(user => `<option value="${user}">${user}</option>`).join("");
  if (!state.users.includes(state.selectedUser)) state.selectedUser = state.users[0] || DEFAULT_USERS[0];
  els.userSelect.value = state.selectedUser;
  els.userNameInput.value = state.selectedUser;
}

function renderDays() {
  const day = currentDay();
  els.todayTitle.textContent = day.name;
  els.todayMeta.textContent = `${day.exercises.length} exercises · ${state.selectedUser}`;
  els.daySwitch.innerHTML = currentProgram().map(programDay => {
    const active = programDay.id === state.selectedDay ? "active" : "";
    return `<button class="tab day-btn ${active}" data-day="${programDay.id}" type="button">${programDay.name}</button>`;
  }).join("");
}

function renderWorkout() {
  const session = currentSession();
  els.sessionState.textContent = session ? `${session.status} · ${session.user}` : "Not started";
  els.startSessionBtn.textContent = session ? "Finish session" : "Start session";
  const exercises = session?.exercises || currentDay().exercises;
  els.exerciseList.innerHTML = exercises.map((exercise, index) => exerciseCard(exercise, index, Boolean(session))).join("");
}

function exerciseCard(exercise, index, hasSession) {
  const sets = exercise.sets.map((set, setIndex) => `
    <div class="set-row ${set.done ? "done" : ""}" data-exercise="${exercise.id}" data-set="${set.id}">
      <div class="set-number">${setIndex + 1}</div>
      <input inputmode="decimal" aria-label="Weight" value="${escapeHtml(set.weight)}" data-field="weight" placeholder="kg">
      <input inputmode="numeric" aria-label="Reps" value="${escapeHtml(set.reps)}" data-field="reps" placeholder="reps">
      <button class="ghost" data-action="toggle-set" type="button">${set.done ? "Done" : "Mark"}</button>
    </div>
  `).join("");

  return `
    <article class="exercise-card" data-exercise="${exercise.id}">
      <div class="exercise-head">
        <div class="exercise-title">
          <span class="machine-icon">${CATEGORY_LABELS[exercise.category] || "EX"}</span>
          <div>
            <h3>${escapeHtml(exercise.name)}</h3>
            <p class="muted">${escapeHtml(exercise.machine || "No note")}</p>
          </div>
        </div>
        <div class="exercise-actions">
          <button class="ghost" data-action="move-up" ${index === 0 ? "disabled" : ""} type="button">Up</button>
          <button class="ghost" data-action="move-down" type="button">Down</button>
          <button class="ghost" data-action="replace" type="button">${hasSession ? "Replace today" : "Edit"}</button>
          ${hasSession ? `<button class="ghost danger" data-action="skip-exercise" type="button">Skip</button>` : ""}
        </div>
      </div>
      <div class="sets">${sets}</div>
    </article>
  `;
}

function renderHistory() {
  if (!state.sessions.length) {
    els.historyList.innerHTML = `<div class="empty">No shared sessions yet.</div>`;
    return;
  }
  els.historyList.innerHTML = state.sessions.slice(0, 20).map(session => {
    const volume = session.exercises.reduce((sum, exercise) => {
      return sum + exercise.sets.reduce((setSum, set) => setSum + Number(set.weight || 0) * Number(set.reps || 0), 0);
    }, 0);
    return `
      <div class="history-row">
        <div>
          <strong>${escapeHtml(session.dayName)}</strong>
          <p class="muted">${new Date(session.date).toLocaleString("ru-RU")} · ${escapeHtml(session.user)}</p>
        </div>
        <span class="badge">${session.status} · ${Math.round(volume)} kg</span>
      </div>
    `;
  }).join("");
}

function renderProgressOptions() {
  const names = [...new Set(currentProgram().flatMap(day => day.exercises.map(exercise => exercise.name)))];
  const selected = els.progressExercise.value || names[0] || "";
  els.progressExercise.innerHTML = names.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
  els.progressExercise.value = names.includes(selected) ? selected : names[0] || "";
}

function renderProgress() {
  const name = els.progressExercise.value;
  const points = [];
  state.sessions.slice().reverse().forEach(session => {
    session.exercises.forEach(exercise => {
      if (exercise.name !== name) return;
      const topWeight = Math.max(...exercise.sets.map(set => Number(set.weight || 0)));
      const volume = exercise.sets.reduce((sum, set) => sum + Number(set.weight || 0) * Number(set.reps || 0), 0);
      points.push({ label: new Date(session.date).toLocaleDateString("ru-RU"), topWeight, volume });
    });
  });
  drawChart(points);
  const best = Math.max(0, ...points.map(point => point.topWeight));
  const totalVolume = points.reduce((sum, point) => sum + point.volume, 0);
  els.statsGrid.innerHTML = [
    stat("Sessions", points.length),
    stat("Best weight", `${best} kg`),
    stat("Total volume", `${Math.round(totalVolume)} kg`)
  ].join("");
}

function stat(label, value) {
  return `<div class="stat"><p class="muted">${label}</p><h3>${value}</h3></div>`;
}

function drawChart(points) {
  const canvas = els.progressChart;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#171d22";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#303a40";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = 36 + i * 68;
    ctx.beginPath();
    ctx.moveTo(46, y);
    ctx.lineTo(canvas.width - 28, y);
    ctx.stroke();
  }
  if (!points.length) {
    ctx.fillStyle = "#9ca6a7";
    ctx.font = "24px sans-serif";
    ctx.fillText("No progress data yet", 46, 190);
    return;
  }
  const max = Math.max(...points.map(point => point.topWeight), 1);
  const xStep = (canvas.width - 92) / Math.max(points.length - 1, 1);
  ctx.strokeStyle = "#e7ff55";
  ctx.lineWidth = 4;
  ctx.beginPath();
  points.forEach((point, index) => {
    const x = 46 + index * xStep;
    const y = 318 - (point.topWeight / max) * 260;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  points.forEach((point, index) => {
    const x = 46 + index * xStep;
    const y = 318 - (point.topWeight / max) * 260;
    ctx.fillStyle = "#e7ff55";
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f2f0e8";
    ctx.font = "14px sans-serif";
    ctx.fillText(`${point.topWeight}kg`, x - 16, y - 14);
  });
}

function renderProgramEditor() {
  els.programEditor.innerHTML = currentProgram().map(day => `
    <div class="panel day-editor" data-program-day="${day.id}">
      <div class="panel-head day-editor-head">
        <input class="day-name-input" value="${escapeHtml(day.name)}" data-rename-day="${day.id}" aria-label="Training day name">
        <div class="day-editor-actions">
          <span class="badge">${day.exercises.length} exercises</span>
          <button class="ghost danger" data-delete-day="${day.id}" type="button">Delete</button>
        </div>
      </div>
      <div class="day-switch">
        ${day.exercises.map(exercise => `<button class="ghost day-btn" data-edit-program="${day.id}" data-exercise="${exercise.id}" type="button">${escapeHtml(exercise.name)}</button>`).join("")}
      </div>
    </div>
  `).join("");
}

function activeExerciseList() {
  const session = currentSession();
  return session ? session.exercises : currentDay().exercises;
}

function mutateExercise(exerciseId, callback) {
  const list = activeExerciseList();
  const index = list.findIndex(exercise => exercise.id === exerciseId);
  if (index >= 0) callback(list, index);
  persist();
}

function openExerciseDialog(exercise = null, programDayId = null) {
  state.editingExerciseId = exercise?.id || null;
  state.editingProgramDayId = programDayId;
  els.dialogTitle.textContent = exercise ? "Edit exercise" : "Add exercise";
  els.exerciseName.value = exercise?.name || "";
  els.exerciseMachine.value = exercise?.machine || "";
  els.exerciseCategory.value = exercise?.category || "chest";
  els.dialog.showModal();
}

function saveExerciseFromDialog() {
  const payload = {
    id: state.editingExerciseId || crypto.randomUUID(),
    name: els.exerciseName.value.trim(),
    machine: els.exerciseMachine.value.trim(),
    category: els.exerciseCategory.value,
    sets: [
      { id: crypto.randomUUID(), weight: "", reps: "", done: false },
      { id: crypto.randomUUID(), weight: "", reps: "", done: false },
      { id: crypto.randomUUID(), weight: "", reps: "", done: false }
    ]
  };
  if (!payload.name) return;
  if (state.editingProgramDayId && state.editingExerciseId) {
    const day = currentProgram().find(item => item.id === state.editingProgramDayId);
    const index = day.exercises.findIndex(exercise => exercise.id === state.editingExerciseId);
    payload.sets = day.exercises[index].sets;
    day.exercises[index] = payload;
    persist();
  } else if (state.editingExerciseId) {
    mutateExercise(state.editingExerciseId, (list, index) => {
      payload.sets = list[index].sets;
      list[index] = payload;
    });
  } else {
    activeExerciseList().push(payload);
    persist();
  }
  state.editingProgramDayId = null;
  els.dialog.close();
}

function renameCurrentUser() {
  const nextName = els.userNameInput.value.trim();
  if (!nextName || nextName === state.selectedUser) return;
  if (state.users.includes(nextName)) {
    state.selectedUser = nextName;
    persist();
    return;
  }
  const oldName = state.selectedUser;
  state.users = state.users.map(user => user === oldName ? nextName : user);
  state.programsByUser[nextName] = state.programsByUser[oldName] || structuredClone(DEFAULT_PROGRAM);
  delete state.programsByUser[oldName];
  state.sessions.forEach(session => {
    if (session.user === oldName) session.user = nextName;
  });
  state.selectedUser = nextName;
  persist();
}

function deleteCurrentUser() {
  if (state.users.length <= 1) {
    alert("At least one user must stay.");
    return;
  }
  if (!confirm(`Delete user "${state.selectedUser}" and their program? History will stay.`)) return;
  const deletedUser = state.selectedUser;
  state.users = state.users.filter(user => user !== deletedUser);
  delete state.programsByUser[deletedUser];
  if (currentSession()?.user === deletedUser) state.currentSessionId = "";
  state.selectedUser = state.users[0];
  state.selectedDay = currentProgram()[0]?.id || "";
  persist();
}

function addGuestUser() {
  const base = "Guest";
  let index = state.users.filter(user => user.startsWith(base)).length + 1;
  let name = `${base} ${index}`;
  while (state.users.includes(name)) {
    index += 1;
    name = `${base} ${index}`;
  }
  state.users.push(name);
  state.programsByUser[name] = structuredClone(DEFAULT_PROGRAM);
  state.selectedUser = name;
  state.selectedDay = state.programsByUser[name][0].id;
  persist();
}

function addTrainingDay() {
  const name = prompt("Training day name", "New training day")?.trim();
  if (!name) return;
  const id = `day-${crypto.randomUUID()}`;
  currentProgram().push({
    id,
    name,
    exercises: [
      item(`exercise-${crypto.randomUUID()}`, "New exercise", "", [12, 12, 12], "Edit me", "legs")
    ]
  });
  state.selectedDay = id;
  persistWithTransition();
}

function deleteTrainingDay(dayId) {
  const program = currentProgram();
  const day = program.find(item => item.id === dayId);
  if (!day) return;
  if (program.length <= 1) {
    alert("At least one training day must stay.");
    return;
  }
  if (!confirm(`Delete "${day.name}" for ${state.selectedUser}?`)) return;
  const index = program.findIndex(item => item.id === dayId);
  program.splice(index, 1);
  if (state.selectedDay === dayId) state.selectedDay = program[0].id;
  persistWithTransition();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

document.addEventListener("click", event => {
  const tab = event.target.closest(".tab[data-view]");
  if (tab) {
    document.querySelectorAll(".tab[data-view]").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach(view => view.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.view}View`).classList.add("active");
  }

  const dayButton = event.target.closest("[data-day]");
  if (dayButton) {
    state.selectedDay = dayButton.dataset.day;
    state.currentSessionId = "";
    persist();
  }

  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const card = actionButton.closest("[data-exercise]");
    const exerciseId = card?.dataset.exercise;
    const action = actionButton.dataset.action;
    if (action === "toggle-set") {
      const row = actionButton.closest("[data-set]");
      const setId = row.dataset.set;
      mutateExercise(exerciseId, list => {
        const exercise = list.find(item => item.id === exerciseId);
        const set = exercise.sets.find(item => item.id === setId);
        set.done = !set.done;
      });
    }
    if (action === "move-up") {
      const list = activeExerciseList();
      const index = list.findIndex(exercise => exercise.id === exerciseId);
      if (index > 0) [list[index - 1], list[index]] = [list[index], list[index - 1]];
      persistWithTransition();
    }
    if (action === "move-down") {
      const list = activeExerciseList();
      const index = list.findIndex(exercise => exercise.id === exerciseId);
      if (index < list.length - 1) [list[index + 1], list[index]] = [list[index], list[index + 1]];
      persistWithTransition();
    }
    if (action === "skip-exercise") {
      if (!confirm("Skip this exercise for the active session?")) return;
      mutateExercise(exerciseId, (list, index) => list.splice(index, 1));
    }
    if (action === "replace") {
      openExerciseDialog(activeExerciseList().find(exercise => exercise.id === exerciseId));
    }
  }

  const programEdit = event.target.closest("[data-edit-program]");
  if (programEdit) {
    state.selectedDay = programEdit.dataset.editProgram;
    const exercise = currentDay().exercises.find(item => item.id === programEdit.dataset.exercise);
    openExerciseDialog(exercise, programEdit.dataset.editProgram);
  }

  const deleteDay = event.target.closest("[data-delete-day]");
  if (deleteDay) {
    deleteTrainingDay(deleteDay.dataset.deleteDay);
  }
});

document.addEventListener("input", event => {
  const dayName = event.target.closest("[data-rename-day]");
  if (dayName) {
    const day = currentProgram().find(item => item.id === dayName.dataset.renameDay);
    if (day) {
      day.name = dayName.value;
      saveLocal();
      syncToCloud();
      renderDays();
    }
    return;
  }

  const input = event.target.closest(".set-row input");
  if (!input) return;
  const row = input.closest("[data-exercise][data-set]");
  const exerciseId = row.dataset.exercise;
  const setId = row.dataset.set;
  mutateExercise(exerciseId, list => {
    const exercise = list.find(item => item.id === exerciseId);
    const set = exercise.sets.find(item => item.id === setId);
    set[input.dataset.field] = input.value;
  });
});

els.userSelect.addEventListener("change", () => {
  state.selectedUser = els.userSelect.value;
  els.userNameInput.value = state.selectedUser;
  if (!currentProgram().some(day => day.id === state.selectedDay)) {
    state.selectedDay = currentProgram()[0]?.id || "";
  }
  persist();
});
els.renameUserBtn.addEventListener("click", renameCurrentUser);
els.addGuestBtn.addEventListener("click", addGuestUser);
els.deleteUserBtn.addEventListener("click", deleteCurrentUser);
els.startSessionBtn.addEventListener("click", startSession);
els.skipDayBtn.addEventListener("click", skipDay);
els.refreshBtn.addEventListener("click", syncFromCloud);
els.progressExercise.addEventListener("change", renderProgress);
els.addExerciseBtn.addEventListener("click", () => openExerciseDialog());
els.addDayBtn.addEventListener("click", addTrainingDay);
els.saveExerciseBtn.addEventListener("click", saveExerciseFromDialog);
els.resetProgramBtn.addEventListener("click", () => {
  if (!confirm(`Reset program for ${state.selectedUser}?`)) return;
  state.programsByUser[state.selectedUser] = structuredClone(DEFAULT_PROGRAMS_BY_USER[state.selectedUser] || DEFAULT_PROGRAM);
  state.currentSessionId = "";
  state.selectedDay = currentProgram()[0]?.id || "";
  persist();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

render();
syncFromCloud();
