export class TypingEffect {
    constructor(element, texts) {
        this.element = element;
        this.texts = texts;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isArabic = false;
    }

    type() {
        if (!this.element) return;

        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.charIndex--;
        } else {
            this.charIndex++;
        }

        this.element.innerHTML = currentText.substring(0, this.charIndex);
        this.element.style.direction = this.isArabic ? "rtl" : "ltr";

        let typeSpeed = this.isDeleting ? 100 : 200;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            this.isArabic = !this.isArabic;
        }

        setTimeout(() => this.type(), typeSpeed);
    }

    start() {
        this.type();
    }
}
