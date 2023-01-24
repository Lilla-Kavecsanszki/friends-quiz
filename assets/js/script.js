const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const chooseButton = document.getElementById('choose-button');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');

const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressbar-full');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Choose a friend button audio

chooseButton.addEventListener('click', playMySoundtrack); 

function playMySoundtrack() {
    const music = document.getElementById("myAudio");
    music.play();
} ;

const music = document.getElementById("myAudio");
let playSoundTrack = function() {music.play();};
let stopSoundTrack = function() {music.pause();};

playBtn.addEventListener('click', playSoundTrack, false);
stopBtn.addEventListener('click', stopSoundTrack, false);


//Load the page then start running the game

document.addEventListener("DOMContentLoaded", function () {
    startGame();
});

// Rachel questions

let questions = [{
        question: 'What plastic surgery did Rachel have in high school?',
        choice1: 'breast',
        choice2: 'nose',
        choice3: 'ears',
        choice4: 'eyes',
        answer: 2,
    },
    {
        question: 'How old was Rachel when she broke up with Tag?',
        choice1: '25',
        choice2: '32',
        choice3: '28',
        choice4: '30',
        answer: 4,
    },
    {
        question: "Where was Rachel's first date with Ross?",
        choice1: 'museum',
        choice2: 'café',
        choice3: 'restaurant',
        choice4: 'cinema',
        answer: 1,
    },
    {
        question: "What is Rachel's kid's name?",
        choice1: 'Ruth',
        choice2: 'James',
        choice3: 'Emma',
        choice4: 'River',
        answer: 3,
    },
    {
        question: "Where was Rachel's dream job that she got offered after Ralph Lauren?",
        choice1: 'Barcelona',
        choice2: 'London',
        choice3: 'Milan',
        choice4: 'Paris',
        answer: 4,
    },
    {
        question: "What did Rachel shape Emma's birthday cake into?",
        choice1: 'flower',
        choice2: 'bunny',
        choice3: 'bow',
        choice4: 'kitty',
        answer: 2,
    },
    {
        question: 'Why did Rachel get in trouble with the police?',
        choice1: 'stealing',
        choice2: 'tax fraud',
        choice3: 'jaywalking',
        choice4: 'speeding',
        answer: 4,
    },
    {
        question: 'What did Gavin bring to Rachel after they kissed?',
        choice1: 'scarf',
        choice2: 'jewellery',
        choice3: 'soup',
        choice4: 'medicine',
        answer: 3,
    },
    {
        question: "What is Rachel's ex-fiancé's occupation?",
        choice1: 'dentist',
        choice2: 'doctor',
        choice3: 'lawyer',
        choice4: 'accountant',
        answer: 1,
    },
    {
        question: "What is Rachel's favourite flower?",
        choice1: 'rose',
        choice2: 'daisy',
        choice3: 'tulip',
        choice4: 'lily',
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

        return window.location.assign('final-score.html');
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
         * */

        const myTimeout = setTimeout(function () {
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