// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // --- Interactive Feature #1: Light/Dark Mode Toggle ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Event listener for the theme toggle button
    themeToggleButton.addEventListener('click', () => {
        // The classList.toggle method adds the class if it's not present,
        // and removes it if it is.
        body.classList.toggle('dark-mode');
    });


    //Interactive: Collapsible FAQ Section 
    const faqItems = document.querySelectorAll('.faq-item');

    // Loop through each FAQ item
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        // Add a click event listener to each question
        question.addEventListener('click', () => {
            // Find the answer corresponding to the clicked question
            const answer = item.querySelector('.faq-answer');
            
            // Toggle the 'active' class to show/hide the answer.
            // The CSS handles the smooth transition.
            answer.classList.toggle('active');
        });
    });

    //  Part 3: Form Validation
    
    const form = document.getElementById('signup-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const successMessage = document.getElementById('success-message');

    // Add a 'submit' event listener to the form
    form.addEventListener('submit', (event) => {
        // Prevent the form from submitting the default way,
        event.preventDefault();

        // Validate the form fields and store the result (true or false)
        const isFormValid = validateInputs();

        if (isFormValid) {
            // If the form is valid, show a success message
            successMessage.textContent = "Sign up successful! Welcome!";
            // Here, you would typically send the data to a server.
            // For this assignment, we'll just clear the form.
            form.reset(); 
            //remove success message after a few seconds
            setTimeout(() => {
                successMessage.textContent = "";
            }, 5000);
        } else {
            // If the form is not valid, clear any previous success message
            successMessage.textContent = "";
        }
    });

    //Helper functions for validation

    // Function to show an error message
    const setError = (element, message) => {
        const inputControl = element.parentElement; 
        const errorDisplay = inputControl.querySelector('.error-message');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
    }

    // Function to clear an error message
    const setSuccess = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error-message');

        errorDisplay.innerText = '';
        inputControl.classList.remove('error');
    }

    // Function to validate an email format using a Regular Expression (Regex)
    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Main function to validate all inputs
    const validateInputs = () => {
        // Get the values from the inputs, .trim() removes whitespace
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        let allValid = true; 

        // Validate Username
        if (usernameValue === '') {
            setError(username, 'Username is required');
            allValid = false;
        } else if (usernameValue.length < 3) {
            setError(username, 'Username must be at least 3 characters long');
            allValid = false;
        } else {
            setSuccess(username);
        }

        // Validate Email
        if (emailValue === '') {
            setError(email, 'Email is required');
            allValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
            allValid = false;
        } else {
            setSuccess(email);
        }

        // Validate Password
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