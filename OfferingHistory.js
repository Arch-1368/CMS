// script.js
async function loadDonationHistory() {
    const userId = "USER_ID"; // Replace with the logged-in user's ID (from session or token)
    const response = await fetch(`/donation-history/${userId}`);
    const data = await response.json();
  
    // Populate Yearly Summary
    const summary = document.getElementById('summary');
    summary.innerHTML = `
      <p><strong>Current Year:</strong> $${data.yearlySummary.currentYear}</p>
      <p><strong>Last Year:</strong> $${data.yearlySummary.lastYear}</p>
    `;
  
    // Populate Donation History
    const donationList = document.getElementById('donation-list');
    donationList.innerHTML = data.donations.map(donation => `
      <tr>
        <td>${new Date(donation.date).toLocaleDateString()}</td>
        <td>$${donation.amount}</td>
        <td>${donation.purpose}</td>
        <td>${donation.paymentMethod}</td>
        <td><a href="${donation.receiptUrl}" target="_blank">Download Receipt</a></td>
      </tr>
    `).join('');
  }
  
  // Load data on page load
  loadDonationHistory();

  async function fetchOfferingHistory() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('Please log in to view your offering history.');
        window.location.href = 'login.html';
        return;
    }

    const response = await fetch(`http://localhost:5000/api/offerings`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });

    const offerings = await response.json();
    const historyList = document.getElementById('offering-history');
    historyList.innerHTML = '';

    offerings.filter(o => o.user_id === user.id).forEach(offering => {
        const row = `<tr>
            <td>${offering.offering_date}</td>
            <td>$${offering.amount.toFixed(2)}</td>
        </tr>`;
        historyList.innerHTML += row;
    });
}

document.addEventListener('DOMContentLoaded', fetchOfferingHistory);
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
async function fetchOfferingHistory() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
      alert('Please log in to view your offering history.');
      window.location.href = 'login.html';
      return;
  }

  const response = await fetch(`http://localhost:5001/api/offerings`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });

  const offerings = await response.json();
  const historyList = document.getElementById('offering-history');
  historyList.innerHTML = '';

  offerings.filter(o => o.user_id === user.id).forEach(offering => {
      const row = `<tr>
          <td>${offering.offering_date}</td>
          <td>$${offering.amount.toFixed(2)}</td>
      </tr>`;
      historyList.innerHTML += row;
  });
}

document.addEventListener('DOMContentLoaded', fetchOfferingHistory);
