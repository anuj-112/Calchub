const generateBtn = document.getElementById('generate');
const checkBtn = document.getElementById('check');
const questionsDiv = document.getElementById('questions');
const scoreDisplay = document.getElementById('score');

let questions = [];

// Generate random integer between min and max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate 5 random questions
function generateQuestions() {
    questions = [];
    questionsDiv.innerHTML = '';
    scoreDisplay.innerHTML = '';

    const operations = ['+', '-', '×', '÷'];

    for (let i = 0; i < 5; i++) {
        const num1 = randomInt(1, 50);
        const num2 = randomInt(1, 50);
        const op = operations[randomInt(0, operations.length - 1)];

        // Avoid division by zero
        const divisor = (op === '÷' && num2 === 0) ? 1 : num2;

        const question = {num1, num2: divisor, op};
        questions.push(question);

        const div = document.createElement('div');
        div.innerHTML = `
            <label>Q${i+1}: ${question.num1} ${question.op} ${question.num2} = </label>
            <input type="number" class="answer" data-index="${i}" placeholder="Your answer">
        `;
        questionsDiv.appendChild(div);
    }
}

// Check user answers
function checkAnswers() {
    const answers = document.querySelectorAll('.answer');
    let score = 0;
    let resultText = '';

    answers.forEach(input => {
        const index = parseInt(input.dataset.index);
        const userAnswer = parseFloat(input.value);
        const q = questions[index];
        let correct;

        switch(q.op) {
            case '+': correct = q.num1 + q.num2; break;
            case '-': correct = q.num1 - q.num2; break;
            case '×': correct = q.num1 * q.num2; break;
            case '÷': correct = parseFloat((q.num1 / q.num2).toFixed(2)); break;
        }

        if (userAnswer === correct) {
            score++;
            resultText += `Q${index+1}: Correct ✅<br>`;
        } else {
            resultText += `Q${index+1}: Wrong ❌ (Correct: ${correct})<br>`;
        }
    });

    scoreDisplay.innerHTML = `<strong>Score: ${score}/5</strong><br>${resultText}`;
}

// Event listeners
generateBtn.addEventListener('click', generateQuestions);
checkBtn.addEventListener('click', checkAnswers);
