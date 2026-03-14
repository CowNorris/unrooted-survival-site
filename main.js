const config = {
  status: "Em desenvolvimento",
  brand: {
    name: "Unrooted Survival",
    logoUrl: "https://cdn.discordapp.com/attachments/772927928983617566/1482322307941797999/Unrooted_Survival_FOTO_2.png?ex=69b687ba&is=69b5363a&hm=95d8dd419300240ab65ef9f9ada9fddb5423c5d64a838eff03c4afc825853755&",
  },
  discord: {
    inviteUrl: "https://discord.gg/b9RXNGth6x",
    widgetUrl: "",
  },
  overview: {
    currentVersion: "0.1.0",
    nextVersion: "0.1.1",
    progress: [
      { label: "Gameplay", value: 35 },
      { label: "Arte", value: 10 },
      { label: "Som", value: 5 },
    ],
    requirements: [
      { k: "SO", v: "Windows 10/11 (por enquanto)" },
      { k: "CPU", v: "Qualquer 4 núcleos (prévia)" },
      { k: "RAM", v: "4 GB (prévia)" },
      { k: "GPU", v: "Qualquer dedicada ou integrada mais recente (prévia)" },
    ],
  },
  downloads: {
    windows: "",
    web: "",
  },
  now: {
    text: "Trabalhando no básico: movimento, câmera e uma área de teste (mapa provisório).",
    weekGoals: [
      "Fazer um mapa simples de teste (blocos/colisão)",
      "Ajustar pulo e gravidade",
      "Adicionar 1 inimigo bem simples para testar combate",
    ],
  },
  controls: [
    { action: "Mover", keys: "WASD / Setas" },
    { action: "Pular", keys: "Espaço" },
    { action: "Ataque", keys: "Mouse 1 / Ctrl" },
    { action: "Dash", keys: "Shift" },
    { action: "Pausar", keys: "Esc" },
  ],
  knownBugs: [
    "Às vezes a colisão dá um pequeno tremor perto de paredes.",
    "Pode acontecer de o personagem “grudar” em quinas específicas (em teste).",
  ],
  suggestions: {
    formUrl: "",
    discordUrl: "",
  },
  feedbackTemplate: [
    "Versão do jogo: v0.0.0",
    "PC: Windows / placa de vídeo / RAM (se souber)",
    "O que eu fiz (passo a passo):",
    "O que aconteceu:",
    "O que era pra acontecer:",
    "Vídeo/print (se tiver):",
  ],
  beta: {
    formUrl: "",
    discordUrl: "",
    email: "seuemail@exemplo.com",
    checklist: [
      "Testar controles (andar, pular, atacar) por 10 minutos",
      "Tentar travar o jogo (pular em cantos, bater em paredes)",
      "Ver se a performance fica ok (travadas, quedas de FPS)",
      "Avisar se algo ficar confuso (UI, objetivo, direção)",
    ],
    bugTemplate: [
      "Versão do beta:",
      "PC (se souber):",
      "Passo a passo pra reproduzir:",
      "Resultado atual:",
      "Resultado esperado:",
      "Vídeo/print:",
    ],
  },
  betaTesters: [
    { name: "Yagzera", image: "https://cdn.discordapp.com/attachments/1441552848419684402/1481253960042942677/ChatGPT_Image_4_de_nov._de_2025_06_20_07_1.png?ex=69b5f080&is=69b49f00&hm=e954ab5f8659b2a60096215d5fa660aae5f4e06fd739ba2604957fe9eb0c81a6&" },
  ],
  credits: [
    { role: "Game dev", name: "Cruz Jhonsons" },
    { role: "Engine", name: "Unity" },
    { role: "Testes", name: "Beta testers (lista acima)" },
  ],
};

const updates = [
  {
    date: "2026-03-11",
    version: "0.1.0",
    title: "Primeira build interna",
    tags: ["Mapa de teste" ],
    devNote: "Hoje foquei na criação do mapa de teste",
    changes: [
      "Mapa de teste como cidades e ruas e etc",
      // "Primeiros inimigos (teste)",
      // "Ajustes iniciais de câmera",
    ],
  },
  // {
  //   date: "2026-03-07",
  //   version: "0.0.9",
  //   title: "Melhorias e correções",
  //   tags: ["bugfix", "polimento"],
  //   changes: [
  //     "Correção de bug de colisão em paredes",
  //     "Melhoria na responsividade dos controles",
  //     "UI mais limpa (protótipo)",
  //   ],
  // },
];

