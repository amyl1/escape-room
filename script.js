const CORRECT_CODE = "7184";

// Get DOM elements
const digit1 = document.getElementById("digit1");
const digit2 = document.getElementById("digit2");
const digit3 = document.getElementById("digit3");
const digit4 = document.getElementById("digit4");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");
const resultContent = document.getElementById("resultContent");

// Auto-focus next input and validate
const inputs = [digit1, digit2, digit3, digit4];
inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        // Only allow single digits
        if (e.target.value.length > 1) {
            e.target.value = e.target.value.slice(-1);
        }
        // Auto-focus next input
        if (e.target.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    // Allow backspace to go to previous input
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// Submit button handler
submitBtn.addEventListener("click", validateAnswer);

// Allow Enter key to submit
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        validateAnswer();
    }
});

function validateAnswer() {
    // Get the entered code
    const userCode = digit1.value + digit2.value + digit3.value + digit4.value;

    // Check if all fields are filled
    if (userCode.length !== 4) {
        resultDiv.className = "result error";
        resultContent.innerHTML = `
            <h2>⚠️ Incomplete</h2>
            <p>Please enter all four digits.</p>
        `;
        resultDiv.classList.remove("hidden");
        return;
    }

    // Check if correct
    if (userCode === CORRECT_CODE) {
        resultDiv.className = "result success";
        resultContent.innerHTML = `
            <h2>🎉 Congratulations!</h2>
            <p>You solved the final challenge!</p>
            <p style="font-size: 1.15em; margin-top: 15px; font-weight: bold;">
                Go to a leader to collect your prize
            </p>
        `;
        resultDiv.classList.remove("hidden");
        clearHighlights();
    } else {
        // Show which digits are incorrect
        const wrongDigits = [];
        for (let i = 0; i < 4; i++) {
            if (userCode[i] !== CORRECT_CODE[i]) {
                wrongDigits.push(i + 1);
            }
        }

        resultDiv.className = "result error";
        const digitText = wrongDigits.length === 1 ? "digit" : "digits";
        resultContent.innerHTML = `
            <h2>❌ Try Again</h2>
            <p>Incorrect ${digitText}: ${wrongDigits.join(", ")}</p>
        `;
        resultDiv.classList.remove("hidden");
        highlightWrongDigits(wrongDigits);
    }
}

function highlightWrongDigits(wrongDigits) {
    // Clear previous highlights
    inputs.forEach((input) => {
        input.classList.remove("error", "correct");
    });

    // Add highlights
    wrongDigits.forEach((digitNum) => {
        inputs[digitNum - 1].classList.add("error");
    });

    // Highlight correct digits
    for (let i = 0; i < 4; i++) {
        if (!wrongDigits.includes(i + 1)) {
            if (inputs[i].value === CORRECT_CODE[i]) {
                inputs[i].classList.add("correct");
            }
        }
    }
}

function clearHighlights() {
    inputs.forEach((input) => {
        input.classList.remove("error", "correct");
    });
}
