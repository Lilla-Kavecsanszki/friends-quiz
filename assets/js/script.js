/* jshint esversion: 6 */

let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0;
let availableQuestions = [];
const SCORE_POINTS = 1;
const MAX_QUESTIONS = 10;

document.addEventListener("DOMContentLoaded", function () {

    const homebtn = document.getElementById('homebtn');
    const choices = Array.from(document.getElementsByClassName('choice-text'));

    for (let choice of choices) {
        choice.addEventListener("click", checkAnswer);
    }

    /**
     * start the choosen character's quiz array
     **  */
    loadCharacters();
    showCharacters();
    // this is to start the game, as well

    // Choose a friend button audio
    let playSoundTrack = function () {
        const music = document.getElementById("myAudio");
        music.play();
    };
    let stopSoundTrack = function () {
        const music = document.getElementById("myAudio");
        music.pause();
    };

    const chooseButton = document.getElementById('choose-button');
    const playBtn = document.getElementById('play');
    const stopBtn = document.getElementById('stop');
    chooseButton.addEventListener('click', playMySoundtrack);
    playBtn.addEventListener('click', playSoundTrack, false);
    stopBtn.addEventListener('click', stopSoundTrack, false);

    /**
     * To show the home page with the choosing window when the user wants to go back to the beginning
     */
    let goHome = function showCharacters() {
        displayWindow("choosing-window");
    };

    homebtn.addEventListener('click', showCharacters, false);
});

function playMySoundtrack() {
    const music = document.getElementById("myAudio");
    music.play();
}

// load the character names 
function loadCharacters() {
    const characters = document.getElementsByClassName("btn-character");

    for (let character of characters) {
        character.addEventListener("click", function () {
            startGame(character.textContent);
        });
    }

    for (let i = 0; i < 6; i++) {
        characters[i].innerText = quiz[i].characterName;
        characters[i].style.display = "inline";
    }
}

/**
 * Flip the windows where the game/ the screen meant to be at the moment
 * windowName = id of the window which should be visible at the moment
 */
function displayWindow(windowName) {
    let windows = document.getElementsByClassName("window");
    for (let window of windows) {
        if (window.id === windowName) {
            window.style.display = "block";
        } else window.style.display = "none";
    }
}

/**
 * show the list of characters to choose from
 */
function showCharacters() {
    displayWindow("choosing-window");
}

/**
 *  show the final result 
 */
function showResults() {
    displayWindow("final-results-window");
}

/**
 * Start the quiz
 * */
function startGame(characterName) {

    const question = document.getElementById('question');
    // show the quiz window
    displayWindow("quiz-window");

    //getting questions for the selected character 
    let character = "";
    for (let i = 0; i < quiz.length; i++) {
        if (quiz[i].characterName === characterName) {
            character = quiz[i];
            break;
        }
    }

    availableQuestions = [...character.questions];

    nextStep();
}

/** 
 * New Question 
 * */
function getNewQuestion() {

    const question = document.getElementById('question');
    const choices = Array.from(document.getElementsByClassName('choice-text'));
    const progressText = document.getElementById('progress-text');
    const progressBarFull = document.getElementById('progressbar-full');
    // Shows the player which question they are at and their progess
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    // Questions and answers
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;
    let number = 0;
    for (let i = 0; i < choices.length; i++) {
        number++;
        choices[i].innerText = currentQuestion['choice' + number];
    }

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
}


/**
 * end the game and show final result 
 */
function endGame() {
    questionCounter = 0;
    displayWindow("final-results-window");

    //giving final score
    let result = document.getElementById("result").innerText;

    //giving an encouraging message
    let correctAnswers = document.getElementById("score").innerText;
    document.getElementById("score").innerText = '0';
    if (correctAnswers > 7) {
        document.getElementById("correct-answers").innerText = "End of the quiz!\n Hooray !! You are a true friend!";
    } else if (correctAnswers > 4) {
        document.getElementById("correct-answers").innerText = "End of the quiz!\n Not bad!";
    } else {
        document.getElementById("correct-answers").innerText = "End of the quiz!\n Better Luck next time!";
    }
    return;
}

/**
 * decides whether the game ends or needs a new question
 */
function nextStep() {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        endGame();
    } else {
        getNewQuestion();
    }
}

/**
 * Checking the correct answer 
 */
function checkAnswer(e) {
    
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
        nextStep();
    }, 800); //milliseconds after the new question will appear

}

/**
 *  Gets the current score from the DOM and increments it
 */
function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerText);
    oldScore++;
    document.getElementById("score").innerText = oldScore;
    document.getElementById("result").innerText = 'Correct Answers:  ' + oldScore;
}