/* =======================================================
   ARAB TILI VA MULTFILM — app.js
   Header scroll, mobil menyu, qidiruv, tepaga chiqish,
   scroll-animatsiyalar
======================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- FOOTER YIL ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- HEADER SCROLL ---------- */
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* ---------- MOBIL MENYU ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const mobileOverlay = document.getElementById("mobileOverlay");

  function openMenu() {
    mobileNav.classList.add("active");
    mobileOverlay.classList.add("active");
    menuToggle.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileNav.classList.remove("active");
    mobileOverlay.classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (mobileNav.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeMenu);
  }

  document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  /* ---------- QIDIRUV ---------- */
  const searchInput = document.querySelector(".search-area input");
  const cards = document.querySelectorAll(".serial-card");
  const noResults = document.getElementById("noResults");

  function filterCards() {
    const value = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const match = title.includes(value);
      card.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", filterCards);
  }

  const searchButton = document.querySelector(".search-area button");
  if (searchButton) {
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      filterCards();
      document.getElementById("serials")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------- TEPAGA CHIQISH TUGMASI ---------- */
  const topButton = document.getElementById("topButton");

  if (topButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        topButton.classList.add("show");
      } else {
        topButton.classList.remove("show");
      }
    });

    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- SCROLL ANIMATSIYALARI (kartalar va bo'limlar) ---------- */
  const revealTargets = document.querySelectorAll(
    ".serial-card, .why-card, .telegram-card, .section-title"
  );

  revealTargets.forEach(el => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px"
  });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* Kartalarga tartibli kechikish (stagger) berish */
  document.querySelectorAll(".serial-grid .serial-card").forEach((card, i) => {
    card.style.transitionDelay = `${(i % 6) * 0.08}s`;
  });

  /* ---------- TELEFONDA BOSGANDA OVERLAY CHIQISHI ---------- */
  const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (isTouchDevice) {
    document.querySelectorAll(".serial-card").forEach(card => {
      card.addEventListener("click", (e) => {
        // Havola (Telegramda ochish) ustiga bosilsa — oddiy ishlayveradi
        if (e.target.closest("a")) return;

        e.preventDefault();

        const wasActive = card.classList.contains("active");

        document.querySelectorAll(".serial-card.active").forEach(c => {
          c.classList.remove("active");
        });

        if (!wasActive) {
          card.classList.add("active");
        }
      });
    });

    // Boshqa joyga bosilganda ochiq kartani yopish
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".serial-card")) {
        document.querySelectorAll(".serial-card.active").forEach(c => {
          c.classList.remove("active");
        });
      }
    });
  }

});
