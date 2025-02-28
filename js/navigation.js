export class Navigation {
    constructor() {
        this.sections = document.querySelectorAll("section");
        this.navLinks = document.querySelectorAll("nav a");
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupScrollSpy();
    }

    setupSmoothScroll() {
        this.navLinks.forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute("href").slice(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    }

    updateActiveLink() {
        let currentSection = "";
        this.sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute("id");
            }
        });

        this.navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === currentSection) {
                link.classList.add("active");
            }
        });
    }

    setupScrollSpy() {
        window.addEventListener("scroll", () => this.updateActiveLink());
        this.updateActiveLink();
    }
}
