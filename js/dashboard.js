// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log("Dashboard loaded");
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    
    if (!isLoggedIn || !userEmail) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize dashboard
    initDashboard();
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const dashboardSidebar = document.getElementById('dashboardSidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            dashboardSidebar.classList.toggle('active');
        });
    }
    
    // User profile dropdown
    const userProfileTrigger = document.getElementById('userProfileTrigger');
    const userProfileMenu = document.getElementById('userProfileMenu');
    
    if (userProfileTrigger) {
        userProfileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            userProfileMenu.classList.toggle('active');
            userProfileTrigger.parentElement.classList.toggle('active');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userProfileTrigger?.contains(e.target) && !userProfileMenu?.contains(e.target)) {
            userProfileMenu?.classList.remove('active');
            userProfileTrigger?.parentElement.classList.remove('active');
        }
    });
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
    
    // Quick action buttons
    setupQuickActions();
    
    // Load dynamic content
    loadUserData();
    loadCourseProgress();
    loadDeadlines();
    loadActivityFeed();
    loadRecommendedCourses();
    
    // Update current date
    updateCurrentDate();
    
    // Initialize
    console.log("Dashboard initialized for user:", userEmail);
});

// Initialize dashboard based on user type
function initDashboard() {
    const userEmail = localStorage.getItem('userEmail');
    let userName = "User";
    let userRole = "Student";
    
    // Determine user type based on email
    if (userEmail.includes('admin')) {
        userRole = "Administrator";
        userName = "Admin User";
    } else if (userEmail.includes('instructor')) {
        userRole = "Instructor";
        userName = "Instructor";
    } else if (userEmail.includes('student')) {
        userRole = "Student";
        userName = "Student";
    }
    
    // Update UI elements
    const userNameElement = document.getElementById('userName');
    const userFullNameElement = document.getElementById('userFullName');
    const userRoleElement = document.getElementById('userRole');
    const welcomeMessageElement = document.getElementById('welcomeMessage');
    const dashboardSubtitleElement = document.getElementById('dashboardSubtitle');
    
    if (userNameElement) userNameElement.textContent = userName;
    if (userFullNameElement) userFullNameElement.textContent = userName;
    if (userRoleElement) userRoleElement.textContent = userRole;
    
    // Set personalized welcome message
    const hour = new Date().getHours();
    let greeting = "Good ";
    
    if (hour < 12) greeting += "morning";
    else if (hour < 18) greeting += "afternoon";
    else greeting += "evening";
    
    if (welcomeMessageElement) {
        welcomeMessageElement.textContent = `${greeting}, ${userName}!`;
    }
    
    if (dashboardSubtitleElement) {
        const subtitles = {
            'admin': 'Manage the platform and monitor activity.',
            'instructor': 'Review student progress and manage courses.',
            'student': 'Track your learning progress and upcoming tasks.'
        };
        
        dashboardSubtitleElement.textContent = subtitles[userRole.toLowerCase()] || 
            'Here\'s what\'s happening with your learning journey today.';
    }
    
    // Store user info for later use
    localStorage.setItem('userName', userName);
    localStorage.setItem('userRole', userRole);
}

// Setup quick action buttons
function setupQuickActions() {
    const quickActions = {
        'resumeLearning': () => {
            showAlert('Resuming your last course...', 'info');
            setTimeout(() => {
                window.location.href = 'my-courses.html';
            }, 1000);
        },
        'exploreCourses': () => {
            window.location.href = 'courses.html';
        },
        'applyForJob': () => {
            window.location.href = 'apply.html';
        },
        'joinWorkshop': () => {
            showAlert('Loading available workshops...', 'info');
            // In production: window.location.href = 'workshops.html';
        },
        'scheduleMentor': () => {
            showAlert('Opening mentor scheduling...', 'info');
            // In production: window.location.href = 'mentors.html';
        },
        'downloadResources': () => {
            window.location.href = 'resources.html';
        },
        'connectCommunity': () => {
            window.location.href = 'community.html';
        },
        'skillAssessment': () => {
            showAlert('Starting skill assessment...', 'info');
            // In production: window.location.href = 'assessment.html';
        }
    };
    
    // Add event listeners to all quick action buttons
    Object.keys(quickActions).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', quickActions[buttonId]);
        }
    });
}

// Load user data and statistics
function loadUserData() {
    // Mock data - in production, this would come from an API
    const mockUserData = {
        activeCourses: 3,
        totalLearningHours: 42,
        pendingAssignments: 2,
        certificatesEarned: 1,
        streakDays: 7,
        completedCourses: '3/12',
        learningHours: 42
    };
    
    // Update stats
    Object.keys(mockUserData).forEach(statId => {
        const element = document.getElementById(statId);
        if (element) {
            element.textContent = mockUserData[statId];
        }
    });
    
    // Update last updated time
    const lastUpdatedElement = document.getElementById('lastUpdatedTime');
    if (lastUpdatedElement) {
        const now = new Date();
        lastUpdatedElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

// Load course progress
function loadCourseProgress() {
    const courseProgressList = document.getElementById('courseProgressList');
    if (!courseProgressList) return;
    
    // Mock course data
    const courses = [
        {
            title: 'React & Frontend Development',
            instructor: 'Sarah Johnson',
            progress: 65,
            status: 'In Progress',
            nextLesson: 'State Management'
        },
        {
            title: 'Advanced Python',
            instructor: 'Michael Chen',
            progress: 30,
            status: 'Started',
            nextLesson: 'Data Structures'
        },
        {
            title: 'DevOps for Web Dev',
            instructor: 'Alex Rodriguez',
            progress: 85,
            status: 'Almost Done',
            nextLesson: 'Deployment'
        }
    ];
    
    // Clear loading state
    courseProgressList.innerHTML = '';
    
    // Add course items
    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-progress-item';
        courseItem.innerHTML = `
            <div class="course-header">
                <div>
                    <h4 class="course-title">${course.title}</h4>
                    <p class="course-instructor">By ${course.instructor}</p>
                </div>
                <span class="course-status">${course.status}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
            <div class="progress-info">
                <span>${course.progress}% Complete</span>
                <span>Next: ${course.nextLesson}</span>
            </div>
        `;
        courseProgressList.appendChild(courseItem);
    });
}

// Load deadlines
function loadDeadlines() {
    const deadlinesList = document.getElementById('deadlinesList');
    if (!deadlinesList) return;
    
    // Mock deadlines data
    const deadlines = [
        {
            day: '15',
            month: 'MAR',
            title: 'React Project Submission',
            course: 'React & Frontend',
            urgent: true
        },
        {
            day: '18',
            month: 'MAR',
            title: 'Python Assignment',
            course: 'Advanced Python',
            urgent: false
        },
        {
            day: '22',
            month: 'MAR',
            title: 'DevOps Quiz',
            course: 'DevOps for Web Dev',
            urgent: false
        },
        {
            day: '25',
            month: 'MAR',
            title: 'Web Basics Final',
            course: 'Web Development Basics',
            urgent: true
        }
    ];
    
    // Clear loading state
    deadlinesList.innerHTML = '';
    
    // Add deadline items
    deadlines.forEach(deadline => {
        const deadlineItem = document.createElement('div');
        deadlineItem.className = `deadline-item ${deadline.urgent ? 'urgent' : ''}`;
        deadlineItem.innerHTML = `
            <div class="deadline-date">
                <span class="deadline-day">${deadline.day}</span>
                <span class="deadline-month">${deadline.month}</span>
            </div>
            <div class="deadline-content">
                <h4>${deadline.title}</h4>
                <p>${deadline.course}</p>
            </div>
        `;
        deadlinesList.appendChild(deadlineItem);
    });
}