const betaBuilds = [];

const el = {
  latestVersion: document.getElementById("latestVersion"),
  latestDate: document.getElementById("latestDate"),
  statusValue: document.getElementById("statusValue"),
  brandTextTop: document.getElementById("brandTextTop"),
  brandTextFooter: document.getElementById("brandTextFooter"),
  brandLogoTop: document.getElementById("brandLogoTop"),
  brandLogoFooter: document.getElementById("brandLogoFooter"),
  brandDotTop: document.getElementById("brandDotTop"),
  brandDotFooter: document.getElementById("brandDotFooter"),
  heroTitle: document.getElementById("heroTitle"),
  heroBadge: document.getElementById("heroBadge"),
  discordTopLink: document.getElementById("discordTopLink"),
  currentVersionValue: document.getElementById("currentVersionValue"),
  nextVersionValue: document.getElementById("nextVersionValue"),
  progressList: document.getElementById("progressList"),
  requirementsList: document.getElementById("requirementsList"),
  nowText: document.getElementById("nowText"),
  weekGoalsList: document.getElementById("weekGoalsList"),
  controlsList: document.getElementById("controlsList"),
  bugsList: document.getElementById("bugsList"),
  bugsEmpty: document.getElementById("bugsEmpty"),
  testersList: document.getElementById("testersList"),
  testersEmpty: document.getElementById("testersEmpty"),
  creditsList: document.getElementById("creditsList"),
  suggestionFormLink: document.getElementById("suggestionFormLink"),
  suggestionDiscordLink: document.getElementById("suggestionDiscordLink"),
  feedbackTemplate: document.getElementById("feedbackTemplate"),
  updatesList: document.getElementById("updatesList"),
  emptyState: document.getElementById("emptyState"),
  searchInput: document.getElementById("searchInput"),
  tagSelect: document.getElementById("tagSelect"),
  themeToggle: document.getElementById("themeToggle"),
  downloadWindows: document.getElementById("downloadWindows"),
  downloadWeb: document.getElementById("downloadWeb"),
  betaList: document.getElementById("betaList"),
  betaEmpty: document.getElementById("betaEmpty"),
  betaChecklist: document.getElementById("betaChecklist"),
  betaBugTemplate: document.getElementById("betaBugTemplate"),
  betaFormLink: document.getElementById("betaFormLink"),
  betaDiscordLink: document.getElementById("betaDiscordLink"),
  betaEmailLink: document.getElementById("betaEmailLink"),
  discordCardInvite: document.getElementById("discordCardInvite"),
  discordEmbedWrap: document.getElementById("discordEmbedWrap"),
  discordEmbedFrame: document.getElementById("discordEmbedFrame"),
};

function clampPercent(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function initialsFromName(name) {
  const parts = String(name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toUpperCase();
}

function getDiscordInviteUrl() {
  return (
    String(config.discord?.inviteUrl ?? "").trim() ||
    String(config.beta?.discordUrl ?? "").trim() ||
    String(config.suggestions?.discordUrl ?? "").trim()
  );
}

function getDiscordWidgetUrl() {
  return String(config.discord?.widgetUrl ?? "").trim();
}

function renderBrand() {
  const name = String(config.brand?.name ?? "").trim() || "Unrooted Survival";
  const logoUrl = String(config.brand?.logoUrl ?? "").trim();

  if (el.brandTextTop) el.brandTextTop.textContent = name;
  if (el.brandTextFooter) el.brandTextFooter.textContent = name;
  if (el.heroTitle) el.heroTitle.textContent = name;
  if (el.heroBadge) el.heroBadge.textContent = `Devlog • ${name}`;

  document.title = name;

  if (el.brandLogoTop) el.brandLogoTop.hidden = !logoUrl;
  if (el.brandLogoFooter) el.brandLogoFooter.hidden = !logoUrl;
  if (el.brandDotTop) el.brandDotTop.hidden = Boolean(logoUrl);
  if (el.brandDotFooter) el.brandDotFooter.hidden = Boolean(logoUrl);

  if (logoUrl) {
    if (el.brandLogoTop) el.brandLogoTop.src = logoUrl;
    if (el.brandLogoFooter) el.brandLogoFooter.src = logoUrl;
  }
}

function formatDate(iso) {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function setLink(anchor, url) {
  if (!anchor) return;
  const cleaned = String(url ?? "").trim();
  if (!cleaned) {
    anchor.setAttribute("href", "#");
    anchor.setAttribute("aria-disabled", "true");
    return;
  }
  anchor.setAttribute("href", cleaned);
  anchor.removeAttribute("aria-disabled");
  if (/^https?:\/\//i.test(cleaned)) anchor.setAttribute("target", "_blank");
  if (/^https?:\/\//i.test(cleaned)) anchor.setAttribute("rel", "noreferrer");
}

function sortByDateDesc(items) {
  return [...items].sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function computeTags(items) {
  const tags = new Set();
  for (const item of items) {
    for (const tag of item.tags ?? []) tags.add(String(tag));
  }
  return [...tags].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function renderTagOptions() {
  const tags = computeTags(updates);
  for (const tag of tags) {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    el.tagSelect.appendChild(opt);
  }
}

function updateHeroMeta() {
  el.statusValue.textContent = config.status || "—";
  const latest = sortByDateDesc(updates)[0];
  if (!latest) {
    el.latestVersion.textContent = "—";
    el.latestDate.textContent = "—";
    return;
  }
  el.latestVersion.textContent = latest.version ? `v${latest.version}` : "—";
  el.latestDate.textContent = latest.date ? formatDate(latest.date) : "—";
}

function buildUpdateCard(update) {
  const article = document.createElement("article");
  article.className = "update";

  const head = document.createElement("div");
  head.className = "update__head";

  const title = document.createElement("h3");
  title.className = "update__title";
  const versionText = update.version ? `v${update.version}` : "Atualização";
  title.textContent = update.title ? `${versionText} — ${update.title}` : versionText;

  const meta = document.createElement("div");
  meta.className = "update__meta";
  meta.textContent = update.date ? formatDate(update.date) : "";

  head.appendChild(title);
  head.appendChild(meta);

  const pills = document.createElement("div");
  pills.className = "pills";
  for (const tag of update.tags ?? []) {
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = tag;
    pills.appendChild(pill);
  }

  const body = document.createElement("div");
  body.className = "update__body";

  if (update.devNote) {
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = update.devNote;
    body.appendChild(p);
  }

  if (Array.isArray(update.changes) && update.changes.length > 0) {
    const ul = document.createElement("ul");
    for (const line of update.changes) {
      const li = document.createElement("li");
      li.textContent = line;
      ul.appendChild(li);
    }
    body.appendChild(ul);
  } else {
    body.textContent = "Sem detalhes ainda.";
  }

  article.appendChild(head);
  article.appendChild(pills);
  article.appendChild(body);
  return article;
}

function matchesFilter(update, query, tag) {
  if (tag && !(update.tags ?? []).includes(tag)) return false;
  if (!query) return true;

  const haystack = [
    update.title,
    update.version,
    update.devNote,
    ...(update.tags ?? []),
    ...(update.changes ?? []),
  ]
    .map(normalize)
    .join(" | ");

  return haystack.includes(query);
}

function renderUpdates() {
  const query = normalize(el.searchInput.value);
  const tag = el.tagSelect.value;

  const visible = sortByDateDesc(updates).filter((u) => matchesFilter(u, query, tag));

  el.updatesList.innerHTML = "";
  for (const update of visible) el.updatesList.appendChild(buildUpdateCard(update));

  el.emptyState.hidden = visible.length > 0;
}

function buildBetaCard(build) {
  const wrap = document.createElement("div");
  wrap.className = "build";

  const top = document.createElement("div");
  top.className = "build__top";

  const name = document.createElement("div");
  name.className = "build__name";
  name.textContent = build.name || "Build do beta";

  const date = document.createElement("div");
  date.className = "build__date";
  date.textContent = build.date ? formatDate(build.date) : "";

  top.appendChild(name);
  top.appendChild(date);

  const links = document.createElement("div");
  links.className = "build__links";

  if (build.links?.windows) {
    const a = document.createElement("a");
    a.className = "link";
    a.href = build.links.windows;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = "Windows";
    links.appendChild(a);
  }
  if (build.links?.web) {
    const a = document.createElement("a");
    a.className = "link";
    a.href = build.links.web;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = "Web";
    links.appendChild(a);
  }

  wrap.appendChild(top);

  if (build.focus) {
    const focus = document.createElement("div");
    focus.className = "muted";
    focus.textContent = `Foco do teste: ${build.focus}`;
    wrap.appendChild(focus);
  }

  if (links.childElementCount > 0) wrap.appendChild(links);

  if (Array.isArray(build.notes) && build.notes.length > 0) {
    const body = document.createElement("div");
    body.className = "update__body";
    const ul = document.createElement("ul");
    for (const line of build.notes) {
      const li = document.createElement("li");
      li.textContent = line;
      ul.appendChild(li);
    }
    body.appendChild(ul);
    wrap.appendChild(body);
  }

  return wrap;
}

function renderBeta() {
  if (!el.betaList || !el.betaEmpty) return;
  el.betaList.innerHTML = "";
  const items = sortByDateDesc(betaBuilds);
  for (const build of items) el.betaList.appendChild(buildBetaCard(build));
  el.betaEmpty.hidden = items.length > 0;

  setLink(el.betaFormLink, config.beta.formUrl);
  setLink(el.betaDiscordLink, getDiscordInviteUrl());
  if (el.betaEmailLink) {
    el.betaEmailLink.textContent = config.beta.email;
    el.betaEmailLink.href = `mailto:${config.beta.email}`;
  }

  if (el.betaChecklist) {
    el.betaChecklist.innerHTML = "";
    for (const item of config.beta.checklist ?? []) {
      const li = document.createElement("li");
      li.textContent = item;
      el.betaChecklist.appendChild(li);
    }
  }

  if (el.betaBugTemplate) el.betaBugTemplate.textContent = (config.beta.bugTemplate ?? []).join("\n");
}

function applyInitialLinks() {
  setLink(el.downloadWindows, config.downloads.windows);
  setLink(el.downloadWeb, config.downloads.web);
}

function renderDiscord() {
  const invite = getDiscordInviteUrl();
  setLink(el.discordTopLink, invite);
  setLink(el.discordCardInvite, invite);

  if (!el.discordEmbedWrap || !el.discordEmbedFrame) return;
  const widgetUrl = getDiscordWidgetUrl();
  if (!widgetUrl) {
    el.discordEmbedWrap.hidden = true;
    el.discordEmbedFrame.removeAttribute("src");
    return;
  }
  el.discordEmbedFrame.setAttribute("src", widgetUrl);
  el.discordEmbedWrap.hidden = false;
}

function renderOverview() {
  if (el.currentVersionValue) {
    el.currentVersionValue.textContent = config.overview?.currentVersion ? `v${config.overview.currentVersion}` : "—";
  }
  if (el.nextVersionValue) {
    el.nextVersionValue.textContent = config.overview?.nextVersion ? `v${config.overview.nextVersion}` : "—";
  }

  if (el.progressList) {
    el.progressList.innerHTML = "";
    for (const item of config.overview?.progress ?? []) {
      const value = clampPercent(item.value);

      const row = document.createElement("div");
      row.className = "progress__row";

      const top = document.createElement("div");
      top.className = "progress__top";

      const label = document.createElement("div");
      label.className = "progress__label";
      label.textContent = item.label || "Progresso";

      const pct = document.createElement("div");
      pct.className = "progress__value";
      pct.textContent = `${value}%`;

      top.appendChild(label);
      top.appendChild(pct);

      const bar = document.createElement("div");
      bar.className = "progress__bar";

      const fill = document.createElement("div");
      fill.className = "progress__fill";
      fill.style.width = `${value}%`;
      bar.appendChild(fill);

      row.appendChild(top);
      row.appendChild(bar);
      el.progressList.appendChild(row);
    }
  }

  if (el.requirementsList) {
    el.requirementsList.innerHTML = "";
    for (const req of config.overview?.requirements ?? []) {
      const item = document.createElement("div");
      item.className = "kv";

      const k = document.createElement("div");
      k.className = "kv__k";
      k.textContent = req.k || "Item";

      const v = document.createElement("div");
      v.className = "kv__v";
      v.textContent = req.v || "—";

      item.appendChild(k);
      item.appendChild(v);
      el.requirementsList.appendChild(item);
    }
  }
}

function renderTesters() {
  if (!el.testersList || !el.testersEmpty) return;
  el.testersList.innerHTML = "";

  const testers = (config.betaTesters ?? []).filter((t) => String(t?.name ?? "").trim().length > 0);
  for (const tester of testers) {
    const row = document.createElement("div");
    row.className = "tester";

    const avatar = document.createElement("div");
    avatar.className = "tester__avatar";

    const imgPath = String(tester.image ?? "").trim();
    if (imgPath) {
      const img = document.createElement("img");
      img.src = imgPath;
      img.alt = tester.name;
      avatar.appendChild(img);
    } else {
      avatar.textContent = initialsFromName(tester.name);
    }

    const name = document.createElement("div");
    name.className = "tester__name";
    name.textContent = tester.name;

    row.appendChild(avatar);
    row.appendChild(name);
    el.testersList.appendChild(row);
  }

  el.testersEmpty.hidden = testers.length > 0;
}

function renderCredits() {
  if (!el.creditsList) return;
  el.creditsList.innerHTML = "";
  for (const item of config.credits ?? []) {
    const row = document.createElement("div");
    row.className = "kv";

    const k = document.createElement("div");
    k.className = "kv__k";
    k.textContent = item.role || "Crédito";

    const v = document.createElement("div");
    v.className = "kv__v";
    v.textContent = item.name || "—";

    row.appendChild(k);
    row.appendChild(v);
    el.creditsList.appendChild(row);
  }
}

function renderNow() {
  if (el.nowText) el.nowText.textContent = config.now?.text || "—";
  if (!el.weekGoalsList) return;
  el.weekGoalsList.innerHTML = "";
  for (const goal of config.now?.weekGoals ?? []) {
    const li = document.createElement("li");
    li.textContent = goal;
    el.weekGoalsList.appendChild(li);
  }
}

function renderControls() {
  if (!el.controlsList) return;
  el.controlsList.innerHTML = "";
  for (const row of config.controls ?? []) {
    const item = document.createElement("div");
    item.className = "kv";

    const k = document.createElement("div");
    k.className = "kv__k";
    k.textContent = row.action || "Ação";

    const v = document.createElement("div");
    v.className = "kv__v";
    v.textContent = row.keys || "—";

    item.appendChild(k);
    item.appendChild(v);
    el.controlsList.appendChild(item);
  }
}

function renderBugs() {
  if (!el.bugsList || !el.bugsEmpty) return;
  el.bugsList.innerHTML = "";
  for (const bug of config.knownBugs ?? []) {
    const li = document.createElement("li");
    li.textContent = bug;
    el.bugsList.appendChild(li);
  }
  el.bugsEmpty.hidden = (config.knownBugs ?? []).length > 0;
}

function renderFeedback() {
  if (!el.feedbackTemplate) return;
  setLink(el.suggestionFormLink, config.suggestions.formUrl);
  setLink(el.suggestionDiscordLink, getDiscordInviteUrl());
  el.feedbackTemplate.textContent = (config.feedbackTemplate ?? []).join("\n");
}

function getCurrentTheme() {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "dark" || explicit === "light") return explicit;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeButton() {
  const theme = getCurrentTheme();
  el.themeToggle.textContent = theme === "dark" ? "Tema: Escuro" : "Tema: Claro";
}

function setTheme(theme) {
  if (theme !== "dark" && theme !== "light") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("theme");
    updateThemeButton();
    return;
  }
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeButton();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  if (current === "dark") return setTheme("light");
  if (current === "light") return setTheme("dark");
  return setTheme("dark");
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") document.documentElement.setAttribute("data-theme", saved);
  updateThemeButton();
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (!document.documentElement.getAttribute("data-theme")) updateThemeButton();
    });
  }
  el.themeToggle.addEventListener("click", toggleTheme);
}

function initFilters() {
  renderTagOptions();
  el.searchInput.addEventListener("input", renderUpdates);
  el.tagSelect.addEventListener("change", renderUpdates);
}

updateHeroMeta();
renderBrand();
applyInitialLinks();
renderDiscord();
renderNow();
renderControls();
renderBugs();
renderTesters();
renderFeedback();
renderCredits();
initTheme();
initFilters();
renderUpdates();
renderBeta();
