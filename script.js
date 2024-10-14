const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentDate = new Date();
let selectedDate = null;
let events = {};  // Store events as { "YYYY-MM-DD": ["event1", "event2"] }

class MakeEvent {
  constructor(name, date, timestart, timeend) {
    this.name = name
    this.timestart = timestart
    this.timeend = timeend
    this.date = date
  }
}

function createDateElement() {
  const dateElement = document.createElement("div")
  dateElement.className = "date-square"
  return dateElement
}

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
    const emptyDiv = createDateElement()
    daysElement.appendChild(emptyDiv);
  }

  // Add days of the current month
  for (let day = 1; day <= lastDate; day++) {
    // Put the date text in a span element to make styling easier
    const dayDiv = createDateElement()
    const textElement = document.createElement("span");
    textElement.textContent = day
    dayDiv.appendChild(textElement)

    // Highlight current day
    if (day === currentDate.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
      textElement.classList.add("current-day");
    }

    // Event handler to select a day
    dayDiv.onclick = function () {
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

document.getElementById('event-input').addEventListener('keypress', function (e) { if (e.key === 'Enter') { addEvent() } });

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

  const eventstarttime = document.getElementById('event-start-time')

  if (eventstarttime.value === '') {
    alert("please enter a start time")
    return;
  }
  const eventendtime = document.getElementById('event-end-time')

  if (eventendtime.value === '') {
    alert("please enter a end time")
    return;
  }

  const dateKey = selectedDate.toISOString().split('T')[0]; // Format: "YYYY-MM-DD"
  Newevent = new MakeEvent(eventText, dateKey, eventstarttime.value, eventendtime.value)

  if (!events[dateKey]) {
    events[dateKey] = [];
  }

  events[dateKey].push(Newevent);
  eventInput.value = '';  // Clear input
  eventstarttime.value = '';  // Clear input
  eventendtime.value = '';  // Clear input
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
    li.textContent = `${eventText.name} ${eventText.timestart}-${eventText.timeend}`;

    // Delete event button
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-event');
    deleteBtn.onclick = function () {
      deleteEvent(dateKey, index);
    };

    li.appendChild(deleteBtn);
    eventList.appendChild(li);
  });
}



function deleteEvent(dateKey, eventIndex) {
  let responce = window.confirm('Are you sure you want to delete event it cant be undone if you do')
  if (responce) {
    events[dateKey].splice(eventIndex, 1);  // Remove event
    renderEvents();  // Re-render events
  }
}

function checkEventsForTomorrow() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  // const year = tomorrow.getFullYear();
  // const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  // const day = String(tomorrow.getDate()).padStart(2, '0');
  // const formattedDate = `${year}-${month}-${day}`;
  // const tomorrowKey = formattedDate;
  const tomorrowKey = tomorrow.toISOString().split('T')[0];

  if (events[tomorrowKey] && events[tomorrowKey].length > 0) {
    let eventlist = ''
    events[tomorrowKey].forEach(element => {
      eventlist += `${element.name} ${element.timestart}-${element.timeend}\n`
    })

    alert(`You have events tomorrow:\n${eventlist}`)
  }
}

// Check events for tomorrow every 10 seconds (can be adjusted as needed)
// setInterval(checkEventsForTomorrow,100000000000);  // 10 seconds for demo purposes

// Render the calendar when the page loads
renderCalendar();

selectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()))
checkEventsForTomorrow()