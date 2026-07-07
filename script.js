const navbar = document.querySelector("[data-navbar]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const year = document.querySelector("[data-year]");
const revealItems = document.querySelectorAll(".reveal");

const setScrolled = () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > 20);
};

const closeMenu = () => {
  menuButton.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("is-open");
  navbar.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

setScrolled();
window.addEventListener("scroll", setScrolled, { passive: true });

menuButton.addEventListener("click", () => {
  const open = !menuButton.classList.contains("is-open");
  menuButton.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  mobileMenu.classList.toggle("is-open", open);
  navbar.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealItems.forEach((item) => observer.observe(item));
