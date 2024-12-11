/* Export relevent dom elements for decluttering */

// Page elements
export const signinPage = document.querySelector(".sign-in-view");
export const calendarPage = document.querySelector(".calendar-view");

// Sign-in elements
export const emailInput = document.querySelector("#email");
export const passwordInput = document.querySelector("#password");
export const signinBtn = document.querySelector("#sign-in-btn");
export const signupBtn = document.querySelector("#signup-btn");
export const signoutBtn = document.querySelector("#sign-out-btn");
export const signinErrorMessage = document.querySelector(".error");

// Calendar elements
export const monthNameDiv = document.querySelector("#month-name");
export const yearDiv = document.querySelector("#year");
export const daysDiv = document.querySelector("#days");
export const prevBtn = document.querySelector("#prev-month");
export const nextBtn = document.querySelector("#next-month");
export const addEventBtn = document.querySelector("#add-event-btn");

// Event elements
export const selectedDateh3 = document.querySelector("#selected-date");
export const eventList = document.querySelector("#event-list");
export const eventDescriptionInput = document.querySelector("#event-input");
export const eventStartTimeInput = document.querySelector("#event-start-time");
export const eventEndTimeInput = document.querySelector("#event-end-time");
