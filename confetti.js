document.addEventListener('DOMContentLoaded', function() {
    // Get the heart element
    const heartLink = document.querySelector('.video-link');

    if (!heartLink) return;

    // Create confetti container
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);

    // Function to create a single confetti element
    function createConfettiElement(x, y) {
        const colors = [
            '#ff69b4', '#ff1493', '#E8B4B8',
            '#ffb6c1', '#ffc0cb', '#db7093',
            '#f48fb1', '#f8bbd0'
        ];

        const element = document.createElement('div');
        element.classList.add('confetti');

        // Random properties
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = Math.floor(Math.random() * 3); // 0: circle, 1: square, 2: rectangle

        // Set shape
        if (shape === 0) {
            element.style.borderRadius = '50%';
        } else if (shape === 1) {
            element.style.borderRadius = '0';
            element.style.transform = 'rotate(45deg)';
        } else {
            element.style.width = '6px';
            element.style.height = '12px';
            element.style.borderRadius = '40%';
        }

        // Set styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        element.style.position = 'absolute';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.zIndex = '10000';

        return element;
    }

    // Function to animate confetti
    function animateConfetti(element, startX, startY) {
        // Random movement
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 3;
        let velocityX = Math.cos(angle) * velocity;
        let velocityY = Math.sin(angle) * velocity;

        // Initial position
        let posX = startX;
        let posY = startY;
        let rotation = 0;
        let opacity = 1;

        function updatePosition() {
            // Update position
            posX += velocityX;
            posY += velocityY;
            velocityY += 0.1; // Gravity
            rotation += 3;
            opacity -= 0.01;

            // Apply new position
            element.style.left = `${posX}px`;
            element.style.top = `${posY}px`;
            element.style.transform = `rotate(${rotation}deg)`;
            element.style.opacity = opacity;

            // Continue animation or remove element
            if (opacity > 0) {
                requestAnimationFrame(updatePosition);
            } else {
                element.remove();
            }
        }

        // Start animation
        requestAnimationFrame(updatePosition);
    }

    // Function to create confetti burst
    function createConfettiBurst(event) {
        // Get heart position
        const heartRect = event.currentTarget.getBoundingClientRect();
        const heartCenterX = heartRect.left + heartRect.width / 2;
        const heartCenterY = heartRect.top + heartRect.height / 2;

        // Create multiple confetti pieces
        for (let i = 0; i < 80; i++) {
            const confetti = createConfettiElement(heartCenterX, heartCenterY);
            confettiContainer.appendChild(confetti);
            animateConfetti(confetti, heartCenterX, heartCenterY);
        }
    }

    // Add event listeners
    heartLink.addEventListener('mouseenter', createConfettiBurst);
    heartLink.addEventListener('click', createConfettiBurst);
    heartLink.addEventListener('touchstart', function(e) {
        e.preventDefault();
        createConfettiBurst(e);
    });
});
