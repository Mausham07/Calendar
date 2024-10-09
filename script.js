const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentDate = new Date();
let selectedDate = null;
let events = {};  // Store events as { "YYYY-MM-DD": ["event1", "event2"] }

function renderCalendar() {
  const monthNameElement = document.getElementById("month-name");
  const yearElement = document.getElementById("year");
  const daysElement = document.getElementById("days");

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  monthNameElement.textContent = monthNames[currentMonth];
  yearElement.textContent = currentYear;

  // First day of the month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  
  // Last day of the month
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Clear previous days
  daysElement.innerHTML = '';

  // Add empty slots for days of previous month
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    daysElement.appendChild(emptyDiv);
  }

  // Add days of the current month
  for (let day = 1; day <= lastDate; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;

    // Highlight current day
    if (day === currentDate.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
      dayDiv.classList.add("current-day");
    }

    // Event handler to select a day
    dayDiv.onclick = function() {
      selectDate(new Date(currentYear, currentMonth, day));
    };

    daysElement.appendChild(dayDiv);
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

function selectDate(date) {
  selectedDate = date;
  document.getElementById('selected-date').textContent = `Selected Date: ${selectedDate.toDateString()}`;
  renderEvents();
}

function addEvent() {
  if (!selectedDate) {
    alert("Please select a date first.");
    return;
  }

  const eventInput = document.getElementById('event-input');
  const eventText = eventInput.value.trim();

  if (eventText === "") {
    alert("Please enter an event.");
    return;
  }

  const dateKey = selectedDate.toISOString().split('T')[0]; // Format: "YYYY-MM-DD"

  if (!events[dateKey]) {
    events[dateKey] = [];
  }

  events[dateKey].push(eventText);
  eventInput.value = '';  // Clear input
  renderEvents();
}

function renderEvents() {
  const eventList = document.getElementById('event-list');
  eventList.innerHTML = ''; // Clear previous events

  if (!selectedDate) return;

  const dateKey = selectedDate.toISOString().split('T')[0];
  const dateEvents = events[dateKey] || [];

  dateEvents.forEach((eventText, index) => {
    const li = document.createElement('li');
    li.textContent = eventText;

    // Delete event button
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-event');
    deleteBtn.onclick = function() {
      deleteEvent(dateKey, index);
    };

    li.appendChild(deleteBtn);
    eventList.appendChild(li);
  });
}



function deleteEvent(dateKey, eventIndex) {
  events[dateKey].splice(eventIndex, 1);  // Remove event
  renderEvents();  // Re-render events
}

function checkEventsForTomorrow() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const tomorrowKey = tomorrow.toISOString().split('T')[0];

  if (events[tomorrowKey] && events[tomorrowKey].length > 0) {
    alert(`You have events tomorrow: ${events[tomorrowKey].join(', ')}`);
  }
}

// Check events for tomorrow every 10 seconds (can be adjusted as needed)
setInterval(checkEventsForTomorrow, 10000);  // 10 seconds for demo purposes

// Render the calendar when the page loads
renderCalendar();
