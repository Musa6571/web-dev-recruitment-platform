// Login Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log("Login page loaded");
    
    // Password visibility toggle
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const eyeIcon = this.querySelector('i');
            if (type === 'text') {
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });
    }
    
    // Form submission handling
    const loginForm = document.getElementById('loginForm');
    const loginSubmit = document.getElementById('loginSubmit');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!email || !password) {
                showAlert('Please fill in all required fields', 'error');
                return;
            }
            
            // Show loading state
            loginSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            loginSubmit.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Demo login validation
                const demoAccounts = {
                    'student@demo.com': 'password123',
                    'instructor@demo.com': 'password123',
                    'admin@demo.com': 'password123'
                };
                
                if (demoAccounts[email] && password === demoAccounts[email]) {
                    showAlert('Login successful! Redirecting to dashboard...', 'success');
                    
                    // Store login state (demo)
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    
                    // Redirect after delay
                    setTimeout(() => {
                        window.location.href = 'dashboard.html'; // You'll need to create this page
                    }, 1500);
                } else {
                    showAlert('Invalid email or password. Please try again.', 'error');
                    loginSubmit.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
                    loginSubmit.disabled = false;
                }
            }, 1500);
        });
    }
    
    // Social login buttons
    const googleLogin = document.getElementById('googleLogin');
    const microsoftLogin = document.getElementById('microsoftLogin');
    
    if (googleLogin) {
        googleLogin.addEventListener('click', function() {
            showAlert('Google login would be implemented with OAuth. This is a demo.', 'info');
            // In production: window.location.href = '/auth/google';
        });
    }
    
    if (microsoftLogin) {
        microsoftLogin.addEventListener('click', function() {
            showAlert('Microsoft login would be implemented with OAuth. This is a demo.', 'info');
            // In production: window.location.href = '/auth/microsoft';
        });
    }
    
    // Sign up link
    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('Sign up page would be created separately. This is a demo.', 'info');
            // In production: window.location.href = 'signup.html';
        });
    }
    
    // Alert function
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert-message');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert-message alert-${type}`;
        alert.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="alert-close">&times;</button>
        `;
        
        // Add to page
        document.querySelector('.login-card').insertBefore(alert, document.querySelector('.login-form'));
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.opacity = '0';
                alert.style.transform = 'translateY(-10px)';
                setTimeout(() => alert.remove(), 300);
            }
        }, 5000);
        
        // Close button
        alert.querySelector('.alert-close').addEventListener('click', () => {
            alert.remove();
        });
    }
    
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showAlert('You are already logged in. Redirecting to dashboard...', 'info');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }
});
