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
    star.style.opacity = '1'; // Ensure visibility for testing
    bubbleArea.appendChild(star);

    // Initialize star dimensions
    star.style.width = '0px';
    star.style.height = '0px';

    let growing = true; // Flag to track growth/shrink

    // Function to update star dimensions
    function updateStarSize() {
        const maxSize = 45; // Maximum size of width/height
        let size = parseInt(star.style.width, 10); // Current size

        if (growing) {
            size += 5; // Increment size
            if (size >= maxSize) {
                growing = false; // Start shrinking once max size is reached
            }
        } else {
            size -= 5; // Decrement size
            if (size <= 0) {
                growing = true; // Start growing once min size is reached
            }
        }

        // Update dimensions to stretch in alternate directions
        if (growing) {
            star.style.width = `${size}px`;
            star.style.height = `${maxSize - size}px`;
        } else {
            star.style.width = `${maxSize - size}px`;
            star.style.height = `${size}px`;
        }
    }

    // Update star size twice a second
    const sizeInterval = setInterval(updateStarSize, 500);

    // Remove the star and clear the interval after 3 seconds
    setTimeout(() => {
        clearInterval(sizeInterval);
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
