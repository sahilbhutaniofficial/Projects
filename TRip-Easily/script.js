// script.js

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Toggle navigation menu on mobile devices
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Close navigation menu when a link is clicked (on mobile)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });
});