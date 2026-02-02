// apply.js - Application Form Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log("Apply page loaded");
    
    // Populate days dropdown
    const daySelect = document.getElementById('birth-day');
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i < 10 ? '0' + i : i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
    
    // Populate years dropdown (last 50 years)
    const yearSelect = document.getElementById('birth-year');
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 50; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
    
    // File upload functionality
    const fileInput = document.getElementById('cv-file');
    const fileNameDisplay = document.getElementById('fileName');
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileNameDisplay.textContent = this.files[0].name;
            fileNameDisplay.style.color = 'var(--secondary-color)';
        } else {
            fileNameDisplay.textContent = 'No file chosen';
            fileNameDisplay.style.color = 'var(--text-color)';
        }
    });
    
    // Form validation
    const applyForm = document.getElementById('applyForm');
    
    applyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const requiredFields = applyForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--accent-color)';
            } else {
                field.style.borderColor = '';
            }
        });
        
        // Check if at least one skill is selected
        const skillCheckboxes = applyForm.querySelectorAll('input[name="skills"]:checked');
        if (skillCheckboxes.length === 0) {
            isValid = false;
            const skillsSection = document.querySelector('.skills-grid');
            skillsSection.style.border = '2px solid var(--accent-color)';
            skillsSection.style.borderRadius = '8px';
            skillsSection.style.padding = '10px';
        } else {
            const skillsSection = document.querySelector('.skills-grid');
            skillsSection.style.border = '';
            skillsSection.style.padding = '';
        }
        
        // Check if CV upload method is selected and file is chosen
        const uploadMethod = applyForm.querySelector('input[name="upload-method"]:checked');
        const cvFile = document.getElementById('cv-file').files[0];
        
        if (!uploadMethod) {
            isValid = false;
            alert('Please select a CV upload method.');
        } else if (uploadMethod.value === 'computer' && !cvFile) {
            isValid = false;
            alert('Please select a file to upload.');
        }
        
        if (isValid) {
            // Show success message
            alert('Application submitted successfully! We will contact you soon.');
            
            // In a real application, you would send data to server here
            // For now, we'll just reset the form
            applyForm.reset();
            fileNameDisplay.textContent = 'No file chosen';
            fileNameDisplay.style.color = 'var(--text-color)';
            
            // Reset skill borders
            const skillsSection = document.querySelector('.skills-grid');
            skillsSection.style.border = '';
            skillsSection.style.padding = '';
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });
    
    // Reset field styles on input
    const formInputs = applyForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
    
    // Skill checkbox styling
    const skillCheckboxes = applyForm.querySelectorAll('.skill-option input[type="checkbox"]');
    skillCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.parentElement;
            if (this.checked) {
                label.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                label.style.borderColor = 'var(--secondary-color)';
            } else {
                label.style.backgroundColor = '';
                label.style.borderColor = '';
            }
        });
    });
    
    // Upload method selection styling
    const uploadOptions = applyForm.querySelectorAll('.upload-option input[type="radio"]');
    uploadOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Remove active class from all upload options
            document.querySelectorAll('.upload-option label').forEach(label => {
                label.style.backgroundColor = '';
                label.style.borderColor = '';
            });
            
            // Add active class to selected option
            const selectedLabel = this.parentElement;
            selectedLabel.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
            selectedLabel.style.borderColor = 'var(--secondary-color)';
            
            // Show/hide file input based on selection
            const fileInputContainer = document.getElementById('fileInputContainer');
            if (this.value === 'computer') {
                fileInputContainer.style.display = 'flex';
            } else {
                fileInputContainer.style.display = 'none';
                fileNameDisplay.textContent = 'No file chosen';
            }
        });
    });
    
    // Initialize file input container visibility
    const fileInputContainer = document.getElementById('fileInputContainer');
    fileInputContainer.style.display = 'none';
});
