// Typed.js for text animation
var typed = new Typed(".text", {
    strings: ["Backend Developer", "Software Test Engineer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Fixed circular progress bars animation
document.addEventListener('DOMContentLoaded', function () {

    // Function to animate a single progress circle
    function animateProgressCircle(circle, percentage) {
        const radius = 80; // radius from your SVG
        const circumference = 2 * Math.PI * radius;

        // Calculate the correct offset for the given percentage
        const offset = circumference * (1 - percentage / 100);

        // Set initial state (empty circle)
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        // Apply smooth transition
        circle.style.transition = 'stroke-dashoffset 2s ease-in-out';

        // Trigger animation after a short delay
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    }

    // Intersection Observer for triggering animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressCircles = entry.target.querySelectorAll('.path');

                progressCircles.forEach((circle, index) => {
                    // Read the percentage from the data-percentage attribute
                    const percentage = parseInt(circle.getAttribute('data-percentage')) || 0;

                    // Add a delay for staggered animation effect
                    setTimeout(() => {
                        animateProgressCircle(circle, percentage);
                    }, index * 300);
                });

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    // Start observing the skills section
    const skillsSection = document.querySelector('.radial-bars');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});

// Alternative: If you prefer to trigger immediately on page load
// Uncomment the function below and comment out the Intersection Observer above

/*
function animateSkillsOnLoad() {
    const circles = document.querySelectorAll('.path');
    
    circles.forEach((circle, index) => {
        // Read percentage from HTML data attribute instead of hardcoded array
        const percentage = parseInt(circle.getAttribute('data-percentage')) || 0;
        
        setTimeout(() => {
            animateProgressCircle(circle, percentage);
        }, 1000 + (index * 300));
    });
}

// Call the function when page loads
window.addEventListener('load', animateSkillsOnLoad);
*/