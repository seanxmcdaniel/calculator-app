const form = document.getElementById("calc_form");
const output = document.getElementById("output");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");

// Prevent page from reloading on submit (default event)
form.addEventListener("submit", (e) => {
    e.preventDefault();
});


let is_operator = false;
// Access the operand buttons by looping over the array using the forEach loop method
operand_btns.forEach((btn) => {
    // Event listener for when the user clicks any of the operand buttons
    btn.addEventListener("click", (e) => {
        if (output.value == "0") {
            // If the output value is currently 0, the output value will be replaced by whatever the user clicks.
            output.value = e.target.value;
        } else if (output.value.includes(".")) {
            // Checks if the output value includes a decimal, and if it does, stops from adding more decimal points by replacing with a string.
            output.value = output.value + "" + e.target.value.replace(".", "");
        } else if (is_operator) {
            // Checks if value is an operator. If the value is an operator, we set the is_operator value to false and restart the value in the output from the new value.
            is_operator = false;
            output.value = e.target.value;
        } else {
            output.value = output.value + "" + e.target.value;
        }
    })
})

let equation = [];
operator_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // On click of operator button, add active class which changes the button color to indicate to the user that the operator button has been activated. 
        e.currentTarget.classList.add("active");

        // "switch" is a conditional statement much like an if/else statement. Switch accepts a value, for each case the value is checked. 
        switch (e.target.value) {
            case "%":
                output.value = parseFloat(output.value) / 100;
                // "%" will convert the output value to a percentage
                break;
            case "invert":
                output.value = parseFloat(output.value) * -1;
                // Inverts the value by multiplying it by -1
                break;
            case "=":
                // if = is clicked, add last value from output to equation array, and then use eval() to evaluate every equation there and then clear array.
                equation.push(output.value);
                output.value = eval(equation.join(""));
                equation = [];
                break;
            default:
                let last_item = equation[equation.length -  1];
                if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
                    equation.pop();
                    equation.push(e.target.value);
                } else {
                    equation.push(output.value);
                    equation.push(e.target.value);
                }
                is_operator = true;
                break;
        }
    })
})


