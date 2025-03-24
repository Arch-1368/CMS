// script.js
const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace with your Stripe public key

document.querySelectorAll('.amount-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('amount').value = button.getAttribute('data-amount');
  });
});

document.getElementById('donation-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const amount = document.getElementById('amount').value * 100; // Convert to cents
  const purpose = document.getElementById('purpose').value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  // Send donation data to the backend
  const response = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, amount, purpose, paymentMethod }),
  });

  const { clientSecret } = await response.json();

  // Confirm payment with Stripe
  const { error } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
    },
  });

  if (error) {
    alert('Payment failed. Please try again.');
  } else {
    document.getElementById('donation-form').classList.add('hidden');
    document.getElementById('confirmation-message').classList.remove('hidden');
  }
});



document.getElementById('offering-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const fullName = document.getElementById('full-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const date = new Date().toLocaleDateString(); // Get the current date

  const offering = {
    fullName,
    email,
    amount,
    date,
  };

  let offerings = JSON.parse(localStorage.getItem('offerings')) || [];
  offerings.push(offering);
  localStorage.setItem('offerings', JSON.stringify(offerings));

  alert('Thank you for your offering!');
  document.getElementById('offering-form').reset(); // Reset the form
});
document.getElementById('donation-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
      alert('Please log in to make an offering.');
      return;
  }

  const amount = document.getElementById('amount').value;
  const response = await fetch('http://localhost:5000/api/offerings', {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ user_id: user.id, amount })
  });

  if (response.ok) {
      alert('Offering submitted successfully');
      window.location.href = 'OfferingHistory.html';
  } else {
      alert('Failed to submit offering');
  }
});
//common js 
// Protect pages by checking if the user is logged in
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
      alert('Unauthorized access! Please log in.');
      window.location.href = 'login.html'; // Redirect to login page
  }
});

// Logout Functionality
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('Logged out successfully.');
      window.location.href = 'login.html';
  });
}
document.getElementById('donation-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
      alert('Please log in to make an offering.');
      return;
  }

  const amount = document.getElementById('amount').value;
  const response = await fetch('http://localhost:5001/api/offerings', {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ user_id: user.id, amount })
  });

  if (response.ok) {
      alert('Offering submitted successfully');
      window.location.href = 'OfferingHistory.html';
  } else {
      alert('Failed to submit offering');
  }
});
