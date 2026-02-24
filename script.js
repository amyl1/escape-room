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
            <h2> Well Done!</h2>
            <p>You've completed your World Thinking Day Escape Room</p>
            <p style="font-size: 1.15em; margin-top: 15px; font-weight: bold;">
                Go to a leader to collect your prize
            </p>
            <img src="smore.jpg" alt="S'more" style="max-width: 150px; margin-top: 20px; border-radius: 10px;">
        `;
        resultDiv.classList.remove("hidden");
        clearHighlights();
        document.querySelector(".input-group").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
        createConfetti();
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

function createConfetti() {
    const confettiContainer = document.getElementById("confetti-container");
    const colors = ["#f4b860", "#1a2461", "#ff6b9d", "#ffd700", "#51cf66", "#ff8c42", "#6366f1", "#ec4899"];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        
        // Random color
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random shape (square or small rectangle)
        const isRect = Math.random() > 0.5;
        if (isRect) {
            confetti.style.width = Math.random() * 6 + 4 + "px";
            confetti.style.height = Math.random() * 12 + 4 + "px";
        } else {
            const size = Math.random() * 8 + 6 + "px";
            confetti.style.width = size;
            confetti.style.height = size;
        }
        
        // Random horizontal position
        const startX = Math.random() * window.innerWidth;
        confetti.style.left = startX + "px";
        confetti.style.top = "-10px";
        
        // Random animation delay
        confetti.style.animationDelay = Math.random() * 0.5 + "s";
        
        // Add slight horizontal drift
        const drift = (Math.random() - 0.5) * 100;
        confetti.style.setProperty("--drift", drift + "px");
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => confetti.remove(), 3500);
    }
}
