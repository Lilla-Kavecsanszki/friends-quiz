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

// Ross questions

let questions = [{
    question: "What is Ross' ex-wife's name?",
    choice1: 'Karen',
    choice2: 'Carol',
    choice3: 'Katy',
    choice4: 'Cassie',
    answer: 2,
},
{
    question: "How did Ross get to his class on time to the other side of the city?",
    choice1: 'by cab',
    choice2: 'on the subway',
    choice3: 'by roller skating',
    choice4: 'running',
    answer: 3,
},
{
    question: "What did Ross learn during the end of his first marriage?",
    choice1: 'karate',
    choice2: 'tai chi',
    choice3: 'taekwondo',
    choice4: 'krav maga',
    answer: 1,
},
{
    question: "Where did Ross started dating Charlie?",
    choice1: 'London',
    choice2: 'Barbados',
    choice3: 'Hawaii',
    choice4: 'China',
    answer: 2,
},
{
    question: "What did Ross dress up as for Halloween?",
    choice1: 'Indiana Jones',
    choice2: 'Superman',
    choice3: 'Spaceman',
    choice4: 'Sputnik',
    answer: 4,
},
{
    question: "Whom after did Ross and Susan name their son?",
    choice1: 'his dad',
    choice2: 'hospital janitor',
    choice3: 'his favourite scientist',
    choice4: 'cab driver',
    answer: 2,
},
{
    question: "What pet did Ross' messy girlfriend have?",
    choice1: 'rabbit',
    choice2: 'cat',
    choice3: 'snake',
    choice4: 'hamster',
    answer: 4,
},
{
    question: "What did Ross get when he started dating Emily?",
    choice1: "earring",
    choice2: 'watch',
    choice3: 'book',
    choice4: 'plane ticket',
    answer: 1,
},
{
    question: "What language did Ross start to learn to get his new apartment?",
    choice1: 'Russian',
    choice2: 'Croatian',
    choice3: 'Dutch',
    choice4: 'German',
    answer: 3,
},
{
    question: "What did Ross buy for Phoebe that she never had as a kid?",
    choice1: 'globe',
    choice2: 'doll',
    choice3: "rubik's cube",
    choice4: "bicycle",
    answer: 4,
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