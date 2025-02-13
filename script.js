document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio site loaded successfully!");

  // Typing effect for index page
  const typingElement = document.querySelector("#typing-text");
  if (typingElement) {
    const texts = ['أيوب علي', 'Ayub Ali'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isArabic = false;

    function type() {
      const typingText = document.getElementById('typing-text');
      if (!typingText) return;

      const currentText = texts[textIndex];
      
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingText.innerHTML = currentText.substring(0, charIndex);
      typingText.style.direction = isArabic ? 'rtl' : 'ltr';

      let typeSpeed = isDeleting ? 100 : 200;

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        isArabic = !isArabic;
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Update active navigation link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  function updateActiveLink() {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // Show/hide sections based on scroll position
  const experienceSection = document.getElementById('experience');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  if (experienceSection) {
    observer.observe(experienceSection);
  }

  // Project hover effects
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    const overlay = card.querySelector('.project-overlay');
    const content = card.querySelector('.project-content');
    const techStack = card.querySelector('.tech-stack');

    // Smooth reveal of tech stack icons
    if (techStack) {
      const icons = techStack.querySelectorAll('img');
      icons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(10px)';
        setTimeout(() => {
          icon.style.opacity = '1';
          icon.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
      });
    }

    // Add hover effect
    card.addEventListener('mouseenter', () => {
      if (overlay) {
        overlay.style.opacity = '1';
        overlay.style.transform = 'translateY(0)';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(10px)';
      }
    });
  });

  // Experience section fade in
  const experienceCards = document.querySelectorAll('.experience-card');

  const fadeInExperience = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  };

  const experienceObserver = new IntersectionObserver(fadeInExperience, {
    root: null,
    threshold: 0.1
  });

  experienceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    experienceObserver.observe(card);
  });

  // Projects page functionality
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    const projects = [
      {
        name: 'PickMe',
        description: 'An Android application that simplifies event registration with a lottery-based system. Built with Java and Firebase, featuring real-time updates and user authentication.',
        image: 'assets/PickMeProject.png',
        techStack: ['java', 'firebase', 'android'],
        github: 'https://github.com/ayubhali/pickme',
        demo: '#'
      },
      {
        name: 'NutriSmart',
        description: 'AI-powered food delivery app with personalized meal planning. Integrates machine learning for dietary recommendations and real-time order tracking.',
        image: 'assets/NutriSmartProject.PNG',
        techStack: ['html5', 'css3', 'javascript'],
        github: 'https://github.com/ayubhali/nutrismart',
        demo: 'https://nutrismart-demo.vercel.app'
      }
    ];

    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    // Function to preload image
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          reject(new Error(`Failed to load image: ${src}`));
        };
        img.src = src;
      });
    };

    // Render projects
    const renderProjects = async () => {
      for (const project of projects) {
        try {
          // Try to load the project image
          const img = await preloadImage(project.image);
          img.className = 'project-image';
          img.alt = project.name;

          // Create tech stack icons
          const techStackIcons = project.techStack
            .filter(tech => tech && typeof tech === 'string')
            .map(tech => `<img 
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original.svg" 
              alt="${tech}"
              onerror="this.style.display='none'"
            />`).join('');

          const projectCard = document.createElement('div');
          projectCard.className = 'project-card';
          projectCard.innerHTML = `
            <div class="project-image-container">
              ${img.outerHTML}
            </div>
            <div class="project-content">
              <h3>${project.name}</h3>
              <p>${project.description}</p>
              <div class="tech-stack">
                ${techStackIcons}
              </div>
            </div>
            <div class="project-overlay">
              <div class="project-links">
                ${project.github ? `
                  <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer" title="View Source Code">
                    <i class="fab fa-github"></i>
                  </a>
                ` : ''}
                ${project.demo && project.demo !== '#' ? `
                  <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer" title="View Live Demo">
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                ` : ''}
              </div>
            </div>
          `;

          // Add click event to the entire card
          projectCard.addEventListener('click', (e) => {
            // Only trigger if not clicking on the links
            if (!e.target.closest('.project-link')) {
              // Open demo if available, otherwise github
              const url = project.demo && project.demo !== '#' ? project.demo : project.github;
              if (url) {
                window.open(url, '_blank', 'noopener noreferrer');
              }
            }
          });

          projectsGrid.appendChild(projectCard);
          
          // Add fade-in animation
          requestAnimationFrame(() => {
            projectCard.style.opacity = '1';
            projectCard.style.transform = 'translateY(0)';
          });

        } catch (error) {
          console.error('Error rendering project:', error);
        }
      }
    };

    // Start rendering projects
    renderProjects().catch(console.error);
  }

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Create success popup
      const popup = document.createElement('div');
      popup.className = 'success-popup';
      popup.innerHTML = `
        <p>Thank you for your message! I will get back to you soon.</p>
        <button onclick="this.parentElement.remove()">OK</button>
      `;
      document.body.appendChild(popup);
      
      // Reset form
      contactForm.reset();
      
      // Remove popup after 5 seconds
      setTimeout(() => {
        if (popup.parentElement) {
          popup.remove();
        }
      }, 5000);
    });
  }

  // Social Icon Hover Effect
  const socialLinks = document.querySelectorAll(".social-links a");
  socialLinks.forEach((link) => {
    link.addEventListener("mouseover", () => {
      link.style.transform = "scale(1.2)";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "scale(1)";
    });
  });
});
