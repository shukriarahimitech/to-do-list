const question = [
   {
    question: "What is your favorite programming language?",
    answers: [
            { text: "JavaScript",  correct: true },
            { text: "Python",  correct: false },
            { text: "C#",  correct: false },
            { text: "C++",  correct: false },
        ]
    }, 
    {
        question: "Where are you from?",
        answers: [
                { text: "Afghanistan",  correct: false },
                { text: "Iran",  correct: false },
                { text: "American",  correct: true },
                { text: "Turkey",  correct: false },
            ]
        }, 
        {
            question: "what is your native language?",
            answers: [
                    { text: "English",  correct: true },
                    { text: "Persian",  correct: false },
                    { text: "Russian",  correct: false },
                    { text: "Urdu",  correct: false },
                ]
            }, 
            {
                question: "Where did you study",
                answers: [
                        { text: "Harvard University",  correct: false },
                        { text: "Afghan University",  correct: false },
                        { text: "Balkh University",  correct: true },
                        { text: "Istanbul University ",  correct: false },
                    ]
                }                    
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {   
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButton.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";

}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
})
startQuiz();


