document.addEventListener('DOMContentLoaded', () => {
    const bubbleArea = document.getElementById('bubble-area');
    const messages = Array.from({ length: 20 }, (_, i) => `Message ${i + 1}`);
    let starCreationInterval;

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        const startPos = Math.random() * (window.innerHeight * 0.5);
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${startPos}px`;

        bubbleArea.appendChild(star);
    }

    function popStar(star, message) {
        star.innerText = message;
        star.style.opacity = 0;
        star.style.transform = 'scale(0)';
        setTimeout(() => {
            star.remove();
        }, 1000); // Remove star after 1 second to allow for fade-out animation
    }

    const startButton = document.getElementById('start-adventure');
    if (startButton) {
        startButton.addEventListener('click', () => {
            // Ensure we don't set up multiple intervals if button is clicked more than once
            if (!starCreationInterval) {
                createStar(); // Create an initial star right away
                starCreationInterval = setInterval(() => {
                    createStar(); // Continuously create stars every 3 seconds
                }, 3000);
            }
            const music = document.getElementById('background-music');
            music.volume = 0.2; // Set the volume to 20%
            music.play(); // Start the background music
            startButton.style.display = 'none'; // Optionally hide the start button
        });
    }

    // Delegate click event to bubble-area for handling star pops
    bubbleArea.addEventListener('click', function(event) {
        if (event.target.classList.contains('star')) {
            const messageIndex = Math.floor(Math.random() * messages.length);
            popStar(event.target, messages[messageIndex]);
        }
    });
});
