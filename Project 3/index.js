/* ── Time Zone Configuration ── */
const TIME_ZONES = [
  { city: "New York",    zone: "America/New_York",       label: "EST / EDT" },
  { city: "London",      zone: "Europe/London",          label: "GMT / BST" },
  { city: "Paris",       zone: "Europe/Paris",           label: "CET / CEST" },
  { city: "Dubai",       zone: "Asia/Dubai",             label: "GST" },
  { city: "Mumbai",      zone: "Asia/Kolkata",           label: "IST" },
  { city: "Shanghai",    zone: "Asia/Shanghai",          label: "CST" },
  { city: "Tokyo",       zone: "Asia/Tokyo",             label: "JST" },
  { city: "Sydney",      zone: "Australia/Sydney",       label: "AEST / AEDT" },
  { city: "Los Angeles", zone: "America/Los_Angeles",    label: "PST / PDT" },
  { city: "São Paulo",   zone: "America/Sao_Paulo",      label: "BRT" },
  { city: "Moscow",      zone: "Europe/Moscow",          label: "MSK" },
  { city: "Singapore",   zone: "Asia/Singapore",         label: "SGT" },
];

/* ── DOM References ── */
const container = document.getElementById("clocks-container");
const themeToggle = document.getElementById("theme-toggle");

/* ── Theme Toggle ── */
function initTheme() {
  const saved = localStorage.getItem("world-clock-theme");
  if (saved) {
    document.body.className = saved;
  }
  updateToggleIcon();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  localStorage.setItem("world-clock-theme", document.body.className);
  updateToggleIcon();
}

function updateToggleIcon() {
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", toggleTheme);

/* ── Build Clock Cards ── */
function createTickMarks(face) {
  for (let i = 0; i < 60; i++) {
    const tick = document.createElement("div");
    const isMajor = i % 5 === 0;
    tick.className = isMajor ? "tick major" : "tick";
    tick.style.transform = `rotate(${i * 6}deg)`;
    face.appendChild(tick);
  }
}

function createHourNumbers(face) {
  const faceSize = 170;
  const center = faceSize / 2 - 2;
  const radius = faceSize * 0.34;
  for (let h = 1; h <= 12; h++) {
    const num = document.createElement("div");
    num.className = "hour-number";
    num.textContent = h;
    const angle = (h * 30 - 90) * (Math.PI / 180);
    let x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    /* nudge 6 a bit left */
    if (h === 6) x -= 3;
    num.style.left = `${x}px`;
    num.style.top = `${y}px`;
    face.appendChild(num);
  }
}

function createClockCard({ city, zone, label }) {
  const card = document.createElement("div");
  card.className = "clock-card";

  /* City name */
  const cityEl = document.createElement("div");
  cityEl.className = "zone-city";
  cityEl.textContent = city;
  card.appendChild(cityEl);

  /* Analog face */
  const face = document.createElement("div");
  face.className = "clock-face";

  createTickMarks(face);
  createHourNumbers(face);

  /* Hands */
  const hourHand = document.createElement("div");
  hourHand.className = "hand hand-hour";
  face.appendChild(hourHand);

  const minuteHand = document.createElement("div");
  minuteHand.className = "hand hand-minute";
  face.appendChild(minuteHand);

  const secondHand = document.createElement("div");
  secondHand.className = "hand hand-second";
  face.appendChild(secondHand);

  /* Center dot */
  const dot = document.createElement("div");
  dot.className = "center-dot";
  face.appendChild(dot);

  card.appendChild(face);

  /* Digital time */
  const digitalEl = document.createElement("div");
  digitalEl.className = "digital-time";
  card.appendChild(digitalEl);

  /* Zone label */
  const labelEl = document.createElement("div");
  labelEl.className = "zone-label";
  labelEl.textContent = label;
  card.appendChild(labelEl);

  container.appendChild(card);

  return { zone, hourHand, minuteHand, secondHand, digitalEl };
}

/* ── Initialize All Clocks ── */
const clocks = TIME_ZONES.map(createClockCard);

/* ── Smooth Clock Update Loop (requestAnimationFrame) ── */
function getZoneTime(timeZone) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3,
    hour12: false,
  }).formatToParts(now);

  const get = (type) => parts.find((p) => p.type === type)?.value || "0";

  const h = parseInt(get("hour"), 10);
  const m = parseInt(get("minute"), 10);
  const s = parseInt(get("second"), 10);
  const ms = parseInt(get("fractionalSecond"), 10);

  return { h, m, s, ms };
}

function formatDigital(timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date());
}

function updateClocks() {
  clocks.forEach(({ zone, hourHand, minuteHand, secondHand, digitalEl }) => {
    const { h, m, s, ms } = getZoneTime(zone);

    /* Continuous smooth angles */
    const totalSeconds = s + ms / 1000;
    const totalMinutes = m + totalSeconds / 60;
    const totalHours = (h % 12) + totalMinutes / 60;

    const secondDeg = totalSeconds * 6;       /* 360 / 60 */
    const minuteDeg = totalMinutes * 6;       /* 360 / 60 */
    const hourDeg = totalHours * 30;          /* 360 / 12 */

    secondHand.style.transform = `rotate(${secondDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;

    /* Update digital display once per second-change to save perf */
    const newText = formatDigital(zone);
    if (digitalEl.textContent !== newText) {
      digitalEl.textContent = newText;
    }
  });

  requestAnimationFrame(updateClocks);
}

/* ── Start ── */
initTheme();
requestAnimationFrame(updateClocks);
