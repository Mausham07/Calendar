import {
    signinPage,
    calendarPage,
    signoutBtn,
    signinErrorMessage,
    monthNameDiv,
    yearDiv,
    daysDiv,
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

export function renderCalendar() {
    console.log("Render Calendar");
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

        // Event handler to select a day
        dayDiv.onclick = function () {
            selectDate(new Date(currentYear, currentMonth, day));
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
