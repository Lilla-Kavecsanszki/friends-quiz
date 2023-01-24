const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressbar-full');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//Load the page then start running the game

document.addEventListener("DOMContentLoaded", function () {
    startGame();
});

// Joey questions

let questions = [{
    question: "How many sisters does Joey have?",
    choice1: '2',
    choice2: '4',
    choice3: '5',
    choice4: '7',
    answer: 4,
},
{
    question: "What is Joey's heritage?",
    choice1: 'Italian-American',
    choice2: 'Canadian',
    choice3: 'Irish-American',
    choice4: 'Mexican',
    answer: 1,
},
{
    question: "What kind of movie Joey shoots during Monica and Chandler's wedding?",
    choice1: 'zombie movie',
    choice2: 'period drama',
    choice3: 'war movie',
    choice4: 'romcom',
    answer: 3,
},
{
    question: "What did Joey sell in Las Vegas while his movie was on a break?",
    choice1: 'insurance',
    choice2: 'perfume',
    choice3: 'clothes',
    choice4: 'cars',
    answer: 2,
},
{
    question: "What animal is Joey's favourite plush toy?",
    choice1: 'hedgehog',
    choice2: 'dog',
    choice3: 'penguin',
    choice4: 'bear',
    answer: 3,
},
{
    question: "Where did Joey move after New York?",
    choice1: 'Italy',
    choice2: 'London',
    choice3: 'Los Angeles',
    choice4: 'Las Vegas',
    answer: 3,
},
{
    question: "What did Joey buy by a mistake on a charity ball?",
    choice1: 'car',
    choice2: 'boat',
    choice3: 'house',
    choice4: 'plastic dog',
    answer: 2,
},
{
    question: "What is Joey's favourite sandwich?",
    choice1: "meat ball",
    choice2: 'ham and cheese',
    choice3: 'tuna',
    choice4: 'sausage and bacon',
    answer: 1,
},
{
    question: "Who is Joey's first love?",
    choice1: 'Monica',
    choice2: 'Rachel',
    choice3: 'Kathy',
    choice4: 'Emily',
    answer: 2,
},
{
    question: "What language Joey lied about on his CV?",
    choice1: 'Italian',
    choice2: 'Spanish',
    choice3: "French",
    choice4: "Portuguese",
    answer: 3,
},
];

// points for each questions and maximum quiestions

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

/**
 * Start a new quiz
 * */

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

/** 
 * New Question and save end  score
 * */

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/final-score.html');
    }

    // Shows the player which question they are at and their progess

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    // Questions and answers

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
}

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = (e).target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correctanswer" : "wronganswer";

        if (classToApply === 'correctanswer') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        /**
         * Set Time Out to step for new question
         */

        const timeoutId = setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 800); //milliseconds after the new question will appear
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();