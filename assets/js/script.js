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

let questions = [
    {
        question: 'What plastic surgery did Rachel have in high school?',
        choice1: 'breast',
        choice2: 'nose',
        choice3: 'ears',
        choice4: 'eyes',
        answer:
    },
    {
        question: 'How old was Rachel when she broke up with Tag?',
        choice1: '25',
        choice2: '32',
        choice3: '28',
        choice4: '30',
        answer:
    },
    {
        question: "Where was Rachel's first date with Ross?",
        choice1: 'museum',
        choice2: 'café',
        choice3: 'restaurant',
        choice4: 'cinema',
        answer:
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
        question: "What did Rachel shape Emma’s birthday cake into?",
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
        answer:
    },
    {
        question: 'What did Gavin bring to Rachel after they kissed?',
        choice1: 'scarf',
        choice2: 'jewellery',
        choice3: 'soup',
        choice4: 'medicine',
        answer:
    },
    {
        question: "What is Rachel’s ex-fiancé’s occupation?",
        choice1: 'dentist',
        choice2: 'doctor',
        choice3: 'lawyer',
        choice4: 'accountant',
        answer:
    },
    {
        question: "What is Rachel’s favourite flower?",
        choice1: 'rose',
        choice2: 'daisy',
        choice3: 'tulip',
        choice4: 'lily',
        answer:
    },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startGame () {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    questionCounter ++;
    progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(question/MAX_QUESTIONS)*100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question

    choices.forEach(choice {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    })  

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers === true;
}

choices.forEach(choice {
    choice.addEventListener('click', e {
        if(!acceptingAnswers) 
        return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer === currentQuestion.answer ? 'correctanswer' : 'wronganswer';

        if(classToApply === 'correctanswer') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeOut(() {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
})

incrementScore = num {
    score += num;
    scoreText.innerText = score;
}