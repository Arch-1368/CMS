// Admin Panel: Add Event
document.getElementById('add-event-btn').addEventListener('click', function () {
    // Get form values
    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventTime = document.getElementById('event-time').value;
    const eventLocation = document.getElementById('event-location').value;
    const eventDescription = document.getElementById('event-description').value;
  
    // Create event object
    const event = {
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      description: eventDescription,
    };
  
    // Save event to localStorage (or send to the server)
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
  
    // Clear form
    document.getElementById('add-event-form').reset();
  
    alert('Event added successfully!');
  });
  
  // User Panel: Display Events
  document.addEventListener('DOMContentLoaded', function () {
    const eventList = document.getElementById('event-list');
    const events = JSON.parse(localStorage.getItem('events')) || [];
  
    events.forEach((event) => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');
      eventCard.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
      `;
      eventList.appendChild(eventCard);
    });
  });
  // Load events from localStorage and display them
function loadEvents() {
  const eventList = document.getElementById('admin-event-list');
  eventList.innerHTML = ''; // Clear the list
  const events = JSON.parse(localStorage.getItem('events')) || [];

  events.forEach((event, index) => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    eventCard.innerHTML = `
      <h3>${event.name}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p>${event.description}</p>
      <button class="btn btn-danger delete-event-btn" data-index="${index}">Delete</button>
    `;
    eventList.appendChild(eventCard);
  });
}

// Delete an event
document.getElementById('admin-event-list').addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-event-btn')) {
    const index = e.target.getAttribute('data-index');
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1); // Remove the event from the array
    localStorage.setItem('events', JSON.stringify(events)); // Save updated events
    loadEvents(); // Reload the event list
    alert('Event deleted successfully!');
  }
});

// Load events on page load
document.addEventListener('DOMContentLoaded', loadEvents);
async function fetchEvents() {
  const response = await fetch('http://localhost:5001/api/events');
  const events = await response.json();

  const eventList = document.getElementById('admin-event-list');
  eventList.innerHTML = '';

  events.forEach(event => {
      const eventCard = `<div class="event-card">
          <h3>${event.title}</h3>
          <p><strong>Date:</strong> ${event.event_date}</p>
          <p><strong>Time:</strong> ${event.event_time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <button class="btn btn-danger" onclick="deleteEvent(${event.id})">Delete</button>
      </div>`;
      eventList.innerHTML += eventCard;
  });
}

async function deleteEvent(eventId) {
  if (!confirm('Are you sure you want to delete this event?')) return;

  const response = await fetch(`http://localhost:5001/api/events/${eventId}`, {
      method: 'DELETE'
  });

  if (response.ok) {
      alert('Event deleted successfully');
      fetchEvents();
  } else {
      alert('Failed to delete event');
  }
}

document.addEventListener('DOMContentLoaded', fetchEvents);
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  
  if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          alert('Logged out successfully.');
          window.location.href = 'index.html';
      });
  }
});
