/* CVMD Candy site logic.
   Edit the MENU DATA block to change prices, flavors or products. Everything else reads from it. */
(() => {
  "use strict";

  // ===================== MENU DATA =====================
  const CONTACT = {
    instagram: "cvmdcandy",
    messenger: "CentralValleyModestDelights",
    openHour: 10,   // 10am
    closeHour: 22,  // 10pm
    timeZone: "America/Los_Angeles",
  };

  const SAUCE_PRICE = 1; // "Sauces $1+"

  const FLAVORS = {
    sugar: {
      label: "Sugar coat",
      note: "The glassy candy shell around your fruit. 25 flavors.",
      list: [
        ["Pineapple", "#FFD23F"], ["Grape", "#7B3FA0"], ["Cherry", "#C8102E"], ["Strawberry", "#FF4D6D"],
        ["Peach", "#FFB38A"], ["Watermelon", "#FF5E7E"], ["Green tea", "#9BC27C"], ["Banana", "#FFE45C"],
        ["Lychee", "#F7C6CF"], ["Blueberry", "#4062BB"], ["Mango", "#FFA62B"], ["Kiwi", "#8DB600"],
        ["Raspberry", "#E30B5C"], ["Apple", "#7ED957"], ["Cantaloupe", "#FFB067"], ["Passion fruit", "#F2A007"],
        ["Coconut", "#F4EDE4"], ["Orange", "#FF8C1A"], ["Lemon", "#FFF04D"], ["Honey", "#F2B33D"],
        ["Vanilla ice cream", "#F7EBD3"], ["Creme", "#FFF6E5"], ["Chocolate", "#6B3E26"], ["Mint", "#8FE3C2"],
        ["Avocado", "#8BA644"],
      ],
    },
    dust: {
      label: "Candy dust",
      note: "Crushed candy rolled on for extra crunch and color. 22 flavors.",
      list: [
        ["Blue Raspberry Jolly Rancher", "#1F6BFF"], ["Cherry Jolly Rancher", "#D7263D"], ["Watermelon Jolly Rancher", "#FF5D8F"],
        ["Strawberry Jolly Rancher", "#FF3B5C"], ["Lemon Jolly Rancher", "#FFE94D"], ["Orange Jolly Rancher", "#FF8A1F"],
        ["Lime Jolly Rancher", "#8BD32B"], ["Mango Jolly Rancher", "#FFB13B"], ["Pineapple Jolly Rancher", "#FFD84A"],
        ["Locochas", "#B5452B"], ["Nerds", "conic-gradient(#FF4D8D 0 25%, #3FA9F5 0 50%, #FFD23F 0 75%, #8BD32B 0)"],
        ["Blue Raspberry Lemonade Starburst", "#3FA9F5"], ["Watermelon Lifesavers", "#FF6F91"],
        ["Skittles", "conic-gradient(#E3122D 0 20%, #FF8A1F 0 40%, #FFE14D 0 60%, #3FB94D 0 80%, #7B3FA0 0)"],
        ["Starburst", "conic-gradient(#FF4D6D 0 25%, #FFD23F 0 50%, #FF8A1F 0 75%, #E3122D 0)"],
        ["Sweet-tarts", "#C59BFF"], ["Zots", "#FF7AC6"], ["Lemonheads", "#FFE135"], ["Warheads", "#B6F500"],
        ["Cotton candy", "linear-gradient(135deg, #FFB3D1 50%, #9FD8FF 50%)"], ["Pralines & cream", "#D9A066"],
        ["Mystery dust", "repeating-linear-gradient(45deg, #1F0A16 0 4px, #FF2E7E 4px 8px)"],
      ],
    },
    sauce: {
      label: "Sauces",
      note: "Add a sauce for $1, or create your own sauce flavor for $1.",
      list: [
        ["Chamoy", "#B3261E"], ["Watermelon chamoy", "#E0475B"], ["Mango chamoy", "#F29E2E"], ["Pickle chamoy", "#8FAE3B"],
        ["Sweet & sour blue raspberry", "#2D6CF6"], ["Sweet & sour strawberry", "#F0435A"],
        ["Sweet & sour watermelon", "#FF6A88"], ["Chili mango", "#E8742A"], ["Tangy pickle", "#A3B83A"],
      ],
    },
  };
  const CUSTOM_SAUCE = ["Create your own sauce", "conic-gradient(#B3261E 0 33%, #F29E2E 0 66%, #2D6CF6 0)"];

  const CATEGORIES = [
    ["all", "All"], ["grapes", "Grapes"], ["strawberries", "Strawberries & berries"], ["pineapple", "Pineapple"],
    ["variety", "Variety packs"], ["kids", "Kids"], ["specials", "Dubai & specials"], ["addons", "Add-ons"],
  ];

  // img = file in /images (without .webp). art = illustrated tile when there's no photo yet.
  const PRODUCTS = [
    {
      id: "grapes", cat: "grapes", tag: "Signature", name: "Candied Grape Trays", img: "blue-razz-tray",
      blurb: "The one that started it all. A crunchy candy shell around a cold, juicy grape.",
      sizes: [
        { id: "small", label: "Small tray", detail: "15 small grapes", price: 15 },
        { id: "large", label: "Large tray", detail: "15 large grapes", price: 20 },
        { id: "larger", label: "Larger tray", detail: "32 large grapes", price: 35 },
      ],
      coating: true, sauce: true,
    },
    {
      id: "strawberries", cat: "strawberries", name: "Candied Strawberry Trays", img: "stock-strawberries",
      blurb: "Whole strawberries in a glassy candy coat, dusted or plain.",
      sizes: [
        { id: "six", label: "Half dozen", detail: "6 strawberries", price: 15 },
        { id: "dozen", label: "Dozen", detail: "12 strawberries", price: 25 },
      ],
      coating: true, sauce: true,
    },
    {
      id: "berries", cat: "strawberries", name: "Candied Berries & Mango", img: "stock-berries-mango",
      blurb: "Blueberries, blackberries, mango and more, candied by the tray.",
      sizes: [
        { id: "small", label: "Small tray", detail: "", price: 15 },
        { id: "large", label: "Large tray", detail: "", price: 30 },
      ],
      coating: true, sauce: true,
    },
    {
      id: "pineapple", cat: "pineapple", name: "Pineapple Ring Trays", img: "pineapple-grapes",
      blurb: "Thick pineapple rings, candied edge to edge.",
      sizes: [
        { id: "four", label: "4 rings", detail: "", price: 15 },
        { id: "eight", label: "8 rings", detail: "", price: 30 },
      ],
      coating: true, sauce: true,
    },
    {
      id: "variety", cat: "variety", name: "Variety Packs", img: "rainbow-variety-tray",
      blurb: "A little of everything in one tray. Tell us if you want to mix flavors.",
      sizes: [
        { id: "v25", label: "Small pack", detail: "2 pineapple rings and 15 small grapes", price: 25 },
        { id: "v35", label: "Medium pack", detail: "4 pineapple rings, 2 strawberries and 15 large grapes", price: 35 },
        { id: "v55", label: "Large pack", detail: "4 pineapple rings, 2 strawberries, 15 large grapes, chamoy pickle and cucumber", price: 55 },
      ],
      coating: true, sauce: true,
    },
    {
      id: "kids", cat: "kids", name: "Kids Cups & Trays", img: "sour-green-apple-grapes",
      blurb: "Small portions for small hands, same big crunch.",
      sizes: [
        { id: "cup", label: "Cup", detail: "3 small grapes", price: 5 },
        { id: "tray", label: "Tray", detail: "6 large grapes", price: 10 },
      ],
      coating: true, sauce: true,
    },
    {
      id: "dubai", cat: "specials", tag: "Dubai", name: "Dubai Tres Leches Strawberries", img: "dubai-strawberries",
      blurb: "Fresh strawberries under milk chocolate, pistachio cream and crispy kunafa.",
      sizes: [
        { id: "small", label: "Small tray", detail: "", price: 15 },
        { id: "large", label: "Large tray", detail: "", price: 25 },
      ],
    },
    {
      id: "caramel-apple", cat: "specials", name: "Caramel Green Apple Grapes", img: "caramel-apple-grapes",
      blurb: "Green apple candied grapes with a cup of salted caramel sauce for dipping.",
      price: null,
    },
    {
      id: "cucumber-tajin", cat: "specials", tag: "Custom favorite", name: "Cucumber Tajín Grapes", img: "cucumber-tajin-grapes",
      blurb: "Large grapes in cucumber and Tajín. It started as a custom request, so ask if premades are in.",
      price: null,
    },
    {
      id: "nerds-tray", cat: "specials", name: "Nerds Cluster Candy Tray", img: "nerds-donut-tray",
      blurb: "Dusted gummy rings, Nerds Gummy Clusters and cotton candy in blue and pink.",
      price: null,
    },
    {
      id: "frozen", cat: "specials", name: "Frozen Cups", img: "frozen-cups",
      blurb: "Bahama Mama piña colada topped with chili mango grapes, or Welch's grape topped with Skittles grapes.",
      price: null,
      choice: { label: "Flavor", options: ["Bahama Mama piña colada", "Welch's grape"] },
    },
    {
      id: "rollup", cat: "addons", name: "Fruit Roll-Up Wrap", img: "stock-rollups",
      blurb: "Any treat wrapped in a fruit roll-up.",
      price: 5, from: true,
    },
    {
      id: "sauce-cup", cat: "addons", name: "Extra Sauce Cup", img: "stock-sauce",
      blurb: "Chamoy, chili mango, sweet and sour or tangy pickle on the side.",
      price: 1, from: true, sauceChoice: true,
    },
  ];

  // Fan favorites open the grape tray with a flavor already picked.
  const FAVORITES = [
    { name: "Blue Razz", sub: "Blue Raspberry Jolly Rancher dust", img: "blue-razz-tray", type: "dust", flavor: "Blue Raspberry Jolly Rancher" },
    { name: "Warheads", sub: "Sour Warheads dust", img: "warheads-tray", type: "dust", flavor: "Warheads" },
    { name: "Sour Green Apple", sub: "Apple sugar coat", img: "sour-green-apple-grapes", type: "sugar", flavor: "Apple" },
    { name: "Pineapple", sub: "Pineapple sugar coat", img: "pineapple-grapes", type: "sugar", flavor: "Pineapple" },
    { name: "Cotton Candy", sub: "Cotton candy dust", img: "cotton-candy-tray", type: "dust", flavor: "Cotton candy" },
  ];

  const GALLERY = [
    ["blue-razz-tray", "Blue razz tray with Razzles"],
    ["rainbow-variety-tray", "Rainbow variety tray"],
    ["warheads-tray", "Warheads grapes with sour belts"],
    ["dubai-strawberries", "Dubai tres leches strawberries"],
    ["sour-green-apple-grapes", "Sour green apple grapes"],
    ["cucumber-tajin-grapes", "Large cucumber Tajín grapes"],
    ["nerds-donut-tray", "Nerds cluster candy tray"],
    ["pineapple-grapes", "Pineapple grapes and rings"],
    ["caramel-apple-grapes", "Caramel green apple grapes"],
    ["cotton-candy-tray", "Cotton candy and gummy bears"],
    ["frozen-cups", "Frozen cups with candied grapes"],
  ];

  const IMG_SIZES = {
    "blue-razz-tray": [960, 1200], "rainbow-variety-tray": [960, 1200], "caramel-apple-grapes": [960, 1200],
    "cucumber-tajin-grapes": [912, 1140], "cotton-candy-tray": [828, 1035], "sour-green-apple-grapes": [801, 962],
    "warheads-tray": [801, 962], "pineapple-grapes": [801, 955], "frozen-cups": [801, 650],
    "stock-strawberries": [880, 640], "stock-berries-mango": [800, 562], "stock-rollups": [820, 640], "stock-sauce": [820, 462],
    "dubai-strawberries": [711, 525], "nerds-donut-tray": [960, 960],
  };

  const ART = {
    strawberry: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 30c-20-8-38 6-34 26 4 20 22 34 34 38 12-4 30-18 34-38 4-20-14-34-34-26Z" fill="#FF2E7E"/><path d="M50 30c-6-10-16-12-24-8 8 2 14 6 18 12M50 30c6-10 16-12 24-8-8 2-14 6-18 12M50 31c0-10 2-18 6-22" fill="#9FD400" stroke="#1F0A16" stroke-width="2.5" stroke-linejoin="round"/><g fill="#FFF4F8"><ellipse cx="36" cy="50" rx="2" ry="3"/><ellipse cx="50" cy="46" rx="2" ry="3"/><ellipse cx="64" cy="50" rx="2" ry="3"/><ellipse cx="42" cy="64" rx="2" ry="3"/><ellipse cx="58" cy="64" rx="2" ry="3"/><ellipse cx="50" cy="78" rx="2" ry="3"/></g><path d="M28 44c4-6 10-9 16-9" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".6"/></svg>`,
    berries: `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="34" cy="42" r="16" fill="#2C5BF6"/><circle cx="62" cy="36" r="14" fill="#4062BB"/><circle cx="52" cy="64" r="17" fill="#2C5BF6"/><path d="M70 62c10-4 20 2 18 14-2 10-14 14-22 8" fill="#FFA62B"/><g fill="#1F0A16"><circle cx="34" cy="42" r="2.5"/><circle cx="62" cy="36" r="2.5"/><circle cx="52" cy="64" r="2.5"/></g><path d="M26 36c2-4 6-6 10-6" stroke="#fff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".6"/></svg>`,
    rollup: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M18 30h50a14 14 0 0 1 0 28H30a10 10 0 0 0 0 20h52" fill="none" stroke="#FF2E7E" stroke-width="14" stroke-linecap="round"/><path d="M18 30h50a14 14 0 0 1 0 28H30a10 10 0 0 0 0 20h52" fill="none" stroke="#FFF4F8" stroke-width="2" stroke-dasharray="2 8" stroke-linecap="round" opacity=".8"/></svg>`,
    sauce: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M26 38h48l-6 44H32l-6-44Z" fill="#FFF4F8" stroke="#1F0A16" stroke-width="3" stroke-linejoin="round"/><path d="M29 50h42l-4 30H33l-4-30Z" fill="#B3261E"/><rect x="22" y="30" width="56" height="10" rx="5" fill="#1F0A16"/><path d="M38 56c3 6 3 12 0 18" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".5"/></svg>`,
  };

  // ===================== HELPERS =====================
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => "$" + (Number.isInteger(n) ? n : n.toFixed(2));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };

  // Every photo ships in three sizes (-xs 200px, -sm 480px, full) so each device downloads only what it shows
  const SIZES = {
    card: "(max-width: 619px) 104px, 280px",
    plate: "(max-width: 959px) 38vw, 400px",
    gallery: "(max-width: 899px) 38vw, 340px",
    sheet: "(max-width: 759px) 100vw, 640px",
    chip: "44px",
    thumb: "64px",
  };
  const srcsetOf = (name) => {
    const [w] = IMG_SIZES[name] || [960, 960];
    return `images/${name}-xs.webp 200w, images/${name}-sm.webp 480w, images/${name}.webp ${w}w`;
  };
  const imgTag = (name, alt = "", cls = "", eager = false, sizes = SIZES.card, extra = "") => {
    const [w, h] = IMG_SIZES[name] || [800, 800];
    return `<img src="images/${name}-sm.webp" srcset="${srcsetOf(name)}" sizes="${sizes}" alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? "" : 'loading="lazy"'} decoding="async" class="${cls}" ${extra}>`;
  };
  const media = (p, alt) => (p.img ? imgTag(p.img, alt, "", false, SIZES.card) : `<div class="art art-${p.art}">${ART[p.art]}</div>`);
  const flavorColor = (type, name) => {
    if (name === CUSTOM_SAUCE[0]) return CUSTOM_SAUCE[1];
    const hit = FLAVORS[type].list.find(([n]) => n === name);
    return hit ? hit[1] : "#ccc";
  };
  const swatch = (bg) => `<i style="background:${bg}"></i>`;

  // ===================== TOAST =====================
  const toastEl = $("[data-toast]");
  let toastTimer;
  function toast(msg, ms = 3200) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), ms);
  }

  // ===================== NAV =====================
  const nav = $("#nav");

  const toggle = $(".menu-toggle");
  const mobileNav = $("#mobile-nav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileNav.classList.toggle("open", open);
  });
  $$("a", mobileNav).forEach((a) => a.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("open");
  }));

  // ===================== OPEN NOW =====================
  function updateOpen() {
    let hour, minute;
    try {
      const parts = new Intl.DateTimeFormat("en-US", { timeZone: CONTACT.timeZone, hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
      hour = +parts.find((p) => p.type === "hour").value;
      minute = +parts.find((p) => p.type === "minute").value;
    } catch { return; }
    const t = hour + minute / 60;
    const open = t >= CONTACT.openHour && t < CONTACT.closeHour;
    const text = open ? "Open now until 10pm" : "Closed now, opens at 10am";
    $$("[data-open-dot]").forEach((d) => d.classList.toggle("is-open", open));
    $$("[data-open-text], [data-open-text-2]").forEach((el) => (el.textContent = text));
  }
  updateOpen();
  setInterval(updateOpen, 60000);
  const yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===================== HERO CAROUSEL =====================
  const hero = $(".hero");
  const heroArt = $(".hero-art");
  const heroTitle = $(".hero-title");
  const root = document.documentElement;
  const SLIDES = [
    { img: "blue-razz-tray", name: "Blue Razz", sub: "Blue Raspberry Jolly Rancher dust", bg: "#4E6A92", ink: "#FFFFFF", open: ["grapes", { type: "dust", flavor: "Blue Raspberry Jolly Rancher" }] },
    { img: "sour-green-apple-grapes", name: "Sour Green Apple", sub: "Apple sugar coat", bg: "#8DA56A", ink: "#1F2A12", open: ["grapes", { type: "sugar", flavor: "Apple" }] },
    { img: "dubai-strawberries", name: "Dubai Strawberries", sub: "Milk chocolate, pistachio and kunafa", bg: "#6B4A39", ink: "#F7EDE2", open: ["dubai"] },
    { img: "pineapple-grapes", name: "Pineapple", sub: "Pineapple sugar coat", bg: "#D6A84A", ink: "#2E2208", open: ["grapes", { type: "sugar", flavor: "Pineapple" }] },
    { img: "warheads-tray", name: "Warheads", sub: "Sour Warheads dust", bg: "#6F5C8C", ink: "#FFFFFF", open: ["grapes", { type: "dust", flavor: "Warheads" }] },
    { img: "nerds-donut-tray", name: "Nerds Cluster Tray", sub: "Gummy rings, Nerds and cotton candy", bg: "#C98593", ink: "#2B1218", open: ["nerds-tray"] },
    { img: "rainbow-variety-tray", name: "Variety Pack", sub: "A little of everything", bg: "#CF8A5B", ink: "#2B1608", open: ["variety"] },
    { img: "caramel-apple-grapes", name: "Caramel Apple Grapes", sub: "With salted caramel sauce", bg: "#9C6A3A", ink: "#FFF8EE", open: ["caramel-apple"] },
    { img: "cucumber-tajin-grapes", name: "Cucumber Tajín", sub: "Ask if premades are in", bg: "#A9553C", ink: "#FFFFFF", open: ["cucumber-tajin"] },
    { img: "cotton-candy-tray", name: "Cotton Candy", sub: "Cotton candy dust", bg: "#A9BFD6", ink: "#1B2A3D", open: ["grapes", { type: "dust", flavor: "Cotton candy" }] },
  ];
  const stage = $("[data-stage]");
  const stageLabel = $(".stage-label");
  stage.innerHTML = SLIDES.map((sl, i) => `<button class="plate" type="button" data-plate="${i}" tabindex="-1" aria-hidden="true" aria-label="${esc(sl.name)}">
      <span class="plate-inner" style="--bob:${(-i * 0.7).toFixed(1)}s">${i < 3
        ? imgTag(sl.img, "", "", true, SIZES.plate, i === 0 ? 'fetchpriority="high"' : "")
        : `<img data-srcset="${srcsetOf(sl.img)}" sizes="${SIZES.plate}" alt="" width="${(IMG_SIZES[sl.img] || [960])[0]}" height="${(IMG_SIZES[sl.img] || [0, 960])[1]}" decoding="async">`}</span></button>`).join("");
  const plates = $$(".plate", stage);
  const hydrate = (i) => {
    const im = plates[(i + SLIDES.length) % SLIDES.length].querySelector("img[data-srcset]");
    if (!im) return;
    im.srcset = im.dataset.srcset;
    im.src = im.dataset.srcset.split(" ")[2] || "";
    im.removeAttribute("data-srcset");
  };
  const warmNext = () => { hydrate(3); hydrate(4); hydrate(-1); };
  if (document.readyState === "complete") setTimeout(warmNext, 600);
  else window.addEventListener("load", () => ("requestIdleCallback" in window ? requestIdleCallback(warmNext, { timeout: 2500 }) : setTimeout(warmNext, 800)), { once: true });
  let cur = 0, heroVisible = true, paused = false, autoTimer = null;
  const SLOTS = { 0: [0, 0, 0, 1, 1], 1: [250, -70, 8, 0.44, 1], 2: [385, -150, 14, 0.26, 1], 3: [470, -190, 18, 0.16, 0], "-1": [-170, 560, -30, 0.72, 0] };
  function layout(intro) {
    const u = Math.min(1, stage.clientWidth / 520);
    const n = SLIDES.length;
    plates.forEach((p, i) => {
      let slot = (i - cur + n) % n;
      if (slot === n - 1) slot = -1;
      let [x, y, r, sc, o] = SLOTS[slot] || [560, -230, 20, 0.1, 0];
      if (intro) { x = 640; y = -260; r = 40; sc = 0.2; }
      p.dataset.slot = slot;
      p.style.setProperty("--x", `${(x * u).toFixed(1)}px`);
      p.style.setProperty("--y", `${(slot === -1 ? y : y * u).toFixed(1)}px`);
      p.style.setProperty("--r", `${r}deg`);
      p.style.setProperty("--s", sc);
      p.style.setProperty("--o", o);
      p.style.zIndex = slot === -1 ? 6 : slot === 0 ? 5 : Math.max(0, 4 - slot);
    });
  }
  function paint() {
    const sl = SLIDES[cur];
    for (const el of [hero, nav]) {
      el.style.setProperty("--hero-bg", sl.bg);
      el.style.setProperty("--hero-ink", sl.ink);
    }
    $("[data-stage-name]").textContent = sl.name;
    $("[data-stage-sub]").textContent = sl.sub;
    stageLabel.classList.remove("swap"); void stageLabel.offsetWidth; stageLabel.classList.add("swap");
    const meta = $('meta[name="theme-color"]');
    if (meta && window.scrollY < hero.offsetHeight) meta.setAttribute("content", sl.bg);
  }
  function go(dir) {
    cur = (cur + dir + SLIDES.length) % SLIDES.length;
    for (let k = -1; k <= 3; k++) hydrate(cur + k);
    layout(false);
    paint();
  }
  function restart() {
    clearInterval(autoTimer);
    if (reduceMotion) return;
    autoTimer = setInterval(() => { if (!paused && heroVisible && !document.hidden && !openDialog) go(1); }, 3800);
  }
  layout(true);
  paint();
  $("[data-next]").addEventListener("click", () => { go(1); restart(); });
  $("[data-prev]").addEventListener("click", () => { go(-1); restart(); });
  $("[data-stage-order]").addEventListener("click", (e) => { const [id, preset] = SLIDES[cur].open; openSheet(id, { ...(preset || {}), img: SLIDES[cur].img }, e.currentTarget); });
  stage.addEventListener("click", (e) => {
    const p = e.target.closest("[data-plate]");
    if (!p) return;
    const slot = +p.dataset.slot;
    if (slot === 0) $("[data-stage-order]").click();
    else if (slot > 0 && slot < 3) { go(slot); restart(); }
  });
  let swipeX = null;
  stage.addEventListener("pointerdown", (e) => { swipeX = e.clientX; });
  stage.addEventListener("pointerup", (e) => {
    if (swipeX == null) return;
    const dx = e.clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) > 40) { go(dx < 0 ? 1 : -1); restart(); }
  });
  heroArt.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") paused = true; });
  heroArt.addEventListener("pointerleave", () => { paused = false; });
  heroArt.addEventListener("focusin", () => { paused = true; });
  heroArt.addEventListener("focusout", () => { paused = false; });
  let layoutTimer;
  window.addEventListener("resize", () => { clearTimeout(layoutTimer); layoutTimer = setTimeout(() => layout(false), 120); });
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; hero.classList.toggle("paused", !heroVisible); }).observe(hero);
  setTimeout(() => { layout(false); restart(); }, reduceMotion ? 0 : 650);

  // ===================== TICKER =====================
  const tickerItems = [
    ...FLAVORS.dust.list.slice(0, 6), FLAVORS.sauce.list[0], FLAVORS.sugar.list[8], FLAVORS.dust.list[18],
    FLAVORS.sauce.list[7], FLAVORS.sugar.list[0], FLAVORS.dust.list[19], FLAVORS.sugar.list[20], FLAVORS.dust.list[10],
  ];
  const tickerTrack = $("[data-ticker]");
  const tickerHTML = tickerItems.map(([n, c]) => `<span>${swatch(c)}${esc(n)}</span>`).join("");
  tickerTrack.innerHTML = tickerHTML + tickerHTML;

  // ===================== MENU =====================
  const grid = $("[data-products]");
  const filtersEl = $("[data-filters]");
  let activeCat = "all";

  filtersEl.innerHTML = CATEGORIES.map(([id, label]) =>
    `<button class="filter" role="tab" type="button" data-cat="${id}" aria-selected="${id === activeCat}">${esc(label)}</button>`).join("");
  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b || b.dataset.cat === activeCat) return;
    activeCat = b.dataset.cat;
    $$("[data-cat]", filtersEl).forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    renderProducts();
  });

  const plusIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`;

  function priceLine(p) {
    if (p.sizes) return `<span class="price-from"><small>from</small>${money(Math.min(...p.sizes.map((s) => s.price)))}</span>`;
    if (p.price == null) return `<span class="price-from"><small>Price in chat</small></span>`;
    return `<span class="price-from">${p.from ? "<small>from</small>" : ""}${money(p.price)}</span>`;
  }
  const sizesList = (p) => p.sizes ? `<ul class="card-sizes">${p.sizes.map((s) => `<li><span>${esc(s.label)}${s.detail ? ` <em>${esc(s.detail)}</em>` : ""}</span><b>${money(s.price)}</b></li>`).join("")}</ul>` : "";

  // Cards pop in softly (same feel as the gallery) as they scroll into view
  const cardIO = "IntersectionObserver" in window && !reduceMotion
    ? new IntersectionObserver((entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const delay = (+el.dataset.k % 3) * 80;
        setTimeout(() => el.classList.remove("pre"), delay);
        cardIO.unobserve(el);
      }), { threshold: 0.15 })
    : null;

  function renderProducts() {
    const list = PRODUCTS.filter((p) => activeCat === "all" || p.cat === activeCat);
    grid.innerHTML = list.map((p, i) => `
      <article class="card${cardIO ? " pre" : ""}" data-k="${i}">
        ${p.tag ? `<span class="card-tag">${esc(p.tag)}</span>` : ""}
        <button class="card-media" type="button" data-open="${p.id}" aria-label="Customize ${esc(p.name)}">${media(p, p.name)}</button>
        <div class="card-body">
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.blurb)}</p>
          ${sizesList(p)}
        </div>
        ${sizesList(p)}
        <div class="card-foot">
          ${priceLine(p)}
          <button class="add-btn" type="button" data-open="${p.id}">${plusIcon}${p.price === null ? "Ask about it" : "Add"}</button>
        </div>
      </article>`).join("");
    if (cardIO) $$(".card", grid).forEach((c) => cardIO.observe(c));
  }
  renderProducts();
  grid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (b) openSheet(b.dataset.open, null, b);
  });

  $("[data-favorites]").innerHTML = FAVORITES.map((f, i) => `
    <button class="fav" type="button" data-fav="${i}">
      ${imgTag(f.img, "", "", false, SIZES.chip)}
      <span>${esc(f.name)}<small>${esc(f.sub)}</small></span>
    </button>`).join("");
  $("[data-favorites]").addEventListener("click", (e) => {
    const b = e.target.closest("[data-fav]");
    if (!b) return;
    const f = FAVORITES[+b.dataset.fav];
    openSheet("grapes", { type: f.type, flavor: f.flavor, img: f.img }, b);
  });

  // ===================== FLAVOR LIBRARY =====================
  const tabsEl = $("[data-flavor-tabs]");
  const chipsEl = $("[data-flavor-chips]");
  const noteEl = $("[data-flavor-note]");
  const order = ["sugar", "dust", "sauce"];
  tabsEl.innerHTML = order.map((k, i) => {
    const count = FLAVORS[k].list.length + (k === "sauce" ? 1 : 0);
    return `<button class="flavor-tab" role="tab" type="button" data-ftab="${k}" aria-selected="${i === 0}">${FLAVORS[k].label}<span>${count}</span></button>`;
  }).join("");
  function renderFlavors(k) {
    noteEl.textContent = FLAVORS[k].note;
    const list = k === "sauce" ? [...FLAVORS[k].list, CUSTOM_SAUCE] : FLAVORS[k].list;
    chipsEl.innerHTML = list.map(([n, c], i) => `<li style="--i:${i}">${swatch(c)}${esc(n)}</li>`).join("");
  }
  renderFlavors("sugar");
  tabsEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ftab]");
    if (!b) return;
    $$("[data-ftab]", tabsEl).forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    renderFlavors(b.dataset.ftab);
  });

  // ===================== GALLERY =====================
  const rail = $("[data-gallery]");
  rail.innerHTML = GALLERY.map(([img, cap], i) => `<figure class="shot${i === 0 ? " active" : ""}" data-shot="${i}"><div class="shot-frame">${imgTag(img, cap, "", false, SIZES.gallery)}</div><figcaption>${esc(cap)}</figcaption></figure>`).join("");
  const shots = $$(".shot", rail);
  let activeShot = 0, railTick = false;
  const centerOf = (el) => el.offsetLeft + el.offsetWidth / 2;
  function pickActive() {
    railTick = false;
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0, bestD = Infinity;
    shots.forEach((sh, i) => { const d = Math.abs(centerOf(sh) - mid); if (d < bestD) { bestD = d; best = i; } });
    if (best !== activeShot) {
      shots[activeShot].classList.remove("active");
      shots[best].classList.add("active");
      activeShot = best;
    }
  }
  rail.addEventListener("scroll", () => { if (!railTick) { railTick = true; requestAnimationFrame(pickActive); } }, { passive: true });
  const goShot = (i) => {
    i = Math.max(0, Math.min(shots.length - 1, i));
    rail.scrollTo({ left: centerOf(shots[i]) - rail.clientWidth / 2, behavior: reduceMotion ? "auto" : "smooth" });
  };
  $("[data-gprev]").addEventListener("click", () => goShot(activeShot - 1));
  $("[data-gnext]").addEventListener("click", () => goShot(activeShot + 1));
  rail.addEventListener("click", (e) => {
    const sh = e.target.closest("[data-shot]");
    if (sh && !(drag && drag.moved) && +sh.dataset.shot !== activeShot) goShot(+sh.dataset.shot);
  });
  // Drag to scroll on desktop
  let drag = null;
  rail.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    drag = { x: e.clientX, left: rail.scrollLeft, moved: false };
    rail.classList.add("dragging");
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 3) drag.moved = true;
    rail.scrollLeft = drag.left - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!drag) return;
    const moved = drag.moved;
    rail.classList.remove("dragging");
    if (moved) setTimeout(() => { drag = null; goShot(activeShot); }, 0);
    else drag = null;
  });

  // ===================== DIALOG PLUMBING =====================
  const scrim = $("[data-scrim]");
  const sheet = $("[data-sheet]");
  const drawer = $("[data-drawer]");
  let openDialog = null;
  let returnFocus = null;

  function show(el) {
    returnFocus = document.activeElement;
    if (openDialog && openDialog !== el) hide(openDialog, true);
    openDialog = el;
    el.hidden = false;
    scrim.hidden = false;
    document.body.classList.add("locked");
    requestAnimationFrame(() => {
      el.classList.add("show");
      scrim.classList.add("show");
      const f = el.querySelector("[data-autofocus]") || el.querySelector("button, [href], input, select, textarea");
      f && f.focus({ preventScroll: true });
    });
  }
  function hide(el, keepScrim = false) {
    if (!el || el.hidden) return;
    el.classList.remove("show");
    if (!keepScrim) scrim.classList.remove("show");
    const done = () => {
      el.hidden = true;
      if (!keepScrim && !openDialog) scrim.hidden = true;
    };
    setTimeout(done, reduceMotion ? 0 : 420);
    if (openDialog === el) openDialog = null;
    if (!keepScrim) {
      document.body.classList.remove("locked");
      returnFocus && returnFocus.focus && returnFocus.focus({ preventScroll: true });
    }
  }
  scrim.addEventListener("click", () => hide(openDialog));
  document.addEventListener("keydown", (e) => {
    if (!openDialog) return;
    if (e.key === "Escape") hide(openDialog);
    if (e.key === "Tab") {
      const f = $$("button:not([disabled]), [href], input:not([type=hidden]), textarea, summary", openDialog).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  $$("[data-close]").forEach((b) => b.addEventListener("click", () => hide(b.closest("[data-sheet], [data-drawer]"))));

  // ===================== CUSTOMIZER =====================
  const body = $("[data-sheet-body]");
  const qtyOut = $("[data-qty-out]");
  const addBtn = $("[data-add]");
  let draft = null;

  function openSheet(id, preset, originEl) {
    const p = byId[id];
    if (!p) return;
    draft = {
      id, qty: 1,
      size: p.sizes ? (p.sizes[1] || p.sizes[0]).id : null,
      coatType: preset && preset.type ? preset.type : "dust",
      flavor: preset && preset.flavor ? preset.flavor : null,
      sauce: "No sauce",
      choice: p.choice ? p.choice.options[0] : null,
      sauceChoice: p.sauceChoice ? FLAVORS.sauce.list[0][0] : null,
      notes: "",
      img: preset && preset.img ? preset.img : p.img,
      origin: originEl,
    };
    if (p.sizes && p.sizes.length === 2) draft.size = p.sizes[0].id;
    renderSheet();
    show(sheet);
  }

  function draftUnitPrice() {
    const p = byId[draft.id];
    let base = p.sizes ? p.sizes.find((s) => s.id === draft.size).price : p.price;
    if (base == null) return null;
    if (p.sauce && draft.sauce !== "No sauce") base += SAUCE_PRICE;
    return base;
  }

  function renderSheet() {
    const p = byId[draft.id];
    const heroImg = draft.img ? imgTag(draft.img, p.name, "", true, SIZES.sheet) : `<div class="art art-${p.art}">${ART[p.art]}</div>`;
    let html = `<div class="sheet-hero">${heroImg}</div><div class="sheet-inner">
      <h2 id="sheet-title">${esc(p.name)}</h2><p class="sheet-blurb">${esc(p.blurb)}</p>`;

    if (p.sizes) {
      html += `<fieldset class="opt"><legend>Size</legend><div class="pills">${p.sizes.map((s) => `
        <label class="pill size-pill"><input type="radio" name="size" value="${s.id}" ${s.id === draft.size ? "checked" : ""}>
        <span><b>${esc(s.label)}, ${money(s.price)}</b>${s.detail ? `<em>${esc(s.detail)}</em>` : ""}</span></label>`).join("")}</div></fieldset>`;
    }

    if (p.coating) {
      const t = draft.coatType;
      const list = FLAVORS[t].list;
      html += `<fieldset class="opt" data-coat-opt><legend>Coating <small>${t === "dust" ? "22 dust flavors" : "25 sugar coats"}</small></legend>
        <div class="seg-mini" role="group" aria-label="Coating type">
          <button type="button" data-coat="dust" aria-pressed="${t === "dust"}">Candy dust</button>
          <button type="button" data-coat="sugar" aria-pressed="${t === "sugar"}">Sugar coat</button>
        </div>
        <div class="pills flavor-pick">${list.map(([n, c]) => `
          <label class="pill"><input type="radio" name="flavor" value="${esc(n)}" ${n === draft.flavor ? "checked" : ""}>
          <span>${swatch(c)}${esc(n)}</span></label>`).join("")}</div></fieldset>`;
    }

    if (p.sauce) {
      const sauces = [["No sauce", "transparent"], ...FLAVORS.sauce.list, CUSTOM_SAUCE];
      html += `<fieldset class="opt"><legend>Sauce <small>+${money(SAUCE_PRICE)}</small></legend><div class="pills">${sauces.map(([n, c]) => `
        <label class="pill"><input type="radio" name="sauce" value="${esc(n)}" ${n === draft.sauce ? "checked" : ""}>
        <span>${n === "No sauce" ? "" : swatch(c)}${esc(n)}</span></label>`).join("")}</div></fieldset>`;
    }

    if (p.choice) {
      html += `<fieldset class="opt"><legend>${esc(p.choice.label)}</legend><div class="pills">${p.choice.options.map((o) => `
        <label class="pill"><input type="radio" name="choice" value="${esc(o)}" ${o === draft.choice ? "checked" : ""}><span>${esc(o)}</span></label>`).join("")}</div></fieldset>`;
    }

    if (p.sauceChoice) {
      const sauces = [...FLAVORS.sauce.list, CUSTOM_SAUCE];
      html += `<fieldset class="opt"><legend>Which sauce?</legend><div class="pills">${sauces.map(([n, c]) => `
        <label class="pill"><input type="radio" name="sauceChoice" value="${esc(n)}" ${n === draft.sauceChoice ? "checked" : ""}><span>${swatch(c)}${esc(n)}</span></label>`).join("")}</div></fieldset>`;
    }

    html += `<div class="opt"><label class="opt-label" for="draft-notes">Notes <small>Optional</small></label>
      <textarea id="draft-notes" class="notes" rows="2" placeholder="${p.id === "variety" ? "Mix flavors? Tell us which ones" : "Allergies, a mix, a custom idea"}">${esc(draft.notes)}</textarea></div></div>`;

    body.innerHTML = html;
    body.scrollTop = 0;
    syncFoot();
  }

  function syncFoot() {
    qtyOut.textContent = draft.qty;
    const unit = draftUnitPrice();
    const p = byId[draft.id];
    addBtn.textContent = unit == null ? "Add to order, price in chat" : `Add to order, ${money(unit * draft.qty)}${p.from ? "+" : ""}`;
  }

  body.addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "size") draft.size = t.value;
    if (t.name === "flavor") { draft.flavor = t.value; $("[data-coat-opt]", body)?.classList.remove("invalid"); }
    if (t.name === "sauce") draft.sauce = t.value;
    if (t.name === "choice") draft.choice = t.value;
    if (t.name === "sauceChoice") draft.sauceChoice = t.value;
    syncFoot();
  });
  body.addEventListener("input", (e) => { if (e.target.id === "draft-notes") draft.notes = e.target.value; });
  body.addEventListener("click", (e) => {
    const b = e.target.closest("[data-coat]");
    if (!b || b.dataset.coat === draft.coatType) return;
    draft.coatType = b.dataset.coat;
    draft.flavor = null;
    const scroll = body.scrollTop;
    renderSheet();
    body.scrollTop = scroll;
    $(`[data-coat="${draft.coatType}"]`, body)?.focus();
  });
  $$("[data-qty]").forEach((b) => b.addEventListener("click", () => {
    draft.qty = Math.max(1, Math.min(20, draft.qty + +b.dataset.qty));
    syncFoot();
    qtyOut.classList.remove("tick"); void qtyOut.offsetWidth; qtyOut.classList.add("tick");
  }));

  addBtn.addEventListener("click", () => {
    const p = byId[draft.id];
    if (p.coating && !draft.flavor) {
      const opt = $("[data-coat-opt]", body);
      opt.classList.remove("invalid");
      void opt.offsetWidth;
      opt.classList.add("invalid");
      body.scrollTo({ top: Math.max(0, opt.offsetTop - 16), behavior: reduceMotion ? "auto" : "smooth" });
      toast("Pick a flavor for your coating first.");
      return;
    }
    const size = p.sizes ? p.sizes.find((s) => s.id === draft.size) : null;
    const line = {
      id: p.id,
      name: p.name,
      img: draft.img || null,
      art: p.img ? null : p.art,
      size: size ? { label: size.label, detail: size.detail } : null,
      coat: p.coating ? { type: FLAVORS[draft.coatType].label, flavor: draft.flavor } : null,
      sauce: p.sauce && draft.sauce !== "No sauce" ? draft.sauce : null,
      choice: draft.choice ? `${p.choice.label}: ${draft.choice}` : null,
      sauceChoice: draft.sauceChoice,
      notes: draft.notes.trim(),
      unit: draftUnitPrice(),
      from: !!p.from,
      qty: draft.qty,
    };
    line.key = JSON.stringify([line.id, line.img, line.size, line.coat, line.sauce, line.choice, line.sauceChoice, line.notes]);
    const existing = cart.find((c) => c.key === line.key);
    if (existing) existing.qty = Math.min(50, existing.qty + line.qty);
    else cart.push(line);
    saveCart();
    flyToCart(line);
    hide(sheet);
    toast(`Added ${line.qty} × ${p.name}`);
  });

  function flyToCart(line) {
    const navShift = nav.classList.contains("tucked") ? nav.offsetHeight : 0;
    nav.classList.remove("tucked");
    const bump = () => {
      [$(".cart-btn"), $("[data-order-bar]")].forEach((c) => { c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); });
    };
    if (reduceMotion) { bump(); return; }
    const from = $(".sheet-hero", sheet)?.getBoundingClientRect();
    const tr = $(".cart-btn").getBoundingClientRect();
    const to = { left: tr.left, top: tr.top + navShift, width: tr.width, height: tr.height };
    if (!line.img) { bump(); return; }
    if (!from) { bump(); return; }
    const dot = document.createElement("div");
    dot.className = "fly";
    dot.innerHTML = `<img src="images/${line.img}-xs.webp" alt="">`;
    const sx = from.left + from.width / 2 - 32, sy = from.top + from.height / 2 - 32;
    const ex = to.left + to.width / 2 - 32, ey = to.top + to.height / 2 - 32;
    dot.style.left = sx + "px";
    dot.style.top = sy + "px";
    document.body.appendChild(dot);
    const anim = dot.animate([
      { transform: "translate(0,0) scale(1.4)", opacity: 1 },
      { transform: `translate(${(ex - sx) * 0.5}px, ${(ey - sy) * 0.5 - 120}px) scale(1)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${ex - sx}px, ${ey - sy}px) scale(.3)`, opacity: 0.4 },
    ], { duration: 780, easing: "cubic-bezier(.5,0,.4,1)" });
    anim.onfinish = () => { dot.remove(); bump(); };
  }

  // ===================== CART =====================
  let cart = store.get("cvmd-cart-v1", []);
  if (!Array.isArray(cart)) cart = [];
  const form = $("[data-order-form]");
  const F = (k) => form.elements.namedItem(k);
  const savedForm = store.get("cvmd-form-v1", {});

  function saveCart() {
    store.set("cvmd-cart-v1", cart);
    renderCart();
  }

  function lineTotal(l) { return l.unit == null ? null : l.unit * l.qty; }

  function totals() {
    let sum = 0, unknown = 0, from = false;
    cart.forEach((l) => {
      const t = lineTotal(l);
      if (t == null) unknown++; else sum += t;
      if (l.from) from = true;
    });
    return { sum, unknown, from, count: cart.reduce((n, l) => n + l.qty, 0) };
  }

  function lineDetails(l) {
    const d = [];
    if (l.size) d.push(l.size.detail ? `${l.size.label}: ${l.size.detail}` : l.size.label);
    if (l.coat) d.push(`${l.coat.type}: ${l.coat.flavor}`);
    if (l.sauce) d.push(`Sauce: ${l.sauce} (+${money(SAUCE_PRICE)})`);
    if (l.choice) d.push(l.choice);
    if (l.sauceChoice) d.push(`Sauce: ${l.sauceChoice}`);
    if (l.notes) d.push(`Note: ${l.notes}`);
    return d;
  }

  function renderCart() {
    const t = totals();
    $$("[data-cart-count]").forEach((el) => (el.textContent = t.count));
    $(".cart-btn").setAttribute("aria-label", `Open your order, ${t.count} item${t.count === 1 ? "" : "s"}`);

    const bar = $("[data-order-bar]");
    bar.hidden = t.count === 0;
    requestAnimationFrame(() => bar.classList.toggle("show", t.count > 0));
    $("[data-bar-count]").textContent = `${t.count} item${t.count === 1 ? "" : "s"}`;
    $("[data-bar-total]").textContent = money(t.sum) + (t.unknown || t.from ? "+" : "");

    const items = $("[data-cart-items]");
    items.innerHTML = cart.map((l, i) => `
      <li class="cart-item">
        <div class="thumb">${l.img ? imgTag(l.img, "", "", false, SIZES.thumb) : `<div class="art art-${l.art}">${ART[l.art] || ""}</div>`}</div>
        <div>
          <h3>${esc(l.name)}</h3>
          <ul>${lineDetails(l).map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
          <div class="cart-row">
            <div class="qty small" aria-label="Quantity for ${esc(l.name)}">
              <button type="button" data-line="${i}" data-step="-1" aria-label="Fewer">−</button>
              <output>${l.qty}</output>
              <button type="button" data-line="${i}" data-step="1" aria-label="More">+</button>
            </div>
            <button class="remove" type="button" data-remove="${i}">Remove</button>
            <strong>${lineTotal(l) == null ? "In chat" : money(lineTotal(l)) + (l.from ? "+" : "")}</strong>
          </div>
        </div>
      </li>`).join("");

    const empty = cart.length === 0;
    $("[data-cart-empty]").hidden = !empty;
    form.hidden = empty;
    $("[data-drawer-foot]").hidden = empty;

    const totalEl = $("[data-total]");
    const totalText = money(t.sum) + (t.unknown || t.from ? "+" : "");
    if (totalEl.textContent !== totalText) {
      totalEl.textContent = totalText;
      totalEl.classList.remove("tick"); void totalEl.offsetWidth; totalEl.classList.add("tick");
    }
    const notes = [];
    if (t.unknown) notes.push(`${t.unknown} item${t.unknown > 1 ? "s" : ""} priced in chat`);
    if (F("fulfil").value === "Delivery") notes.push("delivery from $5");
    $("[data-total-note]").textContent = (notes.length ? "Plus " + notes.join(" and ") + ". " : "") + "We confirm your final total in chat.";
    $("[data-preview]").textContent = buildMessage();
    updateSendLinks();
  }

  $("[data-cart-items]").addEventListener("click", (e) => {
    const step = e.target.closest("[data-step]");
    const rm = e.target.closest("[data-remove]");
    if (step) {
      const l = cart[+step.dataset.line];
      l.qty += +step.dataset.step;
      if (l.qty < 1) cart.splice(+step.dataset.line, 1);
      saveCart();
    }
    if (rm) {
      const [gone] = cart.splice(+rm.dataset.remove, 1);
      saveCart();
      toast(`Removed ${gone.name}`);
    }
  });

  // Order form
  ["fulfil", "address", "when", "name", "notes"].forEach((k) => {
    if (savedForm[k] == null) return;
    if (k === "fulfil") { const r = form.querySelector(`input[name=fulfil][value="${savedForm.fulfil}"]`); if (r) r.checked = true; }
    else if (F(k)) F(k).value = savedForm[k];
  });
  function syncForm() {
    const delivery = F("fulfil").value === "Delivery";
    $("[data-address-field]").hidden = !delivery;
    store.set("cvmd-form-v1", { fulfil: F("fulfil").value, address: F("address").value, when: F("when").value, name: F("name").value, notes: F("notes").value });
    renderCart();
  }
  form.addEventListener("input", syncForm);
  form.addEventListener("change", syncForm);
  form.addEventListener("submit", (e) => e.preventDefault());

  function buildMessage() {
    if (!cart.length) return "";
    const t = totals();
    const lines = ["Hi CVMD! I'd like to place an order 🍇", ""];
    cart.forEach((l, i) => {
      lines.push(`${i + 1}. ${l.name} x${l.qty}`);
      lineDetails(l).forEach((d) => lines.push(`   ${d}`));
      const lt = lineTotal(l);
      lines.push(`   ${lt == null ? "Price: please confirm" : money(lt) + (l.from ? "+" : "")}`);
      lines.push("");
    });
    let total = `Estimated total: ${money(t.sum)}${t.from ? "+" : ""}`;
    if (t.unknown) total += ` plus ${t.unknown} item${t.unknown > 1 ? "s" : ""} to price`;
    lines.push(total);
    const f = F("fulfil").value;
    lines.push(`${f === "Delivery" ? "Delivery" : "Pickup"}${f === "Delivery" && F("address").value.trim() ? " to " + F("address").value.trim() : ""}`);
    if (F("when").value.trim()) lines.push(`Needed: ${F("when").value.trim()}`);
    if (F("name").value.trim()) lines.push(`Name: ${F("name").value.trim()}`);
    if (F("notes").value.trim()) lines.push(`Notes: ${F("notes").value.trim()}`);
    lines.push("", "(Sent from the CVMD website)");
    return lines.join("\n");
  }

  function updateSendLinks() {
    const msg = buildMessage();
    const fb = $('[data-send="facebook"]');
    let m = msg;
    while (encodeURIComponent(m).length > 1900) m = m.slice(0, -40);
    fb.href = `https://m.me/${CONTACT.messenger}${m ? "?text=" + encodeURIComponent(m) : ""}`;
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      ta.remove();
      return ok;
    }
  }

  $$("[data-send]").forEach((a) => a.addEventListener("click", () => {
    const where = a.dataset.send === "instagram" ? "Instagram" : "Messenger";
    copy(buildMessage()).then((ok) => {
      toast(ok
        ? `Order copied. In ${where}, paste it into the chat and tap send.`
        : `Opening ${where}. Open "Preview your message" to copy your order.`, 6000);
      if (!ok) $(".preview").open = true;
    });
  }));

  $("[data-copy]").addEventListener("click", () => {
    copy(buildMessage()).then((ok) => toast(ok ? "Message copied." : "Select the message text and copy it."));
  });

  $$("[data-open-cart]").forEach((b) => b.addEventListener("click", () => show(drawer)));

  // ===================== MOTION =====================
  // Split headings into words for the rise-in
  function splitWords(el) {
    const nodes = [...el.childNodes];
    el.textContent = "";
    let i = 0;
    const wrapWord = (node) => {
      const w = document.createElement("span");
      w.className = "w";
      const inner = document.createElement("span");
      inner.style.setProperty("--i", i++);
      inner.appendChild(node);
      w.appendChild(inner);
      return w;
    };
    nodes.forEach((n) => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) el.appendChild(document.createTextNode(" "));
          else el.appendChild(wrapWord(document.createTextNode(part)));
        });
      } else if (n.nodeName === "BR") el.appendChild(n);
      else el.appendChild(wrapWord(n));
    });
  }
  $$("[data-split]").forEach(splitWords);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.documentElement.classList.add("is-loaded");
    setTimeout(() => heroTitle.classList.add("in"), 120);
  }));

  // Reveal on scroll
  const REVEAL = [".ingredients li", ".steps li", ".note-card", ".allergy", ".faq-list details", ".visit-where", ".visit-hours",
    ".visit-actions .btn", ".gallery-nav", ".favorites", ".filters", ".welcome-text", ".welcome-copy .btn", ".perks li", ".section-head p", ".flavor-tabs", ".flavor-note", ".footer-grid > *"];
  REVEAL.forEach((sel) => $$(sel).forEach((el, i) => {
    el.setAttribute("data-reveal", "");
    const sibs = [...el.parentElement.children].filter((c) => c.matches(sel));
    el.style.setProperty("--d", sibs.indexOf(el));
  }));

  function countUp(el) {
    const target = +el.dataset.count, t0 = performance.now(), dur = 1300;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add("in");
      io.unobserve(el);
      if (el.hasAttribute("data-reveal")) setTimeout(() => el.removeAttribute("data-reveal"), 1800);
      if (el.classList.contains("flavors")) { const c = $("[data-count]", el); if (c) countUp(c); }
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$("[data-reveal], .split:not(.hero-title), .flavors").forEach((el) => io.observe(el));
  } else {
    $$("[data-reveal]").forEach((el) => el.removeAttribute("data-reveal"));
    $$(".split, .flavors").forEach((el) => el.classList.add("in"));
  }

  // Manifesto: words light up as you scroll, photos drift
  const manifesto = $(".welcome");
  const mText = $("[data-manifesto]");
  const HOT = ["candied", "fruit,"];
  mText.innerHTML = mText.textContent.trim().split(/\s+/).map((w) => `<span class="mw${HOT.includes(w) ? " hot-word" : ""}">${esc(w)}</span>`).join(" ");
  const mWords = $$(".mw", mText);
  const mFloats = $$(".wp", manifesto);
  let litCount = -1;
  if (reduceMotion) mWords.forEach((w) => w.classList.add("lit", ...(w.classList.contains("hot-word") ? ["hot"] : [])));

  // Scroll-driven updates: run once per frame only while the page is actually scrolling
  const progressEl = $("[data-progress]");
  let lastY = window.scrollY, scrollQueued = false;

  // Flavor ticker runs as a CSS animation on the GPU at the same speed as before (about 33px per second)
  const setTicker = () => {
    const half = tickerTrack.scrollWidth / 2;
    if (half) tickerTrack.style.setProperty("--tick-dur", `${(half / 33).toFixed(1)}s`);
  };
  setTicker();
  document.fonts && document.fonts.ready.then(setTicker);
  let tickTimer;
  window.addEventListener("resize", () => { clearTimeout(tickTimer); tickTimer = setTimeout(setTicker, 200); });
  if (!reduceMotion) tickerTrack.classList.add("run");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => tickerTrack.classList.toggle("paused", !e.isIntersecting)).observe(tickerTrack);
  }

  let welcomeInView = false;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { welcomeInView = e.isIntersecting; if (welcomeInView) queueScroll(); }).observe(manifesto);
  } else welcomeInView = true;

  function onScrollFrame() {
    scrollQueued = false;
    const y = window.scrollY;
    const dy = y - lastY;
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    progressEl.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
    nav.classList.toggle("scrolled", y > 8);
    if (!openDialog && !mobileNav.classList.contains("open")) {
      if (y > 520 && dy > 6) nav.classList.add("tucked");
      else if (dy < -6 || y < 200) nav.classList.remove("tucked");
    }
    nav.classList.toggle("on-hero", y < hero.offsetHeight - 40);

    if (!reduceMotion && welcomeInView) {
      const tr = mText.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (innerHeight * 0.85 - tr.top) / (innerHeight * 0.45)));
      const lit = Math.round(p * mWords.length);
      if (lit !== litCount) {
        litCount = lit;
        mWords.forEach((w, i) => {
          w.classList.toggle("lit", i < lit);
          w.classList.toggle("hot", i < lit && w.classList.contains("hot-word"));
        });
      }
      const mr = manifesto.getBoundingClientRect();
      const off = mr.top + mr.height / 2 - innerHeight / 2;
      mFloats.forEach((f, i) => f.style.setProperty(`--wy${i + 1}`, `${(off * [-0.06, 0.05, -0.1][i]).toFixed(1)}px`));
    }
  }
  function queueScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(onScrollFrame);
  }
  window.addEventListener("scroll", queueScroll, { passive: true });
  window.addEventListener("resize", queueScroll, { passive: true });
  queueScroll();

  // Palette switch for the preview (remove data-palette-switch from <html> to hide it)
  if (document.documentElement.hasAttribute("data-palette-switch")) {
    const box = document.createElement("div");
    box.className = "palette";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Color palette");
    box.innerHTML = `<span>Palette</span>
      <button type="button" data-theme-btn="candy"><i style="background:linear-gradient(135deg,#FF3D8B 50%,#171316 50%)"></i>Candy</button>
      <button type="button" data-theme-btn="olive"><i style="background:linear-gradient(135deg,#4F5F36 50%,#F4EEE3 50%)"></i>Olive</button>`;
    document.body.appendChild(box);
    const meta = $('meta[name="theme-color"]');
    const setTheme = (t) => {
      document.documentElement.setAttribute("data-theme", t);
      $$("[data-theme-btn]", box).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.themeBtn === t)));
      if (meta) meta.setAttribute("content", t === "olive" ? "#4F5F36" : "#171316");
      try { localStorage.setItem("cvmd-theme", t); } catch { /* storage unavailable */ }
    };
    setTheme(document.documentElement.getAttribute("data-theme") || "candy");
    box.addEventListener("click", (e) => {
      const b = e.target.closest("[data-theme-btn]");
      if (b) setTheme(b.dataset.themeBtn);
    });
  }

  renderCart();
  syncForm();
})();
