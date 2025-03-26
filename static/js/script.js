// Theme switching
const toggleCheckbox = document.getElementById('theme-toggle');
toggleCheckbox.addEventListener('change', () => {
    // Toggle the 'light-mode' class on the body element
    document.body.classList.toggle('light-mode');
    // Save the current theme preference ('light' or 'dark') to localStorage
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Load saved theme on startup
document.addEventListener('DOMContentLoaded', () => {
    // Check if the saved theme in localStorage is 'light'
    if (localStorage.getItem('theme') === 'light') {
        // If yes, add the 'light-mode' class to the body
        document.body.classList.add('light-mode');
        // Also, check the toggle checkbox to reflect the light mode state
        toggleCheckbox.checked = true;
    }
});

// Validation: Current readings should not be less than previous readings
// Define the utility names matching the HTML input 'name' attributes and Python keys
const utilities = ['Water', 'Electricity', 'Gas']; // Changed from ['Вода', 'Світло', 'Газ']
utilities.forEach(utility => {
    // Find the input elements for previous and current readings for this utility
    const prevInput = document.querySelector(`input[name="prev_${utility}"]`); // Updated selector
    const currInput = document.querySelector(`input[name="curr_${utility}"]`); // Updated selector

    // Check if both input elements were found
    if (prevInput && currInput) {
        // Add an event listener to the current reading input field
        currInput.addEventListener('input', () => {
            // Compare the numerical values of current and previous readings
            if (Number(currInput.value) < Number(prevInput.value)) {
                // If current is less than previous, highlight the border in red
                currInput.style.borderColor = 'red';
            } else {
                // Otherwise, reset the border color to default
                currInput.style.borderColor = '';
            }
        });
        // Optional: Add similar validation on the prevInput 'input' event if needed
        // prevInput.addEventListener('input', () => { ... });
    }
});