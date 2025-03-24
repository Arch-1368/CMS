let emailArray = [];
let passwordArray = [];

// Attach event listener to the signup form
let signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();

  // Validation
  if (!firstName || !lastName) {
    alert("First and last name are required.");
    return;
  }
  if (!email) {
    alert("Email is required.");
    return;
  }
  if (!password) {
    alert("Password is required.");
    return;
  }
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords don't match. Please retype your password.");
    return;
  }

  // Check if the email is already registered
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const isEmailRegistered = users.some((user) => user.email === email);

  if (isEmailRegistered) {
    alert(`${email} is already registered.`);
    return;
  }

  // Save user data
  const user = {
    fullName: `${firstName} ${lastName}`,
    email,
    password, // Store securely in production
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert(`${email} has been successfully registered. You can now log in.`);
  signupForm.reset(); // Reset the form
});


   document.getElementById('register-btn').addEventListener('click', function () {
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = {
      fullName,
      email,
      username,
      password, // Store securely in production
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    document.getElementById('registration-form').reset();
  });