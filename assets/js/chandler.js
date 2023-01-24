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

// Chandler questions

let questions = [{
    question: "Where was Chandler's dad's residency show?",
    choice1: 'New York',
    choice2: 'Los Angeles',
    choice3: 'New Orleans',
    choice4: 'Las Vegas',
    answer: 4,
},
{
    question: "On which holiday did Chandler's parents announced their divorce?",
    choice1: 'Christmas',
    choice2: 'Thanksgiving',
    choice3: 'Easter',
    choice4: '4th of July',
    answer: 2,
},
{
    question: "How old was Chandler when he had his first kiss?",
    choice1: '19',
    choice2: '21',
    choice3: '17',
    choice4: '15',
    answer: 1,
},
{
    question: "What is Chandler's mom's occupation?",
    choice1: 'doctor',
    choice2: 'actress',
    choice3: 'librarian',
    choice4: 'author',
    answer: 4,
},
{
    question: "How did Chandler prove his friendship to Joey?",
    choice1: 'break up with Kathy',
    choice2: 'sat in a box',
    choice3: 'invited him for a holiday',
    choice4: 'got him and audition',
    answer: 2,
},
{
    question: "What did Chandler and Monica decide to do in Las Vegas?",
    choice1: 'getting married',
    choice2: 'gamble',
    choice3: 'break up',
    choice4: 'help Joey',
    answer: 1,
},
{
    question: "Who showed up when Chandler planned to propose?",
    choice1: 'Janice',
    choice2: 'his dad',
    choice3: 'Richard',
    choice4: 'Kathy',
    answer: 3,
},
{
    question: "What did Chandler started to wear that everyone thought he always had?",
    choice1: "vests",
    choice2: 'glasses',
    choice3: 'watch',
    choice4: 'bracelet',
    answer: 2,
},
{
    question: "Where did Chandler stalk Janice?",
    choice1: 'West village',
    choice2: 'East village',
    choice3: 'Brooklyn',
    choice4: 'Chelsea',
    answer: 4,
},
{
    question: "Who did Chandler ask as his best man?",
    choice1: 'Ross',
    choice2: 'Gunther',
    choice3: "Joey",
    choice4: "Mike",
    answer: 1,
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