// Dom Elements
const form = document.getElementById('form'),
	username = document.getElementById('username'),
	email = document.getElementById('email'),
	password = document.getElementById('password'),
	password2 = document.getElementById('password2');

// Check if field is empty
const emptyCheck = (inputArr, message) => {
	inputArr.forEach((input) => {
		if (input.value === '') {
			if (input.id === 'password2') {
				showError(input, message, 'Please confirm password');
			} else {
				showError(input, message);
			}
		} else {
			showSuccess(input);
		}
	});
};

// Check Length
const checkLength = (input, min, max) => {
	if (input.value === '') return;

	if (input.value.length < min) {
		showError(input, ` must be atleast ${min} characters`);
	} else if (input.value.length >= max) {
		showError(input, ` must be ${max} characters or less`);
	} else {
		showSuccess(input);
	}
};

// Validate Email
const validateEmail = (input, message) => {
	// Valid email regex
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (input.value === '') return;

	if (re.test(input.value.trim().toLowerCase())) {
		showSuccess(input);
	} else {
		showError(input, message);
	}
};

// Validate Passwords
const validatePasswords = (password1, password2) => {
	const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
	console.log(re.test(password1.value));
	if (password1.value === '') return;

	if (!re.test(password1.value)) {
		console.log(password1.value, password2.value);
		showError(
			password1,
			` must contain atleast 1 uppercase character, lowercase character, special charater and number`
		);
		showErrorBorder(password2);
	} else {
		showSuccess(password1);
		showSuccess(password2);
	}

	if (password1.value !== password2.value) {
		showError(password2, 'no message', 'Passwords do not match');
		showErrorBorder(password1);
	} else {
		showSuccess(password2);
	}
};

// clear Error Messages
const clearErrorMessages = (inputArr) => {
	inputArr.forEach((input) => {
		input.nextElementSibling.innerText = '';
	});
};

// Show error
const showError = (input, message, customMessage) => {
	input.classList.remove('success');
	input.classList.add('error');
	const errorMessage = customMessage
		? customMessage
		: `${getInputName(input)} ${message}`;
	const errorMessageElement = input.nextElementSibling;
	errorMessageElement.innerText = errorMessage;
	errorMessageElement.style.visibility = 'visible';
};

// Show error border only
const showErrorBorder = (input) => {
	input.classList.remove('success');
	input.classList.add('error');
};

// Get input name
const getInputName = (input) => {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Show Success
const showSuccess = (input) => {
	input.classList.remove('error');
	input.classList.add('success');
	const errorMessage = input.nextElementSibling;
	errorMessage.style.visibility = 'hidden';
};

// Listen for sumbit event
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const inputElementsArr = [username, email, password, password2];
	clearErrorMessages(inputElementsArr);
	emptyCheck(inputElementsArr, ' field required');
	checkLength(username, 3, 20);
	checkLength(password, 6, 25);
	validateEmail(email, ' not valid');
	validatePasswords(password, password2);
});
