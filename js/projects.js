import { preloadImage } from './utils.js';

export class ProjectSlider {
    constructor() {
        this.currentSlide = 0;
        this.track = document.querySelector(".projects-track");
        this.prevBtn = document.querySelector(".prev-btn");
        this.nextBtn = document.querySelector(".next-btn");
        this.dotsContainer = document.querySelector(".slider-dots");
        this.slidesPerView = this.getSlidesPerView();
        
        this.init();
        this.addEventListeners();
        this.handleResize();
    }

    getSlidesPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.slidesPerView = this.getSlidesPerView();
            this.updateSlider();
        });
    }

    createProjectSlide(project) {
        return `
            <div class="project-slide">
                <div class="project-card">
                    <div class="project-image-container">
                        <img src="${project.image}" alt="${project.name}" class="project-image">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="${project.github}" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i> View Code
                                </a>
                                <a href="${project.demo}" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i> Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateSlider() {
        if (!this.track) return;
        const slideWidth = 100 / this.slidesPerView;
        const offset = -this.currentSlide * slideWidth;
        this.track.style.transform = `translateX(${offset}%)`;
    }

    addEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                if (this.currentSlide > 0) {
                    this.currentSlide--;
                    this.updateSlider();
                }
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                const maxSlide = Math.ceil(projects.length / this.slidesPerView) - 1;
                if (this.currentSlide < maxSlide) {
                    this.currentSlide++;
                    this.updateSlider();
                }
            });
        }
    }

    async init() {
        if (!this.track) return;
        
        const projects = [
            {
                name: "Blogger",
                description: "A full-stack blog application with admin dashboard for managing content. Built with Next.js, MongoDB, and TailwindCSS for a modern, responsive design.",
                image: "assets/Blogger.jpg",
                techStack: ["nextjs", "mongodb", "tailwindcss", "react"],
                github: "https://github.com/ayubhali/next-blog-app.git",
                demo: "https://blogger-demo.vercel.app",
            },
            {
                name: "PickMe",
                description: "An Android application that simplifies event registration with a lottery-based system. Features QR code-based check-ins and real-time notifications.",
                image: "assets/PickMe.jpg",
                techStack: ["java", "firebase", "android"],
                github: "https://github.com/ayubhali/pickme",
                demo: "https://pickme-demo.vercel.app",
            },
            {
                name: "NutriSmart",
                description: "AI-powered food delivery app with personalized meal planning. Built with modern web technologies and a focus on user experience.",
                image: "assets/NutriSmart.jpg",
                techStack: ["html5", "css3", "javascript"],
                github: "https://github.com/ayubhali/nutrismart",
                demo: "https://nutrismart-demo.vercel.app",
            }
        ];

        // Preload images
        await Promise.all(projects.map(project => preloadImage(project.image)));

        // Create project slides
        projects.forEach((project, index) => {
            const slide = document.createElement('div');
            slide.className = 'project-slide';
            
            slide.innerHTML = `
                <div class="project-card">
                    <div class="project-image-container">
                        <img src="${project.image}" alt="${project.name}" class="project-image">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="${project.github}" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i> View Code
                                </a>
                                <a href="${project.demo}" target="_blank" class="project-link">
                                    <i class="fas fa-external-link-alt"></i> Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            this.track.appendChild(slide);
        });
    }
}
