const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById("question-container");

const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizScore = 0;
    
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    document.getElementById('right-answers').innerText = quizScore;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct; // Set correct attribute properly

        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');

    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true"; // Ensure proper boolean conversion

    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }

    if (correct) {
        quizScore += 1;
    }
    document.getElementById('right-answers').innerText = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: "Which of these is a JavaScript framework?",
        answers: [
            { text: 'React', correct: false },
            { text: 'Angular', correct: true },
            { text: 'Vue', correct: false },
            { text: 'Django', correct: false }
        ]
    },
    {
        question: "Which language is primarily used for styling web pages?",
        answers: [
            { text: 'JavaScript', correct: false },
            { text: 'CSS', correct: true },
            { text: 'Python', correct: false },
            { text: 'C++', correct: false }
        ]
    },
    {
        question: "Which of the following is a back-end language?",
        answers: [
            { text: 'HTML', correct: false },
            { text: 'CSS', correct: false },
            { text: 'JavaScript', correct: false },
            { text: 'Python', correct: true }
        ]
    },
    {
        question: "Which of these is a database management system?",
        answers: [
            { text: 'Node.js', correct: false },
            { text: 'MongoDB', correct: true },
            { text: 'React', correct: false },
            { text: 'Express', correct: false }
        ]
    }
];
