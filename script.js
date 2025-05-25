/* -------------------------------
   Scroll to Top Button
-------------------------------- */

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show or hide the scroll-to-top button based on scroll position
window.addEventListener("scroll", () => {
  // Show the button if scrolled down more than 200px, hide it otherwise
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Smoothly scroll to the top when the button is clicked
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* -------------------------------
   Dark Mode with localStorage + System Preference
-------------------------------- */

/* Create dark mode toggle and reset buttons */
const darkModeBtn = document.createElement("button");
darkModeBtn.id = "darkModeBtn";
darkModeBtn.setAttribute("aria-label", "Toggle dark mode");

const resetThemeBtn = document.createElement("button");
resetThemeBtn.id = "resetThemeBtn";
resetThemeBtn.textContent = "♻️ Reset Theme";
resetThemeBtn.setAttribute("aria-label", "Reset to system theme");

/* Group theme buttons inside a wrapper */
const themeControls = document.createElement("div");
themeControls.id = "themeControls";
document.body.insertBefore(themeControls, document.body.firstChild);
themeControls.appendChild(darkModeBtn);
themeControls.appendChild(resetThemeBtn);

/* Update the dark mode button icon based on current theme */
function updateDarkModeButtonText() {
  const isDark = document.body.classList.contains("dark-mode");
  darkModeBtn.textContent = isDark ? "☀️" : "🌙";
}

/* Track if the user has manually chosen a theme (overrides system preference) */
let userHasChosenTheme = false;

/* Toggle dark mode, save preference, and show reset button */
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  userHasChosenTheme = true;
  resetThemeBtn.classList.add("show"); // Show with fade-in
  updateDarkModeButtonText();
}

darkModeBtn.addEventListener("click", toggleDarkMode);

/* Load saved theme from local storage, or use system setting if none */
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
  userHasChosenTheme = true;
  resetThemeBtn.classList.add("show"); // Show with fade-in
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.body.classList.add("dark-mode");
  }
}

updateDarkModeButtonText();

/* Listen for system preference changes */
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function systemThemeChanged(event) {
  // Only update theme if the user hasn't manually chosen one
  if (!userHasChosenTheme) {
    document.body.classList.toggle("dark-mode", event.matches);
    updateDarkModeButtonText();
  }
}

// Add event listener for system theme changes
if (systemPrefersDark.addEventListener) {
  // Modern browsers: use addEventListener for change event
  systemPrefersDark.addEventListener("change", systemThemeChanged);
} else if (systemPrefersDark.onchange !== undefined) {
  // Fallback for older browsers: use onchange property
  systemPrefersDark.onchange = systemThemeChanged;
}

/* Reset theme to system preference and remove user override */
resetThemeBtn.addEventListener("click", () => {
  localStorage.removeItem("theme"); // Remove saved theme from localStorage
  userHasChosenTheme = false; // Allow system preference to take over
  resetThemeBtn.classList.remove("show"); // Hide reset button after reset

  // Set theme based on current system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark-mode", prefersDark);
  updateDarkModeButtonText();
});

/* -------------------------------
   Footer Year
-------------------------------- */

// Automatically update the footer with the current year to keep it up to date
const footer = document.querySelector("footer p");
const year = new Date().getFullYear();
footer.textContent = `© ${year} Ingelinn Hallseth`;
