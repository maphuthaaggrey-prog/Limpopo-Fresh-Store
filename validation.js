//MAPHUTHA AC - MULTIMEDIA ISAT

function validateForm() {
    let isValid = true;
    
    // Validate Name
    const name = document.getElementById('name').value;
    const nameError = document.getElementById('name-error');
    if (name.trim() === '') {
        nameError.textContent = 'Name is required.';
        nameError.style.color = 'red';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    
    // Validate Email
    const email = document.getElementById('email-address').value;
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.color = 'red';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    
    // Validate Password
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        passwordError.style.color = 'red';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPasswordError.style.color = 'red';
        isValid = false;
    } else {
        confirmPasswordError.textContent = '';
    }

    // Validate Street and Province
    const street = document.getElementById('street').value;
    const streetError = document.getElementById('street-error');
    if (street.trim() === '') {
        streetError.textContent = 'Street is required.';
        streetError.style.color = 'red';
        isValid = false;
    } else {
        streetError.textContent = '';
    }

    const province = document.getElementById('province').value;
    const provinceError = document.getElementById('province-error');
    if (province.trim() === '') {
        provinceError.textContent = 'Province is required.';
        provinceError.style.color = 'red';
        isValid = false;
    } else {
        provinceError.textContent = '';
    }

    // Validate Terms and Conditions checkbox
    const termsCheckbox = document.getElementById('terms-and-conditions');
    if (!termsCheckbox.checked) {
        alert('You must agree to the terms and conditions.');
        isValid = false;
    }

    return isValid;
}