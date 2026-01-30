// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("Web Dev Recruitment Platform loaded");
    
    // Get elements
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    const body = document.body;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
        themeLabel.textContent = 'Dark Mode';
    } else {
        themeLabel.textContent = 'Light Mode';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Switch to dark theme
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            themeLabel.textContent = 'Dark Mode';
        } else {
            // Switch to light theme
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            themeLabel.textContent = 'Light Mode';
        }
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Initialize
    console.log("Theme system initialized. Current theme:", savedTheme);
});
