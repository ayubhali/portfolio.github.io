document.addEventListener('DOMContentLoaded', function() {
    const text = "Ayub Hussein Ali";
    const typingText = document.getElementById('typing-text');
    typingText.textContent = ''; // Clear initial content
    
    let currentText = '';
    let currentIndex = 0;
    const typingDelay = 150; // Delay between each character
    const startDelay = 500; // Initial delay before typing starts
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function typeText() {
        // Create a span for typed text and cursor
        const textSpan = document.createElement('span');
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'cursor';
        typingText.appendChild(textSpan);
        typingText.appendChild(cursorSpan);
        
        await sleep(startDelay);
        
        while (currentIndex < text.length) {
            currentText += text[currentIndex];
            textSpan.textContent = currentText;
            currentIndex++;
            await sleep(typingDelay);
        }
        
        // Keep the cursor blinking after typing is done
        typingText.classList.add('typing-done');
    }
    
    typeText();
});
