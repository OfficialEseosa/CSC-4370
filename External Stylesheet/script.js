// script.js - dark mode switch for the about page
// The colors are all variables in styles.css, this just flips which set is used
// by putting data-theme="dark" or "light" on the html tag.

// the html tag
var root = document.documentElement;

// name the choice gets saved under in localStorage
var STORAGE_KEY = "theme";


// figure out what theme to load with
function getStartingTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);

    // if they picked one before, use that
    if (saved === "dark" || saved === "light") {
        return saved;
    }

    // first visit, so go with whatever their computer is set to
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }

    return "light";
}


// the css looks for this attribute to know which colors to use
function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
}


// button text says what you'd switch to, so it's the opposite of the current theme
function updateButton(button, theme) {
    if (theme === "dark") {
        button.textContent = "Light mode";
    } else {
        button.textContent = "Dark mode";
    }
}


// makes the colors fade for a bit instead of changing instantly
function fadeColors() {
    root.classList.add("theme-transition");

    // take the class back off once the fade is done (0.4s, same as the css)
    window.setTimeout(function () {
        root.classList.remove("theme-transition");
    }, 400);
}


// set the theme right away. this file is loaded in the head so it happens
// before the page shows up, otherwise it flashes white first in dark mode
var currentTheme = getStartingTheme();
applyTheme(currentTheme);


// the button isn't on the page yet when this runs, so wait for it to load
document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("theme-toggle");

    updateButton(button, currentTheme);

    // when the button is clicked, swap themes and remember it
    button.addEventListener("click", function () {
        if (currentTheme === "dark") {
            currentTheme = "light";
        } else {
            currentTheme = "dark";
        }

        fadeColors();
        applyTheme(currentTheme);
        localStorage.setItem(STORAGE_KEY, currentTheme);
        updateButton(button, currentTheme);
    });
});
