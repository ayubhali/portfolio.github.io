import { TypingEffect } from './typing.js';
import { Navigation } from './navigation.js';
import { ContactForm } from './contact.js';
import { setupIntersectionObserver } from './utils.js';

document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio site loaded successfully!");

    // Initialize typing effect
    const typingText = document.getElementById("typing-text");
    if (typingText) {
        const typingEffect = new TypingEffect(typingText, ["Ayub Hussein Ali"]);
        typingEffect.start();
    }

    // Initialize navigation
    new Navigation();

    // Initialize contact form
    new ContactForm();

    // Setup experience cards animation
    const experienceCards = document.querySelectorAll('.experience-card');
    const observerOptions = {
        root: null,
        rootMargin: '-50px',  // Start animation slightly before the card comes into view
        threshold: 0.1
    };

    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = Array.from(experienceCards).indexOf(card);
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150); // Slightly faster delay between cards
                experienceObserver.unobserve(card);
            }
        });
    }, observerOptions);

    experienceCards.forEach(card => {
        card.classList.remove('visible');
        experienceObserver.observe(card);
    });

    // Setup project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserverOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = Array.from(projectCards).indexOf(card);
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150); // Same timing as experience cards
                projectObserver.unobserve(card);
            }
        });
    }, projectObserverOptions);

    // Initialize project cards
    projectCards.forEach(card => {
        card.classList.remove('visible');
        projectObserver.observe(card);
    });

    // Setup experience section animation
    const experienceSection = document.getElementById("experience");
    if (experienceSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                sectionObserver.unobserve(experienceSection);
            }
        }, { threshold: 0.1 });
        
        sectionObserver.observe(experienceSection);
    }
});
