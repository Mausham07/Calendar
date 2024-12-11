import { signinPage, calendarPage, signoutBtn } from "./ui";

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
