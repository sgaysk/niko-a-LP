const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");
const toTop = document.getElementById("toTop");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));

function setScrolledState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
    if (!menuButton || !siteNav) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
    menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    siteNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
}

function toggleMenu() {
    if (!menuButton || !siteNav) return;
    const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(willOpen));
    menuButton.setAttribute("aria-label", willOpen ? "メニューを閉じる" : "メニューを開く");
    menuButton.innerHTML = willOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    siteNav.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
}

function setActiveNav() {
    if (!sections.length || !navLinks.length) return;
    const currentPosition = window.scrollY + 140;
    let activeId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
            activeId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const targetId = link.getAttribute("href")?.replace("#", "");
        link.classList.toggle("is-active", targetId === activeId);
    });
}

function setTopButton() {
    if (!toTop) return;
    toTop.classList.toggle("is-visible", window.scrollY > 560);
}

function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            closeMenu();
            const top = target.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });
}

function initDetails() {
    const details = Array.from(document.querySelectorAll("details"));
    details.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;
            details.forEach((other) => {
                if (other !== item) other.open = false;
            });
        });
    });
}

window.addEventListener("scroll", () => {
    setScrolledState();
    setActiveNav();
    setTopButton();
}, { passive: true });

window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
});

if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

if (toTop) {
    toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

initSmoothAnchors();
initDetails();
setScrolledState();
setActiveNav();
setTopButton();
