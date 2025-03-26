/**
 * script.js for Utility Bill Calculator
 * Handles theme switching with localStorage persistence and input validation.
 */

// --- Constants ---
const THEME_STORAGE_KEY = 'utility_calculator_theme'; // Key for localStorage
const LIGHT_MODE_CLASS = 'light-mode'; // CSS class for light theme
const INPUT_ERROR_CLASS = 'input-error'; // CSS class for validation errors
const UTILITIES = ['Water', 'Electricity', 'Gas']; // List of utilities to validate

// --- DOM Elements ---
const toggleCheckbox = document.getElementById('theme-toggle');
const bodyElement = document.body;

// --- Theme Switching ---

/**
 * Applies the specified theme (light or dark) to the body
 * and updates the toggle checkbox state.
 * @param {string} theme - The theme to apply ('light' or 'dark').
 */
const applyTheme = (theme) => {
    const isLight = theme === 'light';
    bodyElement.classList.toggle(LIGHT_MODE_CLASS, isLight); // Use second argument for state
    if (toggleCheckbox) {
        toggleCheckbox.checked = isLight;
    }
};

/**
 * Handles the change event on the theme toggle checkbox.
 * Updates the theme, saves the preference to localStorage.
 */
const handleThemeToggle = () => {
    if (!toggleCheckbox) return; // Exit if checkbox doesn't exist

    const isLightMode = toggleCheckbox.checked; // State *after* change
    const newTheme = isLightMode ? 'light' : 'dark';
    bodyElement.classList.toggle(LIGHT_MODE_CLASS, isLightMode);
    try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
        console.error("Failed to save theme preference:", error);
        // Handle potential storage errors (e.g., private browsing mode)
    }
};

// --- Input Validation ---

/**
 * Validates if the current reading is less than the previous reading.
 * Adds/removes error class and aria-invalid attribute accordingly.
 * @param {HTMLInputElement} prevInput - The input element for the previous reading.
 * @param {HTMLInputElement} currInput - The input element for the current reading.
 */
const validateReadings = (prevInput, currInput) => {
    // Ensure inputs exist before accessing value
    if (!prevInput || !currInput) return;

    const prevValue = Number(prevInput.value);
    const currValue = Number(currInput.value);

    // Check for error condition:
    // - Both values must be valid numbers.
    // - Both values must be positive (to avoid issues with empty strings becoming 0).
    // - Current reading must be less than previous reading.
    const hasError = !isNaN(prevValue) && !isNaN(currValue) &&
                     prevValue > 0 && currValue > 0 &&
                     currValue < prevValue;

    // Apply or remove error state
    if (hasError) {
        currInput.classList.add(INPUT_ERROR_CLASS);
        currInput.setAttribute('aria-invalid', 'true');
    } else {
        currInput.classList.remove(INPUT_ERROR_CLASS);
        currInput.removeAttribute('aria-invalid');
    }
};

/**
 * Sets up validation listeners for all utility input pairs.
 */
const setupValidation = () => {
    UTILITIES.forEach(utility => {
        const prevInput = document.querySelector(`input[name="prev_${utility}"]`);
        const currInput = document.querySelector(`input[name="curr_${utility}"]`);

        if (prevInput && currInput) {
            // Create a single handler function for this pair
            const validationHandler = () => validateReadings(prevInput, currInput);

            // Attach listener to both inputs, triggering the same validation
            currInput.addEventListener('input', validationHandler);
            prevInput.addEventListener('input', validationHandler);

            // Perform an initial validation check on page load in case of pre-filled values
            validateReadings(prevInput, currInput);
        } else {
            console.warn(`Validation inputs for utility "${utility}" not found. Check input 'name' attributes.`);
        }
    });
};

// --- Initialization ---

/**
 * Runs necessary setup functions when the DOM is fully loaded.
 */
const initializeApp = () => {
    // --- Theme Initialization ---
    let savedTheme = 'dark'; // Default theme
    try {
        savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    } catch (error) {
        console.error("Failed to load theme preference:", error);
    }
    applyTheme(savedTheme);

    // Attach theme toggle listener if the element exists
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', handleThemeToggle);
    } else {
        console.warn('Theme toggle checkbox (#theme-toggle) not found.');
    }

    // --- Validation Initialization ---
    setupValidation();
};

// --- Execute Initialization ---
// Wait for the DOM to be ready before running the setup
if (document.readyState === 'loading') {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // `DOMContentLoaded` has already fired
    initializeApp();
}
