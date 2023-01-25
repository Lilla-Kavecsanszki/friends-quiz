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