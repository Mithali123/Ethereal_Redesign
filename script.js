/* ============================================================
   HAMBURGER MENU
============================================================ */
const hamburger = document.querySelector(".hamburger");
const navbar    = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

/* ============================================================
   SLIDER
============================================================ */
const slides   = document.querySelectorAll(".slide");
const dots     = document.querySelectorAll(".dot");
const prevBtn  = document.querySelector(".prev");
const nextBtn  = document.querySelector(".next");

let current   = 0;
let autoTimer = null;

function goToSlide(index) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = (index + slides.length) % slides.length;

  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

function startAuto() {
  stopAuto();
  autoTimer = setInterval(() => goToSlide(current + 1), 1000);
}

function stopAuto() {
  clearInterval(autoTimer);
}

prevBtn.addEventListener("click", () => {
  goToSlide(current - 1);
  startAuto();
});

nextBtn.addEventListener("click", () => {
  goToSlide(current + 1);
  startAuto();
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    goToSlide(i);
    startAuto();
  });
});

/* Pause autoplay on hover */
const slider = document.querySelector(".slider");
slider.addEventListener("mouseenter", stopAuto);
slider.addEventListener("mouseleave", startAuto);

/* Touch / swipe support */
let touchStartX = 0;

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

slider.addEventListener("touchend", (e) => {
  const delta = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 50) {
    goToSlide(delta < 0 ? current + 1 : current - 1);
    startAuto();
  }
});

startAuto();

/* ============================================================
   LANGUAGE SWITCHER
============================================================ */
const enBtn = document.getElementById("en-btn");
const deBtn = document.getElementById("de-btn");

const translations = {
  en: {
    work:     "Work",
    services: "Services",
    trusted:  "Trusted By",
    pricing:  "Pricing",
    about:    "About",

    slide1Title: "Transparent Pricing.<br>Zero Surprises.",
    slide1Text:  "Know exactly what you're paying for from day one. No hidden fees, unexpected charges or confusing contracts.",
    slide1Btn:   "View Pricing →",

    slide2Title: "Unlimited Revisions.<br>Until It's Perfect.",
    slide2Text:  "We keep refining your designs until you're completely satisfied.",
    slide2Btn:   "Learn More →",

    slide3Title: "Design Built<br>For Growth.",
    slide3Text:  "Helping startups and brands scale through strategy, UX and conversion focused design.",
    slide3Btn:   "Explore Services →",

    slide4Title: "Creative Thinking.<br>Clear Results.",
    slide4Text:  "Built to connect and convert.",
    slide4Btn:   "About Us →"
  },

  de: {
    work:     "Projekte",
    services: "Leistungen",
    trusted:  "Vertrauen Uns",
    pricing:  "Preise",
    about:    "Über Uns",

    slide1Title: "Transparente Preise.<br>Keine Überraschungen.",
    slide1Text:  "Sie wissen von Anfang an genau, wofür Sie bezahlen. Keine versteckten Kosten.",
    slide1Btn:   "Preise Ansehen →",

    slide2Title: "Unbegrenzte Änderungen.<br>Bis Es Perfekt Ist.",
    slide2Text:  "Wir verfeinern Ihr Design, bis Sie vollkommen zufrieden sind.",
    slide2Btn:   "Mehr Erfahren →",

    slide3Title: "Design Für<br>Wachstum.",
    slide3Text:  "Wir helfen Marken durch Strategie, UX und Design zu wachsen.",
    slide3Btn:   "Leistungen Entdecken →",

    slide4Title: "Kreative Ideen.<br>Klare Ergebnisse.",
    slide4Text:  "Entwickelt, um zu verbinden und zu überzeugen.",
    slide4Btn:   "Über Uns →"
  }
};

function setLanguage(lang) {
  localStorage.setItem("language", lang);

  enBtn.classList.toggle("active", lang === "en");
  deBtn.classList.toggle("active", lang === "de");

  document.getElementById("nav-work").textContent     = translations[lang].work;
  document.getElementById("nav-services").textContent = translations[lang].services;
  document.getElementById("nav-trusted").textContent  = translations[lang].trusted;
  document.getElementById("nav-pricing").textContent  = translations[lang].pricing;
  document.getElementById("nav-about").textContent    = translations[lang].about;

  document.getElementById("slide1-title").innerHTML   = translations[lang].slide1Title;
  document.getElementById("slide1-text").textContent  = translations[lang].slide1Text;
  document.getElementById("slide1-btn").textContent   = translations[lang].slide1Btn;

  document.getElementById("slide2-title").innerHTML   = translations[lang].slide2Title;
  document.getElementById("slide2-text").textContent  = translations[lang].slide2Text;
  document.getElementById("slide2-btn").textContent   = translations[lang].slide2Btn;

  document.getElementById("slide3-title").innerHTML   = translations[lang].slide3Title;
  document.getElementById("slide3-text").textContent  = translations[lang].slide3Text;
  document.getElementById("slide3-btn").textContent   = translations[lang].slide3Btn;

  document.getElementById("slide4-title").innerHTML   = translations[lang].slide4Title;
  document.getElementById("slide4-text").textContent  = translations[lang].slide4Text;
  document.getElementById("slide4-btn").textContent   = translations[lang].slide4Btn;
}

enBtn.addEventListener("click", (e) => { e.preventDefault(); setLanguage("en"); });
deBtn.addEventListener("click", (e) => { e.preventDefault(); setLanguage("de"); });

const savedLanguage = localStorage.getItem("language") || "en";
setLanguage(savedLanguage);

// Services accordion
document.querySelectorAll('.service-item').forEach(item => {
    item.querySelector('.service-row').addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.service-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
    });
});

// Optional: Add click handler for cards to show more info
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking the link
            if(e.target.closest('.card-link')) return;
            card.classList.toggle('expanded');
        });
    });