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
    const starContainer = document.createElement('div');
    starContainer.style.position = 'absolute';
    const containerSize = 45;
    const startPosX = Math.random() * (window.innerWidth - containerSize);
    const startPosY = Math.random() * (window.innerHeight * 0.5 - containerSize);
    starContainer.style.left = `${startPosX}px`;
    starContainer.style.top = `${startPosY}px`;
    starContainer.style.width = `${containerSize}px`;
    starContainer.style.height = `${containerSize}px`;
    starContainer.style.display = 'flex';
    starContainer.style.alignItems = 'center';
    starContainer.style.justifyContent = 'center';
    bubbleArea.appendChild(starContainer);

    const star = document.createElement('div');
    star.className = 'star';
    starContainer.appendChild(star);

    let elapsed = 0;
    const growthPerUpdate = 2;
    const minSize = 4;
    const colors = ['yellow'];
    let colorIndex = 0;

    const updateStar = () => {
        elapsed += 0.1;
        let currentSize = minSize + growthPerUpdate * (elapsed * 10);
        const cyclePosition = (elapsed % 0.5) / 0.5;
        const dynamicSize = minSize + (currentSize - minSize) * (cyclePosition <= 0.5 ? cyclePosition * 2 : (1 - cyclePosition) * 2);
        star.style.width = `${dynamicSize * (1 - cyclePosition)}px`;
        star.style.height = `${dynamicSize * cyclePosition}px`;
        star.style.backgroundColor = colors[colorIndex];

        if (Math.random() < 0.1) {
            colorIndex = (colorIndex + 1) % colors.length;
            star.style.backgroundColor = colors[colorIndex];
        }
    };

    const updateInterval = setInterval(updateStar, 100);

    setTimeout(() => {
        clearInterval(updateInterval);
        starContainer.remove(); // Ensure the container is removed, not just the star
    }, 3000);

    // Add event listener to the container for popping the star
    starContainer.addEventListener('click', function() {
        const messageIndex = Math.floor(Math.random() * messages.length);
        popStar(starContainer, messages[messageIndex]); // Pass the container to popStar
    });
}


function popStar(star, message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.style.position = 'absolute';
    messageElement.style.left = '50%';
    messageElement.style.top = '20%';
    messageElement.style.transform = 'translate(-50%, -50%)'; // Center the message
    messageElement.style.color = 'white'; // Text color
    messageElement.style.fontSize = '24px'; // Text size
    messageElement.style.zIndex = '1000'; // Ensure it's above other elements
    messageElement.style.textAlign = 'center'; // Center text
    // Apply the animations
    messageElement.style.animation = `fall 5s linear, fadeOut 5s ease-out`;
    bubbleArea.appendChild(messageElement);

    // Remove the message after the animation ends
    setTimeout(() => {
        messageElement.remove();
    }, 5000); // Corresponds to the duration of the animations
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
            music.volume = 0.12; // Set the volume to 12%
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
