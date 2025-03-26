
# Utility Bill Calculator (Flask App)

A modern and responsive utility bill calculator for water, electricity, and gas built using Flask. The app calculates usage costs based on user input and displays the total amount with a breakdown per utility.

---

## ⚙️ Features

- Built with **Flask** (Python web framework)
- Supports **dark/light mode** toggle with localStorage
- Clean and modern UI using **HTML5**, **CSS3**, and **Google Fonts**
- Dynamic validation (ensures current meter readings are not less than previous ones)
- Configurable **tariffs** and fixed fees
- Fully responsive for mobile and desktop

---

## 🗂️ Project Structure

```
utility-calc/
├── app.py                     # Main Flask app
├── templates/
│   └── calc.html             # HTML template
├── static/
│   ├── css/
│   │   └── styles.css        # CSS styles
│   └── js/
│       └── script.js         # JS for theme toggle and validation
```

---

## 🚀 Getting Started

### 1. Install Flask
```bash
pip install flask
```

### 2. Set Tariff Values in `app.py`
Replace the `YOUR_TARIF` values with your actual rates:
```python
TARIFFS = {
    "Water": 40.2,     # Example water rate per m^3
    "Electricity": 50.65,   # Electricity rate per kWh
    "Gas": 7.99       # Gas rate per m^3
}
FIXED_WATER_FEE = 36.20
```

### 3. Run the App
```bash
python app.py
```
Then open in browser:
```
http://127.0.0.1:5001/calc
```

---

## 🧠 How It Works

- The user enters previous and current meter readings for water, electricity, and gas.
- The app calculates the usage by subtracting previous from current.
- Usage is multiplied by the respective tariff. A fixed surcharge is added for water.
- The results are displayed clearly with breakdown and total.

---

## 🌙 Theme Toggle
- Users can switch between **light** and **dark** mode
- Preference is saved in localStorage and persists between sessions

---

## 📋 Notes

- The app runs locally and does not require a database
- Useful for households or property managers to quickly estimate utility bills
- Easy to expand with additional utilities or export functionality (e.g. to PDF)

---