// Load activity feed
function loadActivityFeed() {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;
    
    // Mock activity data
    const activities = [
        {
            icon: 'fa-check-circle',
            title: 'Completed Lesson',
            description: 'React Components and Props',
            time: '2 hours ago'
        },
        {
            icon: 'fa-comment',
            title: 'New Comment',
            description: 'On your Python assignment',
            time: '5 hours ago'
        },
        {
            icon: 'fa-certificate',
            title: 'Certificate Earned',
            description: 'Web Development Basics',
            time: '1 day ago'
        },
        {
            icon: 'fa-user-plus',
            title: 'New Connection',
            description: 'Connected with mentor Alex',
            time: '2 days ago'
        },
        {
            icon: 'fa-star',
            title: 'Achievement Unlocked',
            description: '10 Day Learning Streak',
            time: '3 days ago'
        }
    ];
    
    // Clear loading state
    activityFeed.innerHTML = '';
    
    // Add activity items
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        activityFeed.appendChild(activityItem);
    });
}

// Load recommended courses
function loadRecommendedCourses() {
    const recommendedCourses = document.getElementById('recommendedCourses');
    if (!recommendedCourses) return;
    
    // Mock recommended courses data
    const courses = [
        {
            icon: 'fa-js',
            title: 'JavaScript Mastery',
            level: 'Intermediate'
        },
        {
            icon: 'fa-database',
            title: 'Database Design',
            level: 'Advanced'
        },
        {
            icon: 'fa-mobile-alt',
            title: 'Mobile Development',
            level: 'Intermediate'
        },
        {
            icon: 'fa-cloud',
            title: 'Cloud Computing',
            level: 'Beginner'
        }
    ];
    
    // Clear loading state
    recommendedCourses.innerHTML = '';
    
    // Add course items
    courses.forEach(course => {
        const courseItem = document.createElement('a');
        courseItem.className = 'recommended-course';
        courseItem.href = '#';
        courseItem.innerHTML = `
            <div class="course-thumbnail">
                <i class="fab ${course.icon}"></i>
            </div>
            <h4>${course.title}</h4>
            <span class="course-level">${course.level}</span>
        `;
        
        // Add click event
        courseItem.addEventListener('click', (e) => {
            e.preventDefault();
            showAlert(`Course details for "${course.title}" would open here.`, 'info');
        });
        
        recommendedCourses.appendChild(courseItem);
    });
}

// Update current date display
function updateCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    if (!currentDateElement) return;
    
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Logout function
function logout() {
    // Clear all user data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    
    // Show logout message
    showAlert('Logging out...', 'info');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Alert function (reused from login.js)
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.dashboard-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `dashboard-alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="alert-close">&times;</button>
    `;
    
    // Style the alert
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        box-shadow: var(--shadow-hover);
        border-left: 4px solid ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        background: ${type === 'success' ? 'rgba(46, 204, 113, 0.1)' : type === 'error' ? 'rgba(231, 76, 60, 0.1)' : 'rgba(52, 152, 219, 0.1)'};
        color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#c0392b' : '#2980b9'};
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100px)';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
    
    // Close button
    alert.querySelector('.alert-close').addEventListener('click', () => {
        alert.remove();
    });
}

// Add these styles to your existing CSS or create them dynamically
const dashboardAlertStyles = `
.dashboard-alert {
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    z-index: 2000;
    animation: slideIn 0.3s ease;
    max-width: 350px;
    box-shadow: var(--shadow-hover);
}

.alert-success {
    border-left: 4px solid #2ecc71;
    background: rgba(46, 204, 113, 0.1);
    color: #27ae60;
}

.alert-error {
    border-left: 4px solid #e74c3c;
    background: rgba(231, 76, 60, 0.1);
    color: #c0392b;
}

.alert-info {
    border-left: 4px solid #3498db;
    background: rgba(52, 152, 219, 0.1);
    color: #2980b9;
}

.alert-close {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: auto;
    opacity: 0.7;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.alert-close:hover {
    opacity: 1;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
`;

// Add the styles to the document
if (!document.querySelector('#dashboard-alert-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'dashboard-alert-styles';
    styleElement.textContent = dashboardAlertStyles;
    document.head.appendChild(styleElement);
}
