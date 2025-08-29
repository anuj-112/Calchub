// Grab elements
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const resultDisplay = document.getElementById('result');
const resultList = document.getElementById('result-list');
const button = document.querySelector('button');

// Array to store results
let results = [];

// Function to calculate division
function calculate() {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);

    if (isNaN(num1) || isNaN(num2)) {
        resultDisplay.innerHTML = '<span style="color:#ff4d4d;">Please enter valid numbers!</span>';
        return;
    }

    if (num2 === 0) {
        resultDisplay.innerHTML = '<span style="color:#ff4d4d;">Division by zero is not allowed!</span>';
        return;
    }

    const quotient = (num1 / num2).toFixed(2);
    const resultText = `${num1} ÷ ${num2} = ${quotient}`;

    // Add to results array
    results.push(resultText);

    // Display latest result
    resultDisplay.innerHTML = `<span style="color:#00ffea; font-weight:bold;">Latest: ${resultText}</span>`;

    // Update full result list
    renderResults();
}

// Function to render all results
function renderResults() {
    resultList.innerHTML = '';
    results.forEach(res => {
        const li = document.createElement('li');
        li.textContent = res;
        resultList.appendChild(li);
    });
}

// Function to reset result when input changes
function resetResult() {
    resultDisplay.innerHTML = '';
}

// Event listeners
button.addEventListener('click', calculate);
num1Input.addEventListener('input', resetResult);
num2Input.addEventListener('input', resetResult);

// Enter key support
[num1Input, num2Input].forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
});
