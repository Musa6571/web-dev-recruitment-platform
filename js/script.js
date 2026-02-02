// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("Web Dev Recruitment Platform loaded");
    
                // Course Category Tabs - SCROLL ONLY VERSION
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                const category = tab.getAttribute('data-category');
                
                // Scroll to appropriate section with smooth behavior
                if (category === 'beginner') {
                    document.getElementById('beginner-courses').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else if (category === 'intermediate') {
                    document.getElementById('intermediate-courses').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else if (category === 'advanced') {
                    document.getElementById('advanced-courses').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

        // Update active tab on scroll
    const courseSections = [
        { id: 'beginner-courses', category: 'beginner' },
        { id: 'intermediate-courses', category: 'intermediate' },
        { id: 'advanced-courses', category: 'advanced' }
    ];
    
    function updateActiveTabOnScroll() {
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        for (const section of courseSections) {
            const element = document.getElementById(section.id);
            if (element) {
                const top = element.offsetTop;
                const bottom = top + element.offsetHeight;
                
                if (scrollPosition >= top && scrollPosition < bottom) {
                    categoryTabs.forEach(tab => {
                        tab.classList.remove('active');
                        if (tab.getAttribute('data-category') === section.category) {
                            tab.classList.add('active');
                        }
                    });
                    break;
                }
            }
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', updateActiveTabOnScroll);
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
    
    // Theme toggle event listener - FIXED
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
    
    // AI Helper Functionality
    const aiHelperBtn = document.getElementById('aiHelperBtn');
    const aiHelperPanel = document.getElementById('aiHelperPanel');
    const aiOptions = document.querySelectorAll('.ai-option');
    const aiChat = document.getElementById('aiChat');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');
    
    // Show/hide AI panel on hover
    aiHelperBtn.addEventListener('mouseenter', () => {
        aiHelperPanel.style.opacity = '1';
        aiHelperPanel.style.visibility = 'visible';
        aiHelperPanel.style.transform = 'translateY(0)';
    });
    
    aiHelperPanel.addEventListener('mouseleave', () => {
        aiHelperPanel.style.opacity = '0';
        aiHelperPanel.style.visibility = 'hidden';
        aiHelperPanel.style.transform = 'translateY(20px)';
    });
    
    // Also show panel when clicking the button
    aiHelperBtn.addEventListener('click', () => {
        if (aiHelperPanel.style.opacity === '1') {
            aiHelperPanel.style.opacity = '0';
            aiHelperPanel.style.visibility = 'hidden';
            aiHelperPanel.style.transform = 'translateY(20px)';
        } else {
            aiHelperPanel.style.opacity = '1';
            aiHelperPanel.style.visibility = 'visible';
            aiHelperPanel.style.transform = 'translateY(0)';
            aiInput.focus();
        }
    });
    
    // AI responses database
    const aiResponses = {
        "How do I apply?": "You can apply by visiting our Apply page and filling out the online application form. Make sure to upload your CV and include a personal statement about why you want to join our team.",
        "What courses are available?": "We offer several courses including Web Development Basics, Advanced Python, React and Frontend Development, and DevOps for Web Development. Visit our Courses page for more details.",
        "What skills are required?": "We look for developers with skills in HTML, CSS, JavaScript, and at least one backend language. Familiarity with frameworks like React or Vue.js is a plus. Most importantly, we value passion and willingness to learn.",
        "Contact information": "You can contact us through our Contact page. Our office is located at 1450 Front Street, London, Essex. Phone: (0)7459 898801, Email: webdevelopmentrs@recruitmentsolutions.co.uk",
        "What is the hiring process?": "Our process includes: 1) Online application, 2) Initial screening, 3) Technical assessment, 4) Interview, 5) Final decision. The entire process takes about 2-3 weeks.",
        "Do you offer internships?": "Yes! We offer 3-6 month internships for students and recent graduates. Check the Apply page for current opportunities.",
        "What is the work culture like?": "We have a collaborative, learning-focused culture with regular team events, training sessions, and opportunities for career growth. Work-life balance is important to us.",
        "What technologies do you use?": "We use modern technologies including React, Node.js, Python, Docker, AWS, and various databases. We're always exploring new tools and frameworks.",
        "How long is the training?": "Our training programs typically last 3-6 months, depending on the course. We offer both full-time and part-time options.",
        "Is remote work available?": "Yes, we offer hybrid and remote work options for many positions after the initial training period."
    };
    
    // Add message to chat
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender}`;
        messageDiv.style.padding = '8px 12px';
        messageDiv.style.marginBottom = '10px';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.maxWidth = '80%';
        
        if (sender === 'user') {
            messageDiv.style.backgroundColor = 'var(--ai-color)';
            messageDiv.style.color = 'white';
            messageDiv.style.marginLeft = 'auto';
            messageDiv.innerHTML = `<strong>You:</strong> ${message}`;
        } else {
            messageDiv.style.backgroundColor = 'var(--card-bg)';
            messageDiv.style.color = 'var(--text-color)';
            messageDiv.style.border = '1px solid var(--border-color)';
            messageDiv.style.marginRight = 'auto';
            messageDiv.innerHTML = `<strong>AI Assistant:</strong> ${message}`;
        }
        
        aiChat.appendChild(messageDiv);
        aiChat.scrollTop = aiChat.scrollHeight;
    }
    
    // Initialize chat with welcome message
    addMessage('ai', 'Hello! I\'m your AI assistant. How can I help you today? You can ask about applying, courses, required skills, or contact information.');
    
    // Handle AI option clicks
    aiOptions.forEach(option => {
        option.addEventListener('click', () => {
            const question = option.getAttribute('data-question');
            addMessage('user', question);
            
            // Simulate AI thinking
            setTimeout(() => {
                const response = aiResponses[question] || "I'm not sure about that. Please contact our team directly for more information.";
                addMessage('ai', response);
            }, 500);
        });
    });
    
    // Handle manual input - FIXED
    function sendMessage() {
        const message = aiInput.value.trim();
        if (message) {
            addMessage('user', message);
            aiInput.value = '';
            
            // Find best match or default response
            setTimeout(() => {
                let bestMatch = null;
                let bestScore = 0;
                
                // Convert message to lowercase for comparison
                const messageLower = message.toLowerCase();
                
                // Check for keywords first
                const keywords = {
                    'apply': 'How do I apply?',
                    'application': 'How do I apply?',
                    'courses': 'What courses are available?',
                    'skills': 'What skills are required?',
                    'contact': 'Contact information',
                    'email': 'Contact information',
                    'phone': 'Contact information',
                    'hiring': 'What is the hiring process?',
                    'internship': 'Do you offer internships?',
                    'culture': 'What is the work culture like?',
                    'technologies': 'What technologies do you use?',
                    'tech': 'What technologies do you use?',
                    'training': 'How long is the training?',
                    'remote': 'Is remote work available?',
                    'work from home': 'Is remote work available?'
                };
                
                // Check for keyword matches
                for (const [keyword, responseKey] of Object.entries(keywords)) {
                    if (messageLower.includes(keyword)) {
                        bestMatch = responseKey;
                        break;
                    }
                }
                
                // If no keyword match, do similarity check
                if (!bestMatch) {
                    Object.keys(aiResponses).forEach(key => {
                        const score = similarity(messageLower, key.toLowerCase());
                        if (score > bestScore && score > 0.3) {
                            bestScore = score;
                            bestMatch = key;
                        }
                    });
                }
                
                const response = bestMatch ? aiResponses[bestMatch] : 
                    "I'm not sure about that. You can try asking about: applying, courses, required skills, or contact information. Or visit our Contact page for direct assistance.";
                addMessage('ai', response);
            }, 800);
        }
    }
    
    // Event listeners for sending messages - FIXED
    aiSend.addEventListener('click', sendMessage);
    aiInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission if any
            sendMessage();
        }
    });
    
    // Simple text similarity function - COMPLETED
    function similarity(s1, s2) {
        // Simple check for common words
        const words1 = s1.split(' ');
        const words2 = s2.split(' ');
        
        let commonWords = 0;
        for (const word1 of words1) {
            if (word1.length > 3 && words2.includes(word1)) {
                commonWords++;
            }
        }
        
        return commonWords / Math.max(words1.length, words2.length);
    }
    
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
    // Video Play Functionality
    const videoPlayer = document.querySelector('.company-video-player');
    const playButton = document.querySelector('.play-button');
    const videoOverlay = document.querySelector('.video-overlay');
    
    if (playButton && videoPlayer) {
        playButton.addEventListener('click', () => {
            videoPlayer.play();
            videoOverlay.style.opacity = '0';
            videoOverlay.style.pointerEvents = 'none';
        });
        
        videoPlayer.addEventListener('pause', () => {
            videoOverlay.style.opacity = '1';
            videoOverlay.style.pointerEvents = 'auto';
        });
        
        videoPlayer.addEventListener('ended', () => {
            videoOverlay.style.opacity = '1';
            videoOverlay.style.pointerEvents = 'auto';
        });
    }
