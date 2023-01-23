const user = document.getElementById("user");
const saveButton = document.getElementById("finalscorebutton");
const finalScore = document.getElementById("final-score");
const mostRecentScore = document.getElementById("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 3;
finalScore.innerText = mostRecentScore;

user.addEventListener('keyup',() => {
    finalscorebutton.disabled = !user.value
})

saveHighScore = e => {
    e.preventDefault ()

    const score = {
        score: mostRecentScore,
        name: user.value,
    }
highScores.push(score);

highScores.sort((a,b) => {
    return b.score - a.score;
});
highScores.splice(3);

localStorage.setItem('highScores', JSON.stringify(highScores));
window.location.assign('/')
}