
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contactForm');
            const formSummary = document.getElementById('form-summary');
            
            // Validation functions
            function validateName(name) {
                return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
            }
            
            function validateEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
            
            function validatePhone(phone) {
                // Allow empty phone number, but if provided, validate
                if (phone.trim() === '') return true;
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                return phoneRegex.test(phone);
            }
            
            function validateDate(date) {
                // Allow empty date, but if provided, validate
                if (date.trim() === '') return true;
                const selectedDate = new Date(date);
                const today = new Date();
                return selectedDate <= today;
            }
            
            function validateGender() {
                const genderSelected = document.querySelector('input[name="gender"]:checked');
                return genderSelected !== null;
            }
            
            function validateHobbies() {
                const hobbiesSelected = document.querySelectorAll('input[name="hobby"]:checked');
                return hobbiesSelected.length > 0;
            }
            
            function validateMessage(message) {
                return message.trim().length >= 10;
            }
            
            function validateTerms() {
                return document.getElementById('terms').checked;
            }
            
            // Set up validation for each field
            function setupFieldValidation(fieldId, validationFn, errorId, successId) {
                const field = document.getElementById(fieldId);
                const errorElement = document.getElementById(errorId);
                const successElement = document.getElementById(successId);
                
                field.addEventListener('blur', function() {
                    validateField(field, validationFn, errorElement, successElement);
                });
                
                field.addEventListener('input', function() {
                    // Remove error state when user starts typing
                    if (field.parentElement.classList.contains('error')) {
                        field.parentElement.classList.remove('error');
                        errorElement.style.display = 'none';
                    }
                });
            }
            
            // Validate a single field
            function validateField(field, validationFn, errorElement, successElement) {
                const value = field.value;
                const isValid = validationFn(value);
                
                if (isValid) {
                    field.parentElement.classList.remove('error');
                    field.parentElement.classList.add('success');
                    errorElement.style.display = 'none';
                    successElement.style.display = 'block';
                } else {
                    field.parentElement.classList.remove('success');
                    field.parentElement.classList.add('error');
                    errorElement.style.display = 'block';
                    successElement.style.display = 'none';
                    field.parentElement.classList.add('shake');
                    setTimeout(() => {
                        field.parentElement.classList.remove('shake');
                    }, 400);
                }
                
                return isValid;
            }
            
            // Set up validation for all fields
            setupFieldValidation('fname', validateName, 'fname-error', 'fname-success');
            setupFieldValidation('lname', validateName, 'lname-error', 'lname-success');
            setupFieldValidation('email', validateEmail, 'email-error', 'email-success');
            setupFieldValidation('phone', validatePhone, 'phone-error', 'phone-success');
            setupFieldValidation('date', validateDate, 'date-error', 'date-success');
            setupFieldValidation('message', validateMessage, 'message-error', 'message-success');
            
            // Special setup for checkboxes and radio buttons
            const genderInputs = document.querySelectorAll('input[name="gender"]');
            genderInputs.forEach(input => {
                input.addEventListener('change', function() {
                    const isValid = validateGender();
                    const errorElement = document.getElementById('gender-error');
                    const successElement = document.getElementById('gender-success');
                    
                    if (isValid) {
                        errorElement.style.display = 'none';
                        successElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'block';
                        successElement.style.display = 'none';
                    }
                });
            });
            
            const hobbyInputs = document.querySelectorAll('input[name="hobby"]');
            hobbyInputs.forEach(input => {
                input.addEventListener('change', function() {
                    const isValid = validateHobbies();
                    const errorElement = document.getElementById('hobby-error');
                    const successElement = document.getElementById('hobby-success');
                    
                    if (isValid) {
                        errorElement.style.display = 'none';
                        successElement.style.display = 'block';
                    } else {
                        errorElement.style.display = 'block';
                        successElement.style.display = 'none';
                    }
                });
            });
            
            const termsInput = document.getElementById('terms');
            termsInput.addEventListener('change', function() {
                const isValid = validateTerms();
                const errorElement = document.getElementById('terms-error');
                const successElement = document.getElementById('terms-success');
                
                if (isValid) {
                    errorElement.style.display = 'none';
                    successElement.style.display = 'block';
                } else {
                    errorElement.style.display = 'block';
                    successElement.style.display = 'none';
                }
            });
            
            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate all fields
                const isFnameValid = validateField(
                    document.getElementById('fname'), 
                    validateName, 
                    document.getElementById('fname-error'),
                    document.getElementById('fname-success')
                );
                
                const isLnameValid = validateField(
                    document.getElementById('lname'), 
                    validateName, 
                    document.getElementById('lname-error'),
                    document.getElementById('lname-success')
                );
                
                const isEmailValid = validateField(
                    document.getElementById('email'), 
                    validateEmail, 
                    document.getElementById('email-error'),
                    document.getElementById('email-success')
                );
                
                const isPhoneValid = validateField(
                    document.getElementById('phone'), 
                    validatePhone, 
                    document.getElementById('phone-error'),
                    document.getElementById('phone-success')
                );
                
                const isDateValid = validateField(
                    document.getElementById('date'), 
                    validateDate, 
                    document.getElementById('date-error'),
                    document.getElementById('date-success')
                );
                
                const isGenderValid = validateGender();
                const genderError = document.getElementById('gender-error');
                const genderSuccess = document.getElementById('gender-success');
                
                if (isGenderValid) {
                    genderError.style.display = 'none';
                    genderSuccess.style.display = 'block';
                } else {
                    genderError.style.display = 'block';
                    genderSuccess.style.display = 'none';
                    document.querySelector('.input:nth-child(5)').classList.add('shake');
                    setTimeout(() => {
                        document.querySelector('.input:nth-child(5)').classList.remove('shake');
                    }, 400);
                }
                
                const isHobbiesValid = validateHobbies();
                const hobbyError = document.getElementById('hobby-error');
                const hobbySuccess = document.getElementById('hobby-success');
                
                if (isHobbiesValid) {
                    hobbyError.style.display = 'none';
                    hobbySuccess.style.display = 'block';
                } else {
                    hobbyError.style.display = 'block';
                    hobbySuccess.style.display = 'none';
                    document.querySelector('.input:nth-child(6)').classList.add('shake');
                    setTimeout(() => {
                        document.querySelector('.input:nth-child(6)').classList.remove('shake');
                    }, 400);
                }
                
                const isMessageValid = validateField(
                    document.getElementById('message'), 
                    validateMessage, 
                    document.getElementById('message-error'),
                    document.getElementById('message-success')
                );
                
                const isTermsValid = validateTerms();
                const termsError = document.getElementById('terms-error');
                const termsSuccess = document.getElementById('terms-success');
                
                if (isTermsValid) {
                    termsError.style.display = 'none';
                    termsSuccess.style.display = 'block';
                } else {
                    termsError.style.display = 'block';
                    termsSuccess.style.display = 'none';
                    document.querySelector('.input:nth-child(8)').classList.add('shake');
                    setTimeout(() => {
                        document.querySelector('.input:nth-child(8)').classList.remove('shake');
                    }, 400);
                }
                
                // Check if all validations passed
                if (isFnameValid && isLnameValid && isEmailValid && isPhoneValid && 
                    isDateValid && isGenderValid && isHobbiesValid && isMessageValid && isTermsValid) {
                    
                    // Show success message
                    formSummary.classList.add('active');
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        form.reset();
                        formSummary.classList.remove('active');
                        
                        // Reset all success messages
                        document.querySelectorAll('.success-message').forEach(el => {
                            el.style.display = 'none';
                        });
                        
                        // Remove success classes
                        document.querySelectorAll('.input').forEach(el => {
                            el.classList.remove('success');
                        });
                    }, 3000);
                } else {
                    // Scroll to first error
                    const firstError = document.querySelector('.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        });

        // Initialize Swiper
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                },
            },
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nave-link a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Form Validation
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Reset error states
            document.querySelectorAll('.input').forEach(input => {
                input.classList.remove('error');
            });
            
            // Validate first name
            const fname = document.getElementById('fname');
            if (!fname.value.trim()) {
                document.getElementById('fname-error').style.display = 'block';
                fname.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate last name
            const lname = document.getElementById('lname');
            if (!lname.value.trim()) {
                document.getElementById('lname-error').style.display = 'block';
                lname.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById('email-error').style.display = 'block';
                email.parentElement.classList.add('error');
                isValid = false;
            }
            
            // Validate terms
            const terms = document.getElementById('terms');
            if (!terms.checked) {
                document.getElementById('terms-error').style.display = 'block';
                terms.parentElement.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                alert('Form submitted successfully!');
                this.reset();
            }
        });
        
        // Real-time validation for fields
        document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.parentElement.classList.contains('error')) {
                    this.parentElement.classList.remove('error');
                    const errorId = this.id + '-error';
                    if (document.getElementById(errorId)) {
                        document.getElementById(errorId).style.display = 'none';
                    }
                }
            });
        });

    