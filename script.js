document.addEventListener('DOMContentLoaded', () => {
    const bubbleArea = document.getElementById('bubble-area');
    const messages = [
        "1/10. Your existance <br>makes people happy.",
        "2/10. You are precious <br>& loved.",
        "3/10. You are generous <br>& loving.",
        "4/10. You are curious <br>& interesting.",
        "5/10. You are artistic <br>& creative.",
        "6/10. You are fun <br>& a good friend.",
        "7/10. You are kind <br>& sweet.",
        "8/10. You are loyal <br>& thoughtful.",
        "9/10. You are resilient <br>& try again.",
        "10/10. Many people <br>believe in you."
    ];
    let starCreationInterval;

    function createStar() {
        const starContainer = document.createElement('div');
        starContainer.style.position = 'absolute';
        const containerSize = 45; // Maximum size of the star for the container
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
            starContainer.remove(); // Correctly ensures the container is removed, not just the star
        }, 3000);

        starContainer.addEventListener('click', function() {
            const messageIndex = Math.floor(Math.random() * messages.length);
            popStar(this, messages[messageIndex]);
        });
    }

    function popStar(starContainer, message) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = message; // Use innerHTML to interpret <br> tags
        messageElement.style.position = 'absolute';
        messageElement.style.left = '50%';
        messageElement.style.top = '50%';
        messageElement.style.transform = 'translate(-50%, -50%)';
        messageElement.style.color = 'white';
        messageElement.style.fontSize = '24px';
        messageElement.style.zIndex = '1000';
        messageElement.style.textAlign = 'center';
        messageElement.style.animation = 'fall 5s linear, fadeOut 5s ease-out';
        bubbleArea.appendChild(messageElement);

        starContainer.remove(); // Immediately remove the star container upon click

        setTimeout(() => {
            messageElement.remove();
        }, 5000); // Remove the message after the animation ends
    }

    const startButton = document.getElementById('start-adventure');
    if (startButton) {
        startButton.addEventListener('click', () => {
            if (!starCreationInterval) {
                createStar(); // Create the first star immediately
                starCreationInterval = setInterval(createStar, 3000); // Then create stars every 3 seconds
            }
            const music = document.getElementById('background-music');
            music.volume = 0.12; // Set the volume to 12%
            music.play(); // Start playing the background music
            startButton.style.display = 'none'; // Hide the start button after it's clicked
        });
    }
});
