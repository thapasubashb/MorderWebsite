// Smooth scroll function for navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop - 80, // Adjust for fixed header
        behavior: 'smooth'
    });
}

// Contact form submission (for demo purposes, no actual server logic)
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message!');
    document.getElementById('contactForm').reset();
});
