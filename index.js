document.addEventListener('DOMContentLoaded', function() {
    const slideButton = document.getElementById('slideButton');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');
    const firstScreen = document.getElementById('firstScreen');
    const secondScreen = document.getElementById('secondScreen');
    const thirdScreen = document.getElementById('thirdScreen');
    
    // Love presentation elements
    const imageContainer = document.querySelector('.image-container');
    const textContainer = document.querySelector('.text-container');
    const loveTitle = document.getElementById('loveTitle');
    const loveMessage = document.getElementById('loveMessage');
    const loveQuote = document.getElementById('loveQuote');
    const heartConfettiContainer = document.getElementById('heartConfettiContainer');

    // Images for confetti (you can add more image URLs here)
    const confettiImages = [
        'us2.png',
        'us3.png',
        'us4.png',
        'us5.png',
        'us6.png',
        'us7.png',
        'us8.png',
    ];

    // Function to slide up to second screen
    function slideToSecondScreen() {
        firstScreen.classList.add('slide-up');
        secondScreen.classList.add('active');
        
        // Start love presentation animations after slide transition
        setTimeout(() => {
            startLovePresentation();
        }, 800); // Wait for slide transition to complete
    }

    // Function to fade to third screen
    function fadeToThirdScreen() {
        secondScreen.classList.add('fade-out');
        thirdScreen.classList.add('active');
    }

    // Function to go back to first screen
    function goBackToFirst() {
        // Reset all animations
        resetLovePresentation();
        
        firstScreen.classList.remove('slide-up');
        secondScreen.classList.remove('active', 'fade-out');
        thirdScreen.classList.remove('active');
    }

    // Function to create image confetti
    function createImageConfetti() {
        const imageElement = document.createElement('img');
        imageElement.className = 'heart-confetti';
        imageElement.src = confettiImages[Math.floor(Math.random() * confettiImages.length)];
        imageElement.alt = 'Confetti';
        
        // Random position across the width
        imageElement.style.left = Math.random() * 100 + '%';
        
        // Random size between 30px and 60px
        const size = 30 + Math.random() * 30;
        imageElement.style.width = size + 'px';
        imageElement.style.height = size + 'px';
        
        // Random animation duration between 4-8 seconds
        const duration = 4 + Math.random() * 4;
        imageElement.style.animationDuration = duration + 's';
        
        // Random delay
        imageElement.style.animationDelay = Math.random() * 2 + 's';
        
        // Random rotation
        const rotation = Math.random() * 360;
        imageElement.style.transform = `rotate(${rotation}deg)`;
        
        heartConfettiContainer.appendChild(imageElement);
        
        // Remove image after animation completes
        setTimeout(() => {
            if (imageElement.parentNode) {
                imageElement.parentNode.removeChild(imageElement);
            }
        }, (duration + 2) * 1000);
    }

    // Function to start image confetti
    function startImageConfetti() {
        // Create images continuously for 15 seconds
        const confettiInterval = setInterval(createImageConfetti, 300);
        
        // Stop creating new images after 15 seconds
        setTimeout(() => {
            clearInterval(confettiInterval);
        }, 15000);
    }

    // Function to start love presentation animations
    function startLovePresentation() {
        // Image pops up slowly
        imageContainer.classList.add('show');
        
        // Text animations with staggered timing
        setTimeout(() => {
            textContainer.classList.add('show');
        }, 500);
        
        // Start typing animations with proper delays
        setTimeout(() => {
            loveTitle.classList.add('show');
        }, 1000);
        
        setTimeout(() => {
            loveMessage.classList.add('show');
        }, 3000); // Wait for title to finish typing
        
        setTimeout(() => {
            loveQuote.classList.add('show');
        }, 6000); // Wait for message to finish typing
        
        // Start image confetti after all text animations
        setTimeout(() => {
            startImageConfetti();
        }, 8500); // Wait for quote to finish typing
    }

    // Function to reset love presentation animations
    function resetLovePresentation() {
        imageContainer.classList.remove('show');
        textContainer.classList.remove('show');
        loveTitle.classList.remove('show');
        loveMessage.classList.remove('show');
        loveQuote.classList.remove('show');
        
        // Clear all image confetti
        heartConfettiContainer.innerHTML = '';
    }

    // Event listeners
    slideButton.addEventListener('click', slideToSecondScreen);
    nextButton.addEventListener('click', fadeToThirdScreen);
    backButton.addEventListener('click', goBackToFirst);

    // Optional: Add keyboard support (Escape key to go back)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (thirdScreen.classList.contains('active')) {
                goBackToFirst();
            } else if (secondScreen.classList.contains('active')) {
                goBackToFirst();
            }
        }
    });

    // Optional: Add touch/swipe support for mobile
    let startY = 0;
    let currentY = 0;

    document.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
    });

    document.addEventListener('touchmove', function(event) {
        currentY = event.touches[0].clientY;
    });

    document.addEventListener('touchend', function(event) {
        const diffY = startY - currentY;
        
        // Swipe up to go to second screen (if on first screen)
        if (diffY > 50 && !secondScreen.classList.contains('active') && !thirdScreen.classList.contains('active')) {
            slideToSecondScreen();
        }
        
        // Swipe down to go back to first screen (if on second or third screen)
        if (diffY < -50 && (secondScreen.classList.contains('active') || thirdScreen.classList.contains('active'))) {
            goBackToFirst();
        }
    });
});
