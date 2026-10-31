// Arojen Tarinat website: header, menu, scroll reveals, hero slideshow, counters, gallery, contact form.
(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Header: solid once the page scrolls; the hero map drifts a little slower than the page.
  const header = document.querySelector(".site-header");
  const heroBg = document.querySelector(".hero-bg");
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 12);
    if (heroBg && !reduceMotion && y < window.innerHeight * 1.2) heroBg.style.setProperty("--parallax", `${y * 0.28}px`);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  // Mobile menu.
  const toggle = document.querySelector(".menu-toggle");
  const closeMenu = () => {
    header?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  };
  toggle?.addEventListener("click", () => {
    const open = !header.classList.contains("is-open");
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  // Reveal sections as they scroll into view; count the stats up once.
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (!target || reduceMotion) return;
    const start = performance.now();
    const duration = 1400;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))).toString();
      if (t < 1) requestAnimationFrame(step);
    };
    el.textContent = "0";
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const seen = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll("[data-count]").forEach(countUp);
        seen.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => seen.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  // Cards: a soft light follows the pointer.
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  // Embers rising over the hero map.
  const embers = document.querySelector(".embers");
  if (embers && !reduceMotion) {
    const count = window.innerWidth < 700 ? 14 : 28;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "ember";
      s.style.left = `${Math.random() * 100}%`;
      s.style.setProperty("--s", `${2 + Math.random() * 3.5}px`);
      s.style.setProperty("--d", `${9 + Math.random() * 10}s`);
      s.style.setProperty("--delay", `${-Math.random() * 18}s`);
      s.style.setProperty("--drift", `${-60 + Math.random() * 120}px`);
      frag.appendChild(s);
    }
    embers.appendChild(frag);
  }

  // Hero slideshow inside the device frame.
  const screen = document.querySelector(".device-screen");
  if (screen) {
    const slides = [...screen.querySelectorAll("img")];
    const dots = [...document.querySelectorAll(".device-dots button")];
    let index = 0;
    let timer;
    const show = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((img, n) => {
        if (n === index && img.loading === "lazy") img.loading = "eager";
        img.classList.toggle("is-active", n === index);
      });
      dots.forEach((d, n) => d.setAttribute("aria-current", String(n === index)));
    };
    const play = () => {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(() => show(index + 1), 4200);
    };
    dots.forEach((d, n) => d.addEventListener("click", () => { show(n); play(); }));
    document.addEventListener("visibilitychange", () => (document.hidden ? clearInterval(timer) : play()));
    show(0);
    play();
  }

  // Screenshot gallery: arrows scroll the track, a click opens the large image.
  const track = document.querySelector(".gallery-track");
  if (track) {
    const by = () => track.clientWidth * 0.8;
    document.querySelector("[data-gallery-prev]")?.addEventListener("click", () => track.scrollBy({ left: -by(), behavior: "smooth" }));
    document.querySelector("[data-gallery-next]")?.addEventListener("click", () => track.scrollBy({ left: by(), behavior: "smooth" }));

    const box = document.querySelector(".lightbox");
    const shots = [...track.querySelectorAll(".shot")];
    let current = 0;
    const open = (i) => {
      current = (i + shots.length) % shots.length;
      const img = shots[current].querySelector("img");
      const big = box.querySelector("img");
      big.src = img.dataset.full;
      big.alt = img.alt;
      box.querySelector("p").textContent = shots[current].querySelector("figcaption").textContent;
      if (!box.open) box.showModal();
    };
    shots.forEach((shot, i) => shot.querySelector("button").addEventListener("click", () => open(i)));
    box?.querySelector("[data-close]")?.addEventListener("click", () => box.close());
    box?.querySelector("[data-prev]")?.addEventListener("click", () => open(current - 1));
    box?.querySelector("[data-next]")?.addEventListener("click", () => open(current + 1));
    box?.addEventListener("click", (e) => { if (e.target === box) box.close(); });
    box?.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") open(current - 1);
      if (e.key === "ArrowRight") open(current + 1);
    });
  }

  // Table of contents: mark the section being read.
  const tocLinks = [...document.querySelectorAll(".toc a")];
  if (tocLinks.length && "IntersectionObserver" in window) {
    const byId = new Map(tocLinks.map((a) => [a.hash.slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        tocLinks.forEach((a) => a.classList.remove("is-active"));
        byId.get(entry.target.id)?.classList.add("is-active");
      }
    }, { rootMargin: "-20% 0px -70% 0px" });
    byId.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
  }

  // Contact form: writes the message into the visitor's own mail app.
  const form = document.querySelector("[data-mail-form]");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `[${data.get("topic")}] ${data.get("subject") || "Arojen Tarinat"}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")}${data.get("device") ? `\nDevice: ${data.get("device")}` : ""}`;
    window.location.href = `mailto:${form.dataset.mailForm}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  // Footer year.
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
