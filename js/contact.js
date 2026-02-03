// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log("Contact page loaded");

// Improve select dropdown visibility
const contactSubject = document.getElementById('contact-subject');
if (contactSubject) {
    // Set first option as placeholder style
    contactSubject.addEventListener('focus', function() {
        if (this.value === "") {
            this.style.color = 'var(--text-color)';
            this.style.opacity = '1';
        }
    });
    
    contactSubject.addEventListener('change', function() {
        if (this.value !== "") {
            this.style.color = 'var(--text-color)';
            this.style.opacity = '1';
        } else {
            this.style.color = 'var(--text-color)';
            this.style.opacity = '0.6';
        }
    });
    
    // Initialize on load
    if (contactSubject.value === "") {
        contactSubject.style.color = 'var(--text-color)';
        contactSubject.style.opacity = '0.6';
    }
}

// Add custom dropdown arrow if needed
function enhanceSelectDropdowns() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        // Create wrapper for custom styling
        const wrapper = document.createElement('div');
        wrapper.className = 'select-wrapper';
        wrapper.style.position = 'relative';
        
        // Wrap the select
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
        
        // Add custom arrow
        const arrow = document.createElement('div');
        arrow.className = 'select-arrow';
        arrow.innerHTML = '<i class="fas fa-chevron-down"></i>';
        arrow.style.cssText = `
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-color);
            opacity: 0.6;
            pointer-events: none;
            z-index: 2;
        `;
        wrapper.appendChild(arrow);
    });
}

// Call the function
enhanceSelectDropdowns();
    
    // Initialize contact form
    const contactForm = document.getElementById('contactForm');
    const contactSubmit = document.getElementById('contactSubmit');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateContactForm(data)) {
                return;
            }
            
            // Show loading state
            contactSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            contactSubmit.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showAlert('Thank you for your message! We will get back to you within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                contactSubmit.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                contactSubmit.disabled = false;
                
                // Scroll to top of form
                document.querySelector('.contact-form-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Log form data (for demo purposes)
                console.log('Contact form submitted:', data);
                
            }, 1500);
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Quick contact links
    setupQuickContactLinks();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Validate contact form
function validateContactForm(data) {
    const { name, email, subject, message } = data;
    
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    // Validate name
    if (!name || name.trim().length < 2) {
        showError('contact-name', 'Please enter your full name (minimum 2 characters)');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showError('contact-email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject) {
        showError('contact-subject', 'Please select a subject for your inquiry');
        isValid = false;
    }
    
    // Validate message
    if (!message || message.trim().length < 10) {
        showError('contact-message', 'Please enter a message (minimum 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

// Show error for specific field
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const inputContainer = field.closest('.input-with-icon') || field.closest('.textarea-with-icon');
    
    if (inputContainer) {
        // Add error class
        inputContainer.classList.add('error');
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: var(--accent-color);
            font-size: 0.85rem;
            margin-top: 0.3rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // Insert after input
        inputContainer.parentNode.insertBefore(errorDiv, inputContainer.nextSibling);
    }
}

// Clear all error messages
function clearErrors() {
    // Remove error classes
    document.querySelectorAll('.input-with-icon.error, .textarea-with-icon.error').forEach(el => {
        el.classList.remove('error');
    });
    
    // Remove error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.remove();
    });
}

// Setup quick contact links
function setupQuickContactLinks() {
    // Phone link
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const phoneNumber = link.getAttribute('href').replace('tel:', '');
            showAlert(`Calling ${phoneNumber}...`, 'info');
            // In production: window.location.href = link.getAttribute('href');
        });
    });
    
    // Email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.getAttribute('href').replace('mailto:', '');
            showAlert(`Opening email client to send message to ${email}...`, 'info');
            // In production: window.location.href = link.getAttribute('href');
        });
    });
    
    // Map links
    const mapLinks = document.querySelectorAll('a[href*="maps.google"]');
    mapLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('target') !== '_blank') {
                e.preventDefault();
                showAlert('Opening Google Maps with our location...', 'info');
                // In production: window.open(link.getAttribute('href'), '_blank');
            }
        });
    });
}

// Alert function
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.contact-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `contact-alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="alert-close">&times;</button>
    `;
    
    // Add to page
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.insertBefore(alert, contactForm.firstChild);
        alert.classList.add('show');
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

// Add these styles to your CSS if not already present
const contactStyles = `
.input-with-icon.error input,
.input-with-icon.error select,
.textarea-with-icon.error textarea {
    border-color: var(--accent-color) !important;
}

.input-with-icon.error i,
.textarea-with-icon.error i {
    color: var(--accent-color) !important;
}

.error-message {
    color: var(--accent-color) !important;
    font-size: 0.85rem !important;
    margin-top: 0.3rem !important;
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
}
`;

// Add the styles to the document
if (!document.querySelector('#contact-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'contact-styles';
    styleElement.textContent = contactStyles;
    document.head.appendChild(styleElement);
}
