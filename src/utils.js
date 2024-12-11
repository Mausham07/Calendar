import { signinPage, calendarPage, signoutBtn, signinErrorMessage } from "./ui";

export const showSigninPage = () => {
    signinPage.style.display = "flex";
    calendarPage.style.display = "none";
    signoutBtn.style.display = "none";
};

export const showCalendarPage = () => {
    signinPage.style.display = "none";
    calendarPage.style.display = "block";
    signoutBtn.style.display = "inline";
};

export const showSigninError = (message) => {
    signinErrorMessage.innerHTML = message;
    signinErrorMessage.style.display = "block";
};

export const hideSigninError = () => {
    signinErrorMessage.style.display = "none";
};
