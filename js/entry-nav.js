/* Wire the fixed PREV / NEXT buttons on each physical-product entry page.
   Order matches PHYSICAL_ENTRIES in script.js. Wraps around at both ends. */
(function () {
  const PRODUCTS = [
    "save-state-vault",
    "rewind-01",
    "flpy-stack",
    "crt-lamp",
    "dial-01",
    "walk-case",
    "boot-sequence",
    "tape-lock",
    "pixel-frame",
    "cart-case",
    "sync-dock",
    "key-board-84",
    "signal-meter",
    "offline-box",
    "mod-phone",
    "load-screen",
  ];

  const slug = location.pathname
    .split("/")
    .pop()
    .replace(/\.html$/, "");
  const idx = PRODUCTS.indexOf(slug);
  if (idx === -1) return;

  const n = PRODUCTS.length;
  const prev = PRODUCTS[(idx - 1 + n) % n];
  const next = PRODUCTS[(idx + 1) % n];

  const prevEl = document.getElementById("entry-nav-prev");
  const nextEl = document.getElementById("entry-nav-next");
  if (prevEl) prevEl.href = prev + ".html";
  if (nextEl) nextEl.href = next + ".html";
})();
