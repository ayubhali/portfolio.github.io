export class ContactForm {
    constructor() {
        this.form = document.querySelector("#contact-form");
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener("submit", (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Here you would typically send the data to your backend
            console.log("Form submitted:", data);
            this.form.reset();
            alert("Thank you for your message! I'll get back to you soon.");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error sending your message. Please try again later.");
        }
    }
}
