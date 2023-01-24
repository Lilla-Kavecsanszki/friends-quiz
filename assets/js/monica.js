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

// Monica questions

let questions = [{
    question: 'How many categories of towels does Monica have?',
    choice1: '5',
    choice2: '9',
    choice3: '11',
    choice4: '20',
    answer: 3,
},
{
    question: "Who was Monica's first love to her dad?",
    choice1: 'employee',
    choice2: 'tennis coach',
    choice3: 'friend ',
    choice4: 'student',
    answer: 3,
},
{
    question: "What colour was Monica's fake nail that she lost in a quiche at her mom's party?",
    choice1: 'red',
    choice2: 'green',
    choice3: 'black',
    choice4: 'blue',
    answer: 4,
},
{
    question: "Which famous movie star's hair style Monica asked from Phoebe to cut for her?",
    choice1: 'Demi Moor',
    choice2: 'Dudley Moore',
    choice3: 'Halley Berry',
    choice4: 'Christy Turlington',
    answer: 1,
},
{
    question: "What occupation did Monica lie for herself on the adoption interview?",
    choice1: 'teacher',
    choice2: 'priest',
    choice3: 'chef',
    choice4: 'lawyer',
    answer: 2,
},
{
    question: "What type of class Monia sneaks in with Joey after her bad review?",
    choice1: 'acting',
    choice2: 'cooking',
    choice3: 'cleaning',
    choice4: 'writing',
    answer: 2,
},
{
    question: 'What does Monica keep in her secret room?',
    choice1: 'her shoes',
    choice2: 'her cleaning products',
    choice3: 'her mess',
    choice4: 'her old clothes',
    answer: 3,
},
{
    question: 'What did Monica find out on her wedding?',
    choice1: "she's pregnant",
    choice2: "Phoebe's pregnant",
    choice3: "her sister is pregnant",
    choice4: "Rachel's pregnant",
    answer: 4,
},
{
    question: "Who did Monica invite over for Thanksgiving?",
    choice1: "Ross's old high school friend",
    choice2: "her boss",
    choice3: "Rachel's sister",
    choice4: "Ross's ex",
    answer: 1,
},
{
    question: "Who did Monica and Candler meet in Connecticut?",
    choice1: "Monica's mom",
    choice2: 'Janice',
    choice3: 'Richard',
    choice4: "Chandler's boss",
    answer: 2,
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
         * Set Time Out in case the user is thinking for too long, the program will load a new game
         */

        const timeoutId = setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000); //minute
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();