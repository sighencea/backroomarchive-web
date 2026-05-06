const $ = (id) => document.getElementById(id);

const landing   = $("landing");
const archive   = $("archive");
const scanScrim = $("scan-scrim");
const scanModal = scanScrim.querySelector(".security-modal");
const scanLog   = $("security-log");
const scanBar   = $("security-bar-fill");
const scanGrant = $("security-grant");
const flash     = $("flash");
const openBtn   = $("open-scan");

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- security scan sequence ---------- */
const SECURITY_STEPS = [
  { msg: "Booting up...",                          duration: 1600 },
  { msg: "Scanning keyboard fingerprints...",      duration: 2200 },
  { msg: "Building biometric facial features...", duration: 2500 },
  { msg: "User successfully scanned.",             duration: 1000 },
  { msg: "Information encrypted successfully...",  duration: 1400 },
];

const AUTH_KEY = "backroom_auth_at";
const AUTH_WINDOW_MS = 15 * 60 * 1000;

const SUCCESS_SFX = new Audio("assets/system-infiltrated.mp3");
SUCCESS_SFX.preload = "auto";
SUCCESS_SFX.volume = 0.8;

const ALERT_SFX = new Audio("assets/ui-alert.mp3");
ALERT_SFX.preload = "auto";
ALERT_SFX.volume = 0.7;

const playSfx = (audio) => {
  try {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch (_) {}
};

const isStillAuthenticated = () => {
  const ts = parseInt(localStorage.getItem(AUTH_KEY) || "0", 10);
  return ts > 0 && (Date.now() - ts) < AUTH_WINDOW_MS;
};
const markAuthenticated = () => {
  localStorage.setItem(AUTH_KEY, String(Date.now()));
};

let scanRunning = false;

async function runSecurityScan() {
  if (scanRunning) return;
  scanRunning = true;
  openBtn.disabled = true;

  playSfx(ALERT_SFX);

  scanLog.innerHTML = "";
  scanGrant.classList.remove("show");
  scanModal.classList.remove("compact");
  scanBar.style.transition = "none";
  scanBar.style.width = "0%";
  void scanBar.offsetWidth; // force reflow so the next transition takes

  scanScrim.classList.add("show");

  if (isStillAuthenticated()) {
    // session still valid — show only the green grant in a compact frame
    scanModal.classList.add("compact");
    await wait(220);
    scanGrant.classList.add("show");
    await wait(950);
  } else {
    const total = SECURITY_STEPS.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;

    for (const step of SECURITY_STEPS) {
      const line = document.createElement("li");
      line.className = "security-line pending";
      line.innerHTML = `
        <span class="security-icon" aria-hidden="true"></span>
        <span class="security-msg">${step.msg}</span>
        <span class="security-status">…</span>
      `;
      scanLog.appendChild(line);

      elapsed += step.duration;
      scanBar.style.transition = `width ${step.duration}ms linear`;
      scanBar.style.width = ((elapsed / total) * 100) + "%";

      await wait(step.duration);

      line.classList.remove("pending");
      line.classList.add("done");
      line.querySelector(".security-status").textContent = "OK";
    }

    // last step completed — play the success chime
    playSfx(SUCCESS_SFX);

    await wait(260);
    scanGrant.classList.add("show");
    await wait(1100);
  }

  markAuthenticated();
  scanScrim.classList.remove("show");

  await wait(180);
  unlock();
  scanRunning = false;
}

openBtn.addEventListener("click", runSecurityScan);

/* ---------- unlock & transition into archive ---------- */
function unlock() {
  flash.classList.add("on");
  setTimeout(() => flash.classList.remove("on"), 700);

  setTimeout(() => landing.classList.add("fade-out"), 120);

  setTimeout(() => {
    archive.classList.add("show");
    archive.setAttribute("aria-hidden", "false");
    document.body.classList.add("archive-open");
    setTimeout(() => { landing.style.display = "none"; }, 1200);
  }, 700);
}

/* ---------- lock again ---------- */
function lockVault(e) {
  if (e) e.preventDefault();
  archive.classList.remove("show");
  archive.setAttribute("aria-hidden", "true");
  landing.style.display = "";
  requestAnimationFrame(() => landing.classList.remove("fade-out"));
  openBtn.disabled = false;
  document.body.classList.remove("archive-open");
  window.scrollTo(0, 0);
  localStorage.removeItem(AUTH_KEY);
  if (location.hash === "#archive") {
    history.replaceState(null, "", location.pathname + location.search);
  }
}
$("lock").addEventListener("click", lockVault);
$("brand-lock").addEventListener("click", lockVault);

/* ---------- entry catalogue (Drawer A · Physical Product) ---------- */
const PHYSICAL_ENTRIES = [
  { i: "001", t: "Save//State Vault", d: "NFC memory-card vault · 1999 nostalgia",     href: "products/save-state-vault.html", live: true },
  { i: "002", t: "Rewind//01",        d: "Cassette-style scrub wheel · Haptic deck",   href: "products/rewind-01.html",        live: true },
  { i: "003", t: "Flpy//Stack",       d: "Modular floppy-disk desk system",            href: "products/flpy-stack.html",       live: true },
  { i: "004", t: "CRT//Lamp",         d: "Phosphor-glow desk lamp",                    href: "products/crt-lamp.html",         live: true },
  { i: "005", t: "Dial//01",          d: "Rotary macro controller · Click feedback",   href: "products/dial-01.html",          live: true },
  { i: "006", t: "Walk//Case",        d: "Walkman-inspired EDC carry system",          href: "products/walk-case.html",        live: true },
  { i: "007", t: "Boot//Sequence",    d: "Toggle-switch routine panel",                href: "products/boot-sequence.html",    live: true },
  { i: "008", t: "Tape//Lock",        d: "Hardware encryption · Cassette ritual",      href: "products/tape-lock.html",        live: true },
  { i: "009", t: "Pixel//Frame",      d: "Mechanical flip-tile screenless display",    href: "products/pixel-frame.html",      live: true },
  { i: "010", t: "Cart//Case",        d: "Game-cartridge profile switcher",            href: "products/cart-case.html",        live: true },
  { i: "011", t: "Sync//Dock",        d: "PDA-cradle focus dock · Disconnect ritual",  href: "products/sync-dock.html",        live: true },
  { i: "012", t: "Key//Board 84",     d: "Terminal-inspired mechanical keyboard",      href: "products/key-board-84.html",     live: true },
  { i: "013", t: "Signal//Meter",     d: "Analog focus gauge · Walnut housing",        href: "products/signal-meter.html",     live: true },
  { i: "014", t: "Offline//Box",      d: "Faraday-lined disconnect lockbox",           href: "products/offline-box.html",      live: true },
  { i: "015", t: "Mod//Phone",        d: "Modular Nokia-inspired smart hub",           href: "products/mod-phone.html",        live: true },
  { i: "016", t: "Load//Screen",      d: "Ambient CRT-style progress display",         href: "products/load-screen.html",      live: true },
];

/* ---------- drawer / sub-vault definitions ---------- */
const DRAWERS = [
  { id: "physical-product", letter: "A", name: "Physical Product", live: true, entries: PHYSICAL_ENTRIES },
  { id: "logo",             letter: "B", name: "Logo",             live: false },
  { id: "books",            letter: "C", name: "Books",            live: false },
  { id: "web",              letter: "D", name: "Web",              live: false },
  { id: "app",              letter: "E", name: "App",              live: false },
];

const drawerRow    = $("drawer-row");
const drawerSelect = $("drawer-select");
const drawerLabel  = $("drawer-label");
const drawerEmpty  = $("drawer-empty");
const drawerEmptyTitle = $("drawer-empty-title");
const grid         = $("grid");

let activeDrawerId = "physical-product";
let renderedDrawerId = null;

function renderDrawerCards() {
  drawerRow.innerHTML = "";
  drawerSelect.innerHTML = "";
  DRAWERS.forEach((d) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "drawer-card" + (d.live ? "" : " coming") + (d.id === activeDrawerId ? " active" : "");
    btn.dataset.drawer = d.id;
    const meta = d.live
      ? `${(d.entries || []).filter((e) => e.live).length} entries`
      : "Coming soon";
    btn.innerHTML = `
      <span class="drawer-letter">${d.letter}</span>
      <span class="drawer-name">${d.name}</span>
      <span class="drawer-meta">${meta}</span>
    `;
    btn.addEventListener("click", () => selectDrawer(d.id));
    drawerRow.appendChild(btn);

    const opt = document.createElement("option");
    opt.value = d.id;
    opt.textContent = `Drawer ${d.letter} · ${d.name}` + (d.live ? "" : " — Coming soon");
    if (d.id === activeDrawerId) opt.selected = true;
    drawerSelect.appendChild(opt);
  });
}

