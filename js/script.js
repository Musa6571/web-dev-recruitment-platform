// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("Web Dev Recruitment Platform loaded");
    
    // Get elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('site-logo');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
        updateLogo('dark');
    } else {
        updateLogo('light');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Switch to dark theme
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateLogo('dark');
        } else {
            // Switch to light theme
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            updateLogo('light');
        }
    });
    
    // Function to update logo based on theme
    function updateLogo(theme) {
        if (theme === 'dark') {
            logo.src = 'images/logo-light.jpg';
            logo.alt = 'WebDevRecruit Logo - Dark Theme';
        } else {
            logo.src = 'images/logo-dark.jpg';
            logo.alt = 'WebDevRecruit Logo - Light Theme';
        }
    }
    
    // Simple navigation toggle (placeholder for future functionality)
    function toggleMenu() {
        console.log("Menu toggle would work here");
    }
    
    // Initialize
    console.log("Theme system initialized. Current theme:", savedTheme);
});
