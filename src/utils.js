import {
    signinPage,
    calendarPage,
    signoutBtn,
    signinErrorMessage,
    monthNameDiv,
    yearDiv,
    daysDiv,
    eventDescriptionInput,
    eventStartTimeInput,
    eventEndTimeInput,
    selectedDateh3,
    eventList,
} from "./ui";

const currentDate = new Date();
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
let selectedDate = currentDate;
let events = {}; // Store events as { "YYYY-MM-DD": ["event1", "event2"] }}

// Helper to create a div with a class of "date-square"
const createDateElement = () => {
    const dateElement = document.createElement("div");
    dateElement.className = "date-square";
    return dateElement;
};

export const showSigninPage = () => {
    signinPage.style.display = "flex";
    calendarPage.style.display = "none";
    signoutBtn.style.display = "none";
};

export const showCalendarPage = () => {
    signinPage.style.display = "none";
    calendarPage.style.display = "flex";
    signoutBtn.style.display = "inline";
    renderCalendar();
};

export const showSigninError = (message) => {
    signinErrorMessage.innerHTML = message;
    signinErrorMessage.style.display = "block";
};

export const hideSigninError = () => {
    signinErrorMessage.innerHTML = "";
    signinErrorMessage.style.display = "none";
};

const updateSelectedDayText = () => {
    selectedDateh3.textContent = `Selected Date: ${selectedDate.toDateString()}`;
};

export function renderCalendar() {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    monthNameDiv.textContent = monthNames[currentMonth];
    yearDiv.textContent = currentYear;

    // First day of the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Last day of the month
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Clear previous days
    daysDiv.innerHTML = "";

    // Add empty slots for days of previous month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = createDateElement();
        daysDiv.appendChild(emptyDiv);
    }

    // Add days of the current month
    for (let day = 1; day <= lastDate; day++) {
        // Put the date text in a span element to make styling easier
        const dayDiv = createDateElement();
        const textElement = document.createElement("span");
        textElement.textContent = day;
        dayDiv.appendChild(textElement);

        // Highlight current day
        if (
            day === currentDate.getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
        ) {
            textElement.classList.add("current-day");
        }

        currentDate.getHours;

        // Event handler to set selectedDate
        dayDiv.onclick = () => {
            // Update the selected day to the clicked day
            selectedDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
            );
            updateSelectedDayText();
            updateCurrentEvents();
        };

        daysDiv.appendChild(dayDiv);
    }
}

export function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

export function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

export const DateObjToReadable = (dateObject) => {
    if (dateObject == null) {
        // This shouldn't really happen
        console.warn(`dateObject inside DateObjToReadable was ${dateObject}`);
    }
    return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObject.getDate()}`; // Format: "YYYY-MM-DD"
};

const AMorPM = (timeInputElement) => {
    if (timeInputElement) {
        let [hour, minute] = timeInputElement.value.split(":");
        hour = parseInt(hour);
        return hour >= 12 ? "PM" : "AM";
    }
};

export const addEventLocally = (currentEvent) => {
    const dateKey = DateObjToReadable(selectedDate);

    if (!events[dateKey]) {
        events[dateKey] = [];
    }

    // Save the created event
    events[dateKey].push(currentEvent);

    // Updating instead of appending to remove "no current events" element
    updateCurrentEvents();
};

export const createEvent = () => {
    // Create an event object based on user input
    return {
        selectedDate: selectedDate,
        startTime: `${eventStartTimeInput.value}${AMorPM(eventStartTimeInput)}`,
        endTime: `${eventEndTimeInput.value}${AMorPM(eventEndTimeInput)}`,
        description: eventDescriptionInput.value,
    };
};

const appendEvent = (event) => {
    const listItem = document.createElement("ul");
    listItem.textContent = `${event.startTime}-${event.endTime}: ${event.description}`;
    eventList.appendChild(listItem);
};

const updateCurrentEvents = () => {
    // Clear out the event list
    eventList.innerHTML = "";

    // Grab the events for the currently selected day
    const selectedDateKey = DateObjToReadable(selectedDate);
    const selectedEvents = events[selectedDateKey];

    // If there are no events, then tell the user that instead of being blank
    if (selectedEvents == null) {
        const paragraph = document.createElement("p");
        paragraph.textContent = "No events scheduled today.";
        eventList.appendChild(paragraph);
        return;
    }

    for (const event of selectedEvents) {
        appendEvent(event);
    }
};

export const setEventsFromDB = (querySnapshot) => {
    querySnapshot.forEach((snap) => {
        const date = snap.id;
        const data = snap.data();
        for (const [_, currentEvent] of Object.entries(data)) {
            if (events[date] == null) {
                events[date] = [];
            }
            events[date].push(currentEvent);
        }
    });
    updateCurrentEvents();
};

// This seems like horible practice but idk what else to do
// These need to be called on page load
updateSelectedDayText();
updateCurrentEvents();
