// Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Form Validation and localStorage
        const contactForm = document.getElementById('contact-form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');
        const successMessage = document.getElementById('success-message');
        const savedData = document.getElementById('saved-data');
        const savedDataContent = document.getElementById('saved-data-content');

        // Check if there's saved data in localStorage and display it
        function checkSavedData() {
            const storedData = localStorage.getItem('contactFormData');
            if (storedData) {
                const data = JSON.parse(storedData);
                savedDataContent.innerHTML = `
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Message:</strong> ${data.message}</p>
                `;
                savedData.style.display = 'block';
            }
        }

        // Call on page load
        checkSavedData();

        // Validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Reset error messages
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            messageError.style.display = 'none';

            // Validate name
            if (nameInput.value.trim() === '') {
                nameError.style.display = 'block';
                isValid = false;
            }

            // Validate email
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
                emailError.style.display = 'block';
                isValid = false;
            }

            // Validate message
            if (messageInput.value.trim() === '') {
                messageError.style.display = 'block';
                isValid = false;
            }

            // If form is valid, save to localStorage and show success message
            if (isValid) {
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim()
                };

                // Save to localStorage
                localStorage.setItem('contactFormData', JSON.stringify(formData));

                // Show success message
                successMessage.style.display = 'block';
                
                // Update saved data display
                checkSavedData();

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });