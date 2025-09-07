document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Event listener for the theme toggle button
    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });


    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            
            answer.classList.toggle('active');
        });
    });

    const form = document.getElementById('signup-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const isFormValid = validateInputs();

        if (isFormValid) {
            successMessage.textContent = "Sign up successful! Welcome!";
            form.reset(); 
            setTimeout(() => {
                successMessage.textContent = "";
            }, 5000);
        } else {
            successMessage.textContent = "";
        }
    });


    const setError = (element, message) => {
        const inputControl = element.parentElement; 
        const errorDisplay = inputControl.querySelector('.error-message');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
    }

    const setSuccess = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error-message');

        errorDisplay.innerText = '';
        inputControl.classList.remove('error');
    }

    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateInputs = () => {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        let allValid = true; 

        if (usernameValue === '') {
            setError(username, 'Username is required');
            allValid = false;
        } else if (usernameValue.length < 3) {
            setError(username, 'Username must be at least 3 characters long');
            allValid = false;
        } else {
            setSuccess(username);
        }

        if (emailValue === '') {
            setError(email, 'Email is required');
            allValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
            allValid = false;
        } else {
            setSuccess(email);
        }

        if (passwordValue === '') {
            setError(password, 'Password is required');
            allValid = false;
        } else if (passwordValue.length < 8) {
            setError(password, 'Password must be at least 8 characters long');
            allValid = false;
        } else {
            setSuccess(password);
        }

        return allValid;
    };

});