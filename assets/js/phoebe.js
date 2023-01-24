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

// Phoebe questions

let questions = [{
    question: "What did Phoebe's mom give her as a lesson before saying yes to surrogate her brother's kids?",
    choice1: 'doll',
    choice2: 'puppy',
    choice3: 'kitten',
    choice4: 'video cassettes',
    answer: 2,
},
{
    question: "Who was Phoebe's husband to Joey?",
    choice1: 'university friend',
    choice2: 'high-school friend',
    choice3: 'sports team mate',
    choice4: 'stranger from the café',
    answer: 4,
},
{
    question: "What was Phoebe's twin sister's job when the friends found out about her?",
    choice1: 'barista',
    choice2: 'waitress',
    choice3: 'porn star',
    choice4: 'actress',
    answer: 3,
},
{
    question: "What language Phoebe learned while living on the street?",
    choice1: 'French',
    choice2: 'Italian',
    choice3: 'Russian',
    choice4: 'Spanish',
    answer: 1,
},
{
    question: "Where did Phoebe meet his real dad?",
    choice1: 'Central Park',
    choice2: 'hospital',
    choice3: 'a funeral',
    choice4: 'the café',
    answer: 3,
},
{
    question: "How did Phoebe name Frank’s third child?",
    choice1: 'Joey',
    choice2: 'Chandler',
    choice3: 'Monica',
    choice4: 'Rachel',
    answer: 2,
},
{
    question: "What is the name of the lady in Phoebe’s painting?",
    choice1: 'Glenn',
    choice2: 'Linda',
    choice3: 'Gladys',
    choice4: 'Jennifer',
    answer: 3,
},
{
    question: "What caused the fire in Phoebe’s flat?",
    choice1: "Rachel’s hair straightener",
    choice2: 'candles',
    choice3: 'microwave',
    choice4: 'incense',
    answer: 1,
},
{
    question: "Who told Phoebe that Santa is not real?",
    choice1: 'her mom',
    choice2: 'Chandler',
    choice3: 'her teacher',
    choice4: 'Joey',
    answer: 4,
},
{
    question: "Who was paired up with a dog at Phoebes’ wedding?",
    choice1: 'Ross',
    choice2: 'Chandler',
    choice3: 'Gunther',
    choice4: "Mike’s friend",
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