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
    // Set the initial position of the star
    star.style.position = 'absolute';
    const startPosX = Math.random() * window.innerWidth;
    const startPosY = Math.random() * (window.innerHeight * 0.5);
    star.style.left = `${startPosX}px`;
    star.style.top = `${startPosY}px`;
    bubbleArea.appendChild(star);

    let elapsed = 0; // Track the elapsed time in seconds
    // Adjusting the growth rate for more frequent updates
    const growthPerUpdate = 1.5; // Max size increases by 1.5px per 0.1 second
    const minSize = 5; // Minimum size of the star
    const colors = ['yellow', 'white', 'lightblue']; // Possible colors
    let colorIndex = Math.floor(Math.random() * colors.length); // Start with a random color

    const updateStar = () => {
        elapsed += 0.1; // Update every 0.1 seconds
        let currentSize = minSize + growthPerUpdate * (elapsed * 10); // Calculate current size based on elapsed time

// Oscillate size between minSize and currentSize every 0.1 seconds
const cyclePosition = (elapsed % 0.5) / 0.5;
const dynamicSize = minSize + (currentSize - minSize) * (cyclePosition <= 0.5 ? cyclePosition * 2 : (1 - cyclePosition) * 2);

// Apply the inverse relationship for width and height oscillation
star.style.width = `${dynamicSize * (1 - cyclePosition)}px`; // Decrease width as cyclePosition increases
star.style.height = `${dynamicSize * cyclePosition}px`; // Increase height as cyclePosition increases

// Calculate the new position to keep the star centered
const newPositionX = startPosX - (dynamicSize * (1 - cyclePosition)) / 2; // Adjust for dynamicSize
const newPositionY = startPosY - (dynamicSize * cyclePosition) / 2; // Adjust for dynamicSize

// Set the new position
star.style.left = `${newPositionX}px`;
star.style.top = `${newPositionY}px`;


        // Randomly change color
        if (Math.random() < 0.1) {
            colorIndex = (colorIndex + 1) % colors.length;
            star.style.backgroundColor = colors[colorIndex];
        }
    };

    // Start updating the star
    const updateInterval = setInterval(updateStar, 100);

    // After 3 seconds, stop updating and remove the star
    setTimeout(() => {
        clearInterval(updateInterval);
        star.remove();
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
