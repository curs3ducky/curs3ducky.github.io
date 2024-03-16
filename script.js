document.addEventListener('DOMContentLoaded', () => {
    const bubbleArea = document.getElementById('bubble-area');
    // Define your 10 specific messages here
    const messages = [
        "Message 1",
        "Message 2",
        "Message 3",
        "Message 4",
        "Message 5",
        "Message 6",
        "Message 7",
        "Message 8",
        "Message 9",
        "Message 10"
    ];
    let starCreationInterval;

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    const startPos = Math.random() * (window.innerHeight * 0.5);
    star.style.position = 'absolute';
    bubbleArea.appendChild(star);

    // Initial size and position
    const initialSize = 5; // Starting with a minimum size
    star.style.width = `${initialSize}px`;
    star.style.height = `${initialSize}px`;
    star.style.left = `${Math.random() * (window.innerWidth - initialSize)}px`;
    star.style.top = `${startPos}px`;

    let elapsed = 0; // Track the elapsed time in seconds
    const growthPerSecond = 15; // Max size increases by 15px per second
    const colors = ['yellow', 'white', 'lightblue']; // Possible colors
    let colorIndex = Math.floor(Math.random() * colors.length); // Start with a random color

    const updateStar = () => {
        elapsed += 0.1; // Update every 0.1 seconds
        let currentMaxSize = initialSize + growthPerSecond * elapsed; // Calculate current max size based on elapsed time

        // Determine the current phase of the cycle (0 to 1, then back to 0) over 0.5 seconds
        const cyclePosition = (elapsed % 0.5) * 2;
        const dimension = initialSize + (currentMaxSize - initialSize) * (cyclePosition <= 0.5 ? cyclePosition * 2 : (1 - cyclePosition) * 2);

        star.style.width = `${dimension}px`;
        star.style.height = `${dimension}px`; // Keep width and height the same for a pulse effect
        star.style.backgroundColor = colors[colorIndex];
        star.style.opacity = (0.5 + 0.5 * Math.random()).toString();

        // Center the star based on its current size
        star.style.left = `calc(50% - ${dimension / 2}px)`;
        star.style.top = `calc(50% - ${dimension / 2}px)`;

        // Randomly change color
        if (Math.random() < 0.1) {
            colorIndex = (colorIndex + 1) % colors.length;
            star.style.backgroundColor = colors[colorIndex];
        }
    };

    // Update the star every 0.1 seconds for smoother transitions
    const updateInterval = setInterval(updateStar, 100);

    // After 3 seconds, stop updating and remove the star
    setTimeout(() => {
        clearInterval(updateInterval);
        star.remove();
        // Optionally create a new star here if you want continuous generation
    }, 3000);
}


    function popStar(star, message) {
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageElement.style.position = 'absolute';
        messageElement.style.left = star.style.left;
        messageElement.style.top = star.style.top;
        messageElement.style.color = 'white'; // Choose an appropriate text color
        messageElement.style.fontSize = '24px'; // Larger text size
        messageElement.style.zIndex = '1000'; // Ensure it's above other elements
        bubbleArea.appendChild(messageElement);

        star.remove(); // Remove the star immediately

        setTimeout(() => {
            messageElement.remove();
        }, 5000); // Message disappears after 5 seconds for longer visibility
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
