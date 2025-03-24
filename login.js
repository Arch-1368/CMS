document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            alert('Login Successful!');

            if (data.user.role === 'user') {
                window.location.href = 'user-dashboard.html'; // Redirect normal user to user panel
            }
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Login failed', error);
        alert('Something went wrong. Please try again.');
    }
});
