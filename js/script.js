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
    
    // AI responses database
    const aiResponses = {
        "How do I apply?": "You can apply by visiting our Apply page and filling out the online application form. Make sure to upload your CV and include a personal statement about why you want to join our team.",
        "What courses are available?": "We offer several courses including Web Development Basics, Advanced Python, React and Frontend Development, and DevOps for Web Development. Visit our Courses page for more details.",
        "What skills are required?": "We look for developers with skills in HTML, CSS, JavaScript, and at least one backend language. Familiarity with frameworks like React or Vue.js is a plus. Most importantly, we value passion and willingness to learn.",
        "Contact information": "You can contact us through our Contact page. Our office is located at 1450 Front Street, London, Essex. Phone: (0)7459 898801, Email: webdevelopmentrs@recruitmentsolutions.co.uk",
        "What is the hiring process?": "Our process includes: 1) Online application, 2) Initial screening, 3) Technical assessment, 4) Interview, 5) Final decision. The entire process takes about 2-3 weeks.",
        "Do you offer internships?": "Yes! We offer 3-6 month internships for students and recent graduates. Check the Apply page for current opportunities.",
        "What is the work culture like?": "We have a collaborative, learning-focused culture with regular team events, training sessions, and opportunities for career growth. Work-life balance is important to us.",
        "What technologies do you use?": "We use modern technologies including React, Node.js, Python, Docker, AWS, and various databases. We're always exploring new tools and frameworks."
    };
    
    // Add message to chat
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender}`;
        messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You' : 'AI Assistant'}:</strong> ${message}`;
        aiChat.appendChild(messageDiv);
        aiChat.scrollTop = aiChat.scrollHeight;
    }
    
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
    
    // Handle manual input
    aiSend.addEventListener('click', sendMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    function sendMessage() {
        const message = aiInput.value.trim();
        if (message) {
            addMessage('user', message);
            aiInput.value = '';
            
            // Find best match or default response
            setTimeout(() => {
                let bestMatch = null;
                let bestScore = 0;
                
                Object.keys(aiResponses).forEach(key => {
                    const score = similarity(message.toLowerCase(), key.toLowerCase());
                    if (score > bestScore && score > 0.3) {
                        bestScore = score;
                        bestMatch = key;
                    }
                });
                
                const response = bestMatch ? aiResponses[bestMatch] : 
                    "I'm not sure about that. You can try asking about: applying, courses, required skills, or contact information. Or visit our Contact page for direct assistance.";
                addMessage('ai', response);
            }, 800);
        }
    }
    
    // Simple text similarity function
    function similarity(s1, s2) {
        let longer = s1;
        let shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
           
