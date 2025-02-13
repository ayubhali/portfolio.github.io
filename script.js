document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio site loaded successfully!");

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

  const texts = {
    english: "Ayub Ali",
    arabic: "أيوب علي",
  };

  class TypingEffect {
    constructor(element, texts, options = {}) {
      this.element = element;
      this.texts = texts;
      this.currentTextIndex = 0;
      this.currentCharIndex = 0;
      this.typingSpeed = options.typingSpeed || 100;
      this.deletingSpeed = options.deletingSpeed || 50;
      this.pauseBeforeDelete = options.pauseBeforeDelete || 2000;
      this.pauseBeforeType = options.pauseBeforeType || 500;
      this.isDeleting = false;
      this.start();
    }

    type() {
      const currentText = Object.values(this.texts)[this.currentTextIndex];

      if (this.isDeleting) {
        this.currentCharIndex--;
        this.element.textContent = currentText.substring(
          0,
          this.currentCharIndex
        );

        if (this.currentCharIndex === 0) {
          this.isDeleting = false;
          this.currentTextIndex =
            (this.currentTextIndex + 1) % Object.keys(this.texts).length;
          setTimeout(() => this.type(), this.pauseBeforeType);
          return;
        }
      } else {
        this.currentCharIndex++;
        this.element.textContent = currentText.substring(
          0,
          this.currentCharIndex
        );

        if (this.currentCharIndex === currentText.length) {
          this.isDeleting = true;
          setTimeout(() => this.type(), this.pauseBeforeDelete);
          return;
        }
      }

      setTimeout(
        () => this.type(),
        this.isDeleting ? this.deletingSpeed : this.typingSpeed
      );
    }

    start() {
      this.type();
    }
  }

  const typingElement = document.querySelector(".hero h1");
  new TypingEffect(typingElement, texts, {
    typingSpeed: 150,
    deletingSpeed: 100,
    pauseBeforeDelete: 2000,
    pauseBeforeType: 500,
  });
});
