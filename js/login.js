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
                    showAlert('Login successful! Welcome back.', 'success');
                    
                    // Store login state (demo) but don't redirect
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userRole', getRoleFromEmail(email));
                    
                    // Reset form
                    loginForm.reset();
                    
                    // Update UI to show logged-in state
                    updateUIForLoggedInUser(email);
                    
                } else {
                    showAlert('Invalid email or password. Please try again.', 'error');
                }
                
                // Reset button state
                loginSubmit.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
                loginSubmit.disabled = false;
                
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
    
    // Check if already logged in and update UI
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const userEmail = localStorage.getItem('userEmail');
        updateUIForLoggedInUser(userEmail);
    }
    
    // Helper function to get role from email
    function getRoleFromEmail(email) {
        if (email.includes('admin')) return 'Administrator';
        if (email.includes('instructor')) return 'Instructor';
        if (email.includes('student')) return 'Student';
        return 'User';
    }
    
    // Update UI for logged-in user
    function updateUIForLoggedInUser(email) {
        const role = getRoleFromEmail(email);
        const welcomeMessage = `Welcome back, ${email.split('@')[0]}! (${role})`;
        
        // Update page title
        document.title = `Web Dev Recruitment - Welcome ${email.split('@')[0]}`;
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle) {
            heroTitle.textContent = 'Welcome Back!';
        }
        
        if (heroSubtitle) {
            heroSubtitle.textContent = welcomeMessage;
        }
        
        // Update login card to show logged-in state
        const loginCard = document.querySelector('.login-card');
        if (loginCard) {
            const loginHeader = document.querySelector('.login-header');
            if (loginHeader) {
                loginHeader.innerHTML = `
                    <h2 class="login-title">You're Logged In</h2>
                    <p class="login-subtitle">${welcomeMessage}</p>
                `;
            }
            
            // Hide form and show logout option
            const loginForm = document.getElementById('loginForm');
            const socialLogin = document.querySelector('.social-login');
            const divider = document.querySelector('.divider');
            const demoNotice = document.querySelector('.demo-notice');
            
            if (loginForm) loginForm.style.display = 'none';
            if (socialLogin) socialLogin.style.display = 'none';
            if (divider) divider.style.display = 'none';
            
            // Create logout section
            const logoutSection = document.createElement('div');
            logoutSection.className = 'logout-section';
            logoutSection.innerHTML = `
                <div class="logout-content">
                    <div class="logout-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Successfully Logged In</h3>
                    <p>You are now logged in as <strong>${email}</strong></p>
                    <p class="user-role">Role: <span>${role}</span></p>
                    <button class="logout-btn" id="logoutBtn">
                        <i class="fas fa-sign-out-alt"></i>
                        Log Out
                    </button>
                    <button class="continue-btn" id="continueBtn">
                        <i class="fas fa-home"></i>
                        Return to Home
                    </button>
                </div>
            `;
            
            // Insert after login header
            loginHeader.insertAdjacentElement('afterend', logoutSection);
            
            // Add logout functionality
            document.getElementById('logoutBtn').addEventListener('click', logout);
            
            // Add continue to home functionality
            document.getElementById('continueBtn').addEventListener('click', () => {
                window.location.href = 'index.html';
            });
            
            // Update signup link to show different message
            const signupLinkDiv = document.querySelector('.signup-link');
            if (signupLinkDiv) {
                signupLinkDiv.innerHTML = `
                    <p>Need to switch accounts? <a href="#" id="switchAccount">Switch Account</a></p>
                `;
                
                document.getElementById('switchAccount').addEventListener('click', (e) => {
                    e.preventDefault();
                    logout();
                });
            }
            
            // Hide demo notice
            if (demoNotice) demoNotice.style.display = 'none';
        }
        
        // Add CSS for logout section
        addLogoutStyles();
    }
    
    // Logout function
    function logout() {
        // Clear login state
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        
        // Show logout message
        showAlert('You have been logged out successfully.', 'info');
        
        // Reload page to reset UI
        setTimeout(() => {
            location.reload();
        }, 1500);
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
        const loginCard = document.querySelector('.login-card');
        if (loginCard) {
            loginCard.insertBefore(alert, loginCard.firstChild);
        }
        
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
    
    // Add CSS for logout section
    function addLogoutStyles() {
        const styles = `
        .logout-section {
            text-align: center;
            padding: 2rem 0;
        }
        
        .logout-content {
            background: rgba(52, 152, 219, 0.05);
            border-radius: 12px;
            padding: 2.5rem;
            border: 2px solid rgba(52, 152, 219, 0.1);
        }
        
        .logout-icon {
            width: 80px;
            height: 80px;
            background: rgba(46, 204, 113, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: #2ecc71;
            font-size: 2.5rem;
        }
        
        .logout-content h3 {
            color: var(--primary-color);
            font-size: 1.5rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        
        .logout-content p {
            color: var(--text-color);
            margin-bottom: 0.5rem;
            font-size: 1rem;
            line-height: 1.5;
        }
        
        .user-role {
            background: rgba(52, 152, 219, 0.1);
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            display: inline-block;
            margin: 1rem auto;
            font-weight: 500;
        }
        
        .user-role span {
            color: var(--secondary-color);
            font-weight: 600;
        }
        
        .logout-btn, .continue-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 1rem;
            margin: 0.5rem;
            border: none;
            min-width: 180px;
        }
        
        .logout-btn {
            background: rgba(231, 76, 60, 0.1);
            color: #e74c3c;
            border: 2px solid rgba(231, 76, 60, 0.2);
        }
        
        .logout-btn:hover {
            background: #e74c3c;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
        }
        
        .continue-btn {
            background: rgba(52, 152, 219, 0.1);
            color: var(--secondary-color);
            border: 2px solid rgba(52, 152, 219, 0.2);
        }
        
        .continue-btn:hover {
            background: var(--secondary-color);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
        }
        
        @media (max-width: 768px) {
            .logout-btn, .continue-btn {
                width: 100%;
                margin: 0.5rem 0;
            }
        }
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#logout-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'logout-styles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        }
    }
});
