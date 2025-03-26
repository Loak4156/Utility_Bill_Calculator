# Import necessary modules from Flask: Flask for the application itself,
# render_template to render HTML pages, and request to handle incoming request data.
from flask import Flask, render_template, request

# Initialize the Flask application.
# __name__ is a special Python variable that gets the name of the current module.
# Flask uses this to know where to look for resources like templates and static files.
app = Flask(__name__)

# Define a dictionary to hold the tariff rates for different utilities.
# Replace YOUR_TARIFF with the actual numerical tariff value for each utility.
# The keys ("Water", "Electricity", "Gas") are used both for display
# and to construct the form field names (e.g., "prev_Water", "curr_Electricity").
TARIFFS = {
    "Water": YOUR_TARIFF,       # Tariff for Water consumption
    "Electricity": YOUR_TARIFF, # Tariff for Electricity consumption
    "Gas": YOUR_TARIFF          # Tariff for Gas consumption
}

# Define a fixed fee that is added specifically to the water bill.
# This value (36.20) seems specific; adjust if necessary.
FIXED_WATER_FEE = 36.20

# Define a route for "/calc". This function will handle both GET requests
# (displaying the initial form) and POST requests (processing the form data).
@app.route("/calc", methods=["GET", "POST"])
def calc():
    # Initialize the result string, which will be displayed on the page.
    result = ""

    # Check if the request method is POST (meaning the form was submitted).
    if request.method == "POST":
        try:
            # Initialize the total cost for all utilities.
            total_cost = 0
            # Create a list to hold the formatted string for each utility's calculation.
            lines = []

            # Iterate through each utility defined in the TARIFFS dictionary.
            for utility in TARIFFS:
                # Get the previous meter reading from the submitted form data.
                # It expects form fields named like "prev_Water", "prev_Electricity", etc.
                # Convert the value to a floating-point number.
                prev = float(request.form[f"prev_{utility}"])

                # Get the current meter reading from the submitted form data.
                # It expects form fields named like "curr_Water", "curr_Electricity", etc.
                # Convert the value to a floating-point number.
                curr = float(request.form[f"curr_{utility}"])

                # Basic validation: Current reading cannot be less than the previous reading.
                if curr < prev:
                    # If validation fails, raise a ValueError with an informative message.
                    raise ValueError(f"Current readings for {utility} cannot be less than previous readings.")

                # Calculate the amount of the utility consumed.
                used = curr - prev
                # Calculate the cost for this utility based on consumption and tariff rate.
                cost = used * TARIFFS[utility]

                # Check if the current utility is "Water".
                if utility == "Water":
                    # If it's Water, add the fixed water fee to its cost.
                    cost += FIXED_WATER_FEE

                # Add the cost of this utility to the running total cost.
                total_cost += cost

                # Create a formatted string showing the calculation details for this utility.
                # Using "UAH" as the currency abbreviation (can be changed to $, €, etc.).
                line_text = f"{utility}: {used:.2f} × {TARIFFS[utility]} = {cost:.2f} UAH"
                # Add the formatted string to the list of lines.
                lines.append(line_text)

            # Join all the individual utility calculation lines with a separator.
            result = "\n-----\n".join(lines)
            # Append the final total cost to the result string.
            result += f"\n\nTotal amount: {total_cost:.2f} UAH"

        # Catch any exception that might occur during the try block (e.g., ValueError, invalid form data).
        except Exception as e:
            # Format an error message to be displayed on the page.
            result = f"❗ Error: {str(e)}"

    # Render the HTML template named "calc.html".
    # Pass the calculated result, the TARIFFS dictionary, and the fixed water fee
    # to the template so they can be displayed or used within the HTML.
    return render_template("calc.html", result=result, tariffs=TARIFFS, fixed_water=FIXED_WATER_FEE)

# Standard Python construct: Check if the script is being run directly
# (not imported as a module).
if __name__ == "__main__":
    # Start the Flask development server.
    # host="127.0.0.1" makes it accessible only from your own computer.
    # port=5001 specifies the port number to run on.
    # debug=True can be added (app.run(..., debug=True)) for easier development,
    # as it provides more detailed error messages and auto-reloads the server on code changes.
    # IMPORTANT: Do NOT run with debug=True in a production environment!
    app.run(host="127.0.0.1", port=5001)