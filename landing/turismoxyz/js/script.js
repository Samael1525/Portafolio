/* ==========================================================================
   TurismoXYZ — Interacciones
   Tema claro/oscuro · menú móvil · scroll reveal · contadores · back-to-top
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Tema claro/oscuro ---------- */
  var THEME_KEY = "turismoxyz-theme";

  function getInitialTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {
      saved = null;
    }
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme, updateButton) {
    root.setAttribute("data-theme", theme);
    var label = theme === "dark" ? "Activar modo claro" : "Activar modo noche";
    document.getElementById("theme-toggle").setAttribute("aria-label", label);
    if (updateButton !== false) {
      document.getElementById("theme-toggle").title = label;
    }
  }

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* sin almacenamiento disponible */
      }
    });
  }

  /* Aplicar tema tan pronto como el DOM esté listo (sin parpadeo) */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyTheme(getInitialTheme());
    });
  } else {
    applyTheme(getInitialTheme());
  }

  /* ---------- Header al hacer scroll ---------- */
  var header = document.getElementById("header");
  var backToTop = document.getElementById("back-to-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (backToTop) backToTop.classList.toggle("show", y > 600);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Menú móvil ---------- */
  var nav = document.getElementById("nav-mobile");
  var navToggle = document.getElementById("nav-toggle");
  var navClose = document.getElementById("nav-close");
  var overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("open");
    navToggle.classList.remove("active");
    overlay.classList.remove("show");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function toggleNav() {
    var open = nav.classList.toggle("open");
    navToggle.classList.toggle("active", open);
    overlay.classList.toggle("show", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", toggleNav);
    overlay.addEventListener("click", closeNav);
    if (navClose) navClose.addEventListener("click", closeNav);
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Contadores animados ---------- */
  function animateCounter(el) {
    var target = parseInt(el.dataset.count, 10) || 0;
    var suffix = el.dataset.suffix || "";
    var duration = 1800;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("es");
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString("es") + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll(".stat .num");
  if ("IntersectionObserver" in window && counters.length) {
    var counterObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    counters.forEach(function (el) {
      el.textContent =
        (parseInt(el.dataset.count, 10) || 0).toLocaleString("es") + (el.dataset.suffix || "");
    });
  }

  /* ---------- Año dinámico en el footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Formulario de contacto (demo) ---------- */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> ¡Mensaje enviado!';
      btn.style.pointerEvents = "none";
      setTimeout(function () {
        btn.innerHTML = original;
        btn.style.pointerEvents = "";
        contactForm.reset();
      }, 2600);
    });
  }
})();