drawerSelect.addEventListener("change", (e) => selectDrawer(e.target.value));

function renderEntries(entries) {
  grid.innerHTML = "";
  entries.forEach((e) => {
    const card = document.createElement(e.live ? "a" : "button");
    card.className = "card" + (e.live ? " live" : " coming");
    if (e.live) {
      card.href = e.href;
    } else {
      card.type = "button";
    }
    card.innerHTML = `
      <svg class="corner tl" viewBox="0 0 14 14"><path d="M1 5 V1 H5"/></svg>
      <svg class="corner tr" viewBox="0 0 14 14"><path d="M1 5 V1 H5"/></svg>
      <svg class="corner bl" viewBox="0 0 14 14"><path d="M1 5 V1 H5"/></svg>
      <svg class="corner br" viewBox="0 0 14 14"><path d="M1 5 V1 H5"/></svg>
      <div>
        <div class="index">№ ${e.i}</div>
        <span class="badge ${e.live ? "live" : ""}">${e.live ? "Open entry" : "Coming soon"}</span>
      </div>
      <div>
        <h3 class="title">${e.t}</h3>
        <div class="desc">${e.d}</div>
      </div>
      <div class="card-cta">
        <span>${e.live ? "View dossier" : "Locked entry"}</span>
        <span>${e.live ? "›" : "—"}</span>
      </div>
    `;
    if (!e.live) card.addEventListener("click", () => openPopup(e.t, "This entry is still being catalogued. Check back soon — the vault is updated quarterly."));
    grid.appendChild(card);
  });
}

function selectDrawer(id) {
  const d = DRAWERS.find((x) => x.id === id);
  if (!d) return;

  activeDrawerId = id;

  document.querySelectorAll(".drawer-card").forEach((c) => {
    c.classList.toggle("active", c.dataset.drawer === id);
  });
  drawerSelect.value = id;

  drawerLabel.innerHTML = `Index 00 &nbsp;//&nbsp; Drawer ${d.letter} · ${d.name}`;

  if (d.live) {
    grid.hidden = false;
    drawerEmpty.hidden = true;
    if (renderedDrawerId !== id) {
      renderEntries(d.entries || []);
      renderedDrawerId = id;
    }
  } else {
    grid.hidden = true;
    drawerEmpty.hidden = false;
    drawerEmptyTitle.textContent = `Drawer ${d.letter} · ${d.name} is being catalogued`;
  }
}

renderDrawerCards();
selectDrawer("physical-product");

/* ---------- coming-soon popup (entries + drawers) ---------- */
const projScrim = $("proj-scrim");
const projTitle = $("proj-title");
const projBody  = $("proj-body");
const DEFAULT_POPUP_BODY = "This entry is still being catalogued. Check back soon — the vault is updated quarterly.";

function openPopup(title, body) {
  projTitle.textContent = title;
  projBody.textContent = body || DEFAULT_POPUP_BODY;
  projScrim.classList.add("show");
}

$("proj-close").addEventListener("click", () => projScrim.classList.remove("show"));
projScrim.addEventListener("click", (e) => {
  if (e.target === projScrim) projScrim.classList.remove("show");
});

/* ---------- direct-to-archive (returning from a dossier) ---------- */
if (location.hash === "#archive" && isStillAuthenticated()) {
  landing.classList.add("fade-out");
  archive.classList.add("show");
  archive.setAttribute("aria-hidden", "false");
  document.body.classList.add("archive-open");
  setTimeout(() => { landing.style.display = "none"; }, 1200);
}
