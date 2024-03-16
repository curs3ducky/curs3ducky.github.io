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
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${startPos}px`;
    star.style.position = 'absolute';
    bubbleArea.appendChild(star);

    let elapsed = 0; // Track the elapsed time in seconds
    const growthPerSecond = 15; // Max size increases by 15px per second
    const minSize = 5; // Minimum size of the star
    let maxSize = minSize; // Initial max size of the star
    const colors = ['yellow', 'white', 'lightblue']; // Possible colors
    let colorIndex = 0; // Initial color index

    const updateStar = () => {
        elapsed += 0.5; // Update every half second
        maxSize = minSize + growthPerSecond * elapsed; // Update max size based on elapsed time

        const cyclePosition = elapsed % 1; // Cycle position between 0 and 1 over 1 second
        const widthPercentage = cyclePosition <= 0.5 ? cyclePosition * 2 : (1 - cyclePosition) * 2;
        const heightPercentage = 1 - widthPercentage;

        star.style.width = `${minSize + (maxSize - minSize) * widthPercentage}px`;
        star.style.height = `${minSize + (maxSize - minSize) * heightPercentage}px`;
        star.style.backgroundColor = colors[colorIndex];
        star.style.opacity = Math.random().toString();

        // Centering might need adjustment based on new logic
        star.style.left = `calc(${startPos}px - ${star.style.width} / 2)`;
        star.style.top = `calc(${startPos}px - ${star.style.height} / 2)`;

        // 50% chance to change color with each update
        if (Math.random() < 0.5) {
            colorIndex = (colorIndex + 1) % colors.length;
        }
    };

    // Update the star every 0.5 seconds
    const updateInterval = setInterval(updateStar, 500);

    // After 4 seconds, stop updating and remove the star
    setTimeout(() => {
        clearInterval(updateInterval);
        star.remove();
        createStar(); // Create a new star
    }, 4000);
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
