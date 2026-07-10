/* ============================================
   MA'LUMOTLAR — yangi multfilm qo'shish uchun
   shunchaki quyidagi ro'yxatga qator qo'shing.
   featured: true qilib belgilasangiz, u kanal
   "Eng ko'p tomosha qilinadigan" bo'limida chiqadi.
   ============================================ */
const CHANNELS = [
  { name: "Kung Fu Panda",           handle: "kungfupanda_kungfupanda",        featured: false },
  { name: "Masha va Ayiq",           handle: "masha_va_ayiq_masha_and_the_bear", featured: true  },
  { name: "Fiksiklar",               handle: "fiksiklar_the_fixies",            featured: false },
  { name: "Kichkina Nikola",         handle: "kichkina_nikola_thelittle_nicola", featured: false },
  { name: "SpongeBob",               handle: "sponjbob_spongebob",              featured: true  },
  { name: "Smurflar",                handle: "smurflar_the_smurfs",             featured: false },
  { name: "Malika Sofiya",           handle: "malika_sofiya_sofia_the_first",   featured: false },
  { name: "Asalari Maya",            handle: "asalari_maya_maya_the_bee",       featured: false },
  { name: "Xonqiz sarguzashtlari",   handle: "xonqiz_sarguzashtlari_miraculous", featured: false },
  { name: "Chip va Deyl",            handle: "chip_va_deyl_chip_n_dale",        featured: false },
  { name: "Ben 10",                  handle: "ben_on_ben_10",                   featured: true  },
  { name: "Qo'zichoq Shon",          handle: "qozichoq_shon_shaun_the_sheep",   featured: false },
  { name: "Gravity Falls",           handle: "gravity_falls_graviti_folz",      featured: true  },
];

const ACCENTS = ["coral", "teal", "gold", "violet"];
const ACCENT_HEX = {
  coral:  "var(--coral)",
  teal:   "var(--teal)",
  gold:   "var(--gold)",
  violet: "var(--violet)",
};

function telegramUrl(handle){
  return `https://t.me/${handle}`;
}

function makeCard(channel, index, opts = {}){
  const accent = ACCENTS[index % ACCENTS.length];
  const number = String(index + 1).padStart(2, "0");
  const initial = channel.name.trim().charAt(0).toUpperCase();

  const card = document.createElement("a");
  card.href = telegramUrl(channel.handle);
  card.target = "_blank";
  card.rel = "noopener";
  card.className = "channel-card";
  card.dataset.name = channel.name.toLowerCase();

  card.innerHTML = `
    <div class="card-strip" style="background:${ACCENT_HEX[accent]}"></div>
    <div class="card-body">
      <div class="card-top">
        <span class="card-number">KANAL ${number}</span>
        ${opts.showBadge ? `<span class="card-tag" style="background:${ACCENT_HEX[accent]}; color:#fff;">TOP</span>` : ""}
      </div>
      <div class="card-icon" style="background:${ACCENT_HEX[accent]}">${initial}</div>
      <h3 class="card-name">${channel.name}</h3>
      <p class="card-handle">@${channel.handle}</p>
      <span class="card-cta">Kanalga o'tish ↗</span>
    </div>
  `;
  return card;
}

function render(){
  const featuredGrid = document.getElementById("featured-grid");
  const channelsGrid = document.getElementById("channels-grid");

  const featured = CHANNELS.filter(c => c.featured);
  featured.forEach((c, i) => {
    featuredGrid.appendChild(makeCard(c, CHANNELS.indexOf(c), { showBadge: true }));
  });

  CHANNELS.forEach((c, i) => {
    channelsGrid.appendChild(makeCard(c, i, { showBadge: false }));
  });
}

function setupSearch(){
  const input = document.getElementById("search-input");
  const emptyState = document.getElementById("empty-state");
  const countLabel = document.getElementById("search-count");
  const allCards = () => Array.from(document.querySelectorAll(".channels-grid .channel-card"));

  countLabel.textContent = `${CHANNELS.length} ta kanal mavjud`;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    allCards().forEach(card => {
      const match = card.dataset.name.includes(q);
      card.style.display = match ? "" : "none";
      if(match) visible++;
    });
    emptyState.hidden = visible !== 0;
    countLabel.textContent = q
      ? `${visible} ta natija topildi`
      : `${CHANNELS.length} ta kanal mavjud`;
  });
}

function setupTheme(){
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("mf-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if(saved === "dark" || (!saved && prefersDark)){
    root.setAttribute("data-theme", "dark");
  }

  toggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    if(isDark){
      root.removeAttribute("data-theme");
      localStorage.setItem("mf-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("mf-theme", "dark");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  setupSearch();
  setupTheme();
});
