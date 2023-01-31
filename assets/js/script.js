const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const chooseButton = document.getElementById('choose-button');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const music = document.getElementById("myAudio");
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const correctAnswersText = document.getElementById('correct-answers');
const progressBarFull = document.getElementById('progressbar-full');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
const SCORE_POINTS = 1;
const MAX_QUESTIONS = 10;

// Quiz questions

const quiz = [{
        characterName: "Rachel Greene",
        questions: [{
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
        ]
    },
    {
        characterName: "Monica Geller",
        questions: [{
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
                question: "Who did Monica and Chandler meet in Connecticut?",
                choice1: "Monica's mom",
                choice2: 'Janice',
                choice3: 'Richard',
                choice4: "Chandler's boss",
                answer: 2,
            },
        ]
    },
    {
        characterName: "Phoebe Buffay",
        questions: [{
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
        ]
    },
    {
        characterName: "Ross Geller",
        questions: [{
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
        ]
    },
    {
        characterName: "Chandler Bing",
        questions: [{
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
        ]
    },
    {
        characterName: "Joey Tribbiani",
        questions: [{
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
        ]
    }
];

document.addEventListener("DOMContentLoaded", function () {
    console.log('here')
    choices.forEach((choice) => {
        choice.addEventListener("click", (e) => checkAnswer(e));
    });

    /**
     * start the choosen character's quiz array
     **  */

    loadCharacters();
    showCharacters()
    // startGame();
});

// Choose a friend button audio
let playSoundTrack = function () {
    music.play();
};
let stopSoundTrack = function () {
    music.pause();
};

chooseButton.addEventListener('click', playMySoundtrack);

playBtn.addEventListener('click', playSoundTrack, false);
stopBtn.addEventListener('click', stopSoundTrack, false);

function playMySoundtrack() {

    music.play();
};

// load the character names

function loadCharacters() {
    const characters = document.getElementsByClassName("btn-character");

    for (let character of characters) {
        console.log(character)
        character.addEventListener("click", () => startGame(character.textContent));
    }

    console.log('here')

    for (let i = 0; i < 6; i++) {
        characters[i].innerText = quiz[i].characterName;
        // characters[i].innerText ="hello";
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
 * Start the quiz
 * */
function startGame(characterName) {
    console.log(characterName)
    // show the quiz window
    displayWindow("quiz-window");

    //getting questions for the selected character 

    const character = quiz.find(c => c.characterName === characterName);

   /* const character = ""; 
    for (let i = 0; i < quiz.length; i++) { 
        if (quiz[i].characterName === characterName) { 
            character = quiz[i]; 
            break; 
        } } */

    availableQuestions = character.questions;

    getNewQuestion();
}

/** 
 * New Question 
 * */
function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        //giving an encouraging message
        let correctAnswers = document.getElementById("correct-answers").innerText
        if (correctAnswers > 7) {
            document.getElementById("correct-answers").innerText = "End of the quiz!\n Hooray !! You are a true friend!"
        } else {
            document.getElementById("correct-answers").innerText = "End of the quiz!\n Better Luck next time!"
        }
        return;
    }

    // Shows the player which question they are at and their progess

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    // Questions and answers

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;
    let number = 0
    choices.forEach((choice) => {
        number++


        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
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
        getNewQuestion();
    }, 800); //milliseconds after the new question will appear

}
/**
 *  Gets the current score from the DOM and increments it
 */
function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerText);
    oldScore++
    document.getElementById("score").innerText = oldScore;
    document.getElementById("correct-answers").innerText = 'Correct Answers:  ' + oldScore;
}

/**
 * To show the home page with the choosing window when the user wants to go back to the beginning
 */
let goHome = function showCharacters() {
    displayWindow("choosing-window");
}

homebtn.addEventListener('click', showCharacters, false);
