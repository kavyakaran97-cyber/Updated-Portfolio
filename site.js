/* Kaviyakavi Baskaran — shared site behaviour
   Safe to load on any page: every hook is optional. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var loader = document.getElementById("loader");
  var nav    = document.getElementById("nav");
  var hero   = document.getElementById("hero");

  /* ---------- loader: the greeting rises word by word ---------- */
  var holder = document.getElementById("loadName");
  if (holder) {
    "Hey, glad you're here".split(" ").forEach(function (word, i) {
      var mask = document.createElement("span");
      var line = document.createElement("i");
      line.textContent = word;
      line.style.animationDelay = (0.2 + i * 0.11) + "s";
      mask.appendChild(line);
      holder.appendChild(mask);
    });
  }

  /* ---------- smooth scroll ---------- */
  var lenis = null;
  function initScroll() {
    if (reduce || typeof Lenis === "undefined") return;
    lenis = new Lenis({
      duration: 1.25,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on("scroll", onScroll);
  }

  /* ---------- the chart: hover a bar to bring that role forward ---------- */
  var gr = document.getElementById("gr");
  var grCols = gr ? [].slice.call(gr.querySelectorAll(".gr-col")) : [];
  var GR_DEFAULT = 2;                      // Prudent AI holds the stage at rest

  function setActive(i) {
    grCols.forEach(function (c, n) { c.classList.toggle("is-on", n === i); });
    if (!reduce) runCounts(grCols[i]);
  }

  /* the highlight number counts up the first time its bar is raised */
  function runCounts(scope) {
    scope.querySelectorAll("[data-count]").forEach(function (el) {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      var target = parseFloat(el.dataset.count),
          pre = el.dataset.pre || "", post = el.dataset.post || "",
          start = performance.now(), dur = 900;
      (function step(now) {
        var q = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - q, 3);
        el.textContent = pre + Math.round(target * e) + post;
        if (q < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }

  /* ---------- parallax ---------- */
  var parallaxEls = [].slice.call(document.querySelectorAll("[data-speed]"));
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    parallaxEls.forEach(function (el) {
      el.style.transform = "translate3d(0," + (y * parseFloat(el.dataset.speed)) + "px,0)";
    });
  }
  if (!reduce && parallaxEls.length) {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  if (gr) {
    grCols.forEach(function (c, i) {
      c.addEventListener("mouseenter", function () { setActive(i); });
      c.addEventListener("focusin", function () { setActive(i); });
    });
    gr.addEventListener("mouseleave", function () { setActive(GR_DEFAULT); });

    new IntersectionObserver(function (es, o) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        gr.classList.add("lit");
        if (!reduce) runCounts(grCols[GR_DEFAULT]);
        o.disconnect();
      });
    }, { threshold: .2 }).observe(gr);

    if (window.innerWidth <= 900 && !reduce) grCols.forEach(runCounts);
  }


  /* ---------- case-study deck: one slide at a time ---------- */
  var deck = document.getElementById("deck");
  if (deck) {
    var track = document.getElementById("deckTrack");
    var slides = [].slice.call(track.children);
    var prev = document.getElementById("deckPrev");
    var next = document.getElementById("deckNext");
    var posEl = document.getElementById("deckPos");
    var nowEl = document.getElementById("deckNow");
    var at = 0;

    function show(i) {
      at = Math.max(0, Math.min(slides.length - 1, i));
      track.style.transform = "translate3d(" + (-at * 100) + "%,0,0)";
      posEl.textContent = nowEl.textContent = at + 1;
      prev.disabled = at === 0;
      next.disabled = at === slides.length - 1;
      // only the visible slide is reachable by keyboard or screen reader
      slides.forEach(function (s, n) { s.setAttribute("aria-hidden", n !== at); });
    }

    prev.addEventListener("click", function () { show(at - 1); });
    next.addEventListener("click", function () { show(at + 1); });

    deck.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { show(at - 1); e.preventDefault(); }
      if (e.key === "ArrowRight") { show(at + 1); e.preventDefault(); }
    });

    // swipe
    var x0 = null;
    var view = document.getElementById("deckView");
    view.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    view.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) show(at + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });

    show(0);
  }

  /* ---------- in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === "#") return;
    a.addEventListener("click", function (e) {
      var t = document.querySelector(href);
      if (!t) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(t, { offset: -100 });
      else t.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- count-up ---------- */
  function countUp(el) {
    var target = parseFloat(el.dataset.count),
        pre = el.dataset.pre || "",
        post = el.dataset.post || "",
        start = performance.now(),
        dur = 1400;
    function step(now) {
      var p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(target * e) + post;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      var c = en.target.querySelector("[data-count]");
      if (c && !c.dataset.done && !reduce) { c.dataset.done = "1"; countUp(c); }
      io.unobserve(en.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- year ---------- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- boot ---------- */
  function reveal() {
    if (loader) loader.classList.add("done");
    document.body.classList.remove("is-loading");
    if (hero) hero.classList.add("lit");
    if (nav) setTimeout(function () { nav.classList.add("show"); }, loader ? 350 : 60);
    initScroll();
  }

  if (!loader) {                       // subpages: no loader, show straight away
    reveal();
  } else {
    var minWait = new Promise(function (r) { setTimeout(r, reduce ? 200 : 2100); });
    var loaded = new Promise(function (r) {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", r);
    });
    Promise.all([minWait, loaded]).then(reveal);
    setTimeout(reveal, 5000);          // hard failsafe
  }
})();
