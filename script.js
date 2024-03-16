document.addEventListener('DOMContentLoaded', () => {
    const bubbleArea = document.getElementById('bubble-area');
    const messages = Array.from({ length: 20 }, (_, i) => `Message ${i + 1}`); // Placeholder for 20 messages

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        const startPos = Math.random() * (window.innerHeight * 0.5); // Start above the 50% mark of the screen
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${startPos}px`;

        bubbleArea.appendChild(star);
        // Remove the auto-removal of stars after 2 seconds if you want them to stay until clicked
        // setTimeout(() => {
        //     star.remove();
        // }, 2000); // Shine for 2 seconds before disappearing
    }

    function popStar(star, message) {
        star.innerText = message;
        star.style.opacity = 0; // Fade out the star
        star.style.transform = 'scale(0)'; // Shrink down the star
        setTimeout(() => {
            star.remove();
            createStar(); // Create a new star after one is popped
        }, 1000); // Remove star after 1 second to allow for fade out animation
    }

    // Commented out the interval that creates stars every 2 seconds
    // setInterval(() => {
    //     createStar();
    // }, 2000);

    const startButton = document.getElementById('start-adventure');
    if (startButton) {
        startButton.addEventListener('click', () => {
            createStar(); // Create the initial star
            const music = document.getElementById('background-music');
            music.volume = 0.2; // Set the volume to 20%
            music.play(); // Start the background music
        });
    }

    // Add click event to bubble-area for delegation
    bubbleArea.addEventListener('click', function(event) {
        if (event.target.classList.contains('star')) {
            const messageIndex = Math.floor(Math.random() * messages.length);
            popStar(event.target, messages[messageIndex]);
        }
    });
});
