import { roundsData } from "./data.js";

// Global scores
let team1Score = 0;
let team2Score = 0;

const cards = document.querySelectorAll('.card');
const dataset = roundsData;

let currentRound = 0;
let currentRoundScore = 0;

let dingSFX = new Audio('./assets/sound/ding.mp3');

function initialize(){
  loadQuestion(dataset[currentRound]);

  // Click event for each card
  cards.forEach(card => {
    card.addEventListener('click', () => toggleCard(card))
  })
}

function toggleCard(card){
  {
    let correctSFX = new Audio('./assets/sound/correct.wav');

    card.classList.toggle('flipped');
    const points = parseInt(card.dataset.points);

    if (card.classList.contains('flipped')) {
      currentRoundScore += points;
      correctSFX.play();
    } else {
      currentRoundScore -= points;
    }

    updateScoreDisplay();
  }
}

function loadQuestion(data){
  let questionElement = document.getElementById('question');
  questionElement.textContent = `${data.question}`;

  data.answers.forEach((answer, index) => {

    if(cards[index]){
      const backSpans = cards[index].querySelectorAll('.card-back span');
      if (backSpans.length >=2) {
        backSpans[0].textContent = answer.text;
        backSpans[1].textContent = answer.points;
        cards[index].dataset.points = answer.points;
      }

      if(answer.text != null){
        let rank = cards[index].querySelector('.rank');
        rank.textContent = index + 1;
      }
    }
  })
}

function updateScoreDisplay(){
  document.querySelector('.team1-score').textContent = team1Score;
  document.querySelector('.team2-score').textContent = team2Score;
  document.querySelector('.round-score').textContent = currentRoundScore;
}

// Add event listeners to buttons
document.getElementById('team1-add').addEventListener('click', addScoreToTeam1);
document.getElementById('team2-add').addEventListener('click', addScoreToTeam2);
document.getElementById('wrong-answer').addEventListener('click', wrongAnswer);
document.getElementById('next-round').addEventListener('click', nextRound);
document.getElementById('reset-round').addEventListener('click', resetRound);
document.getElementById('reset-game').addEventListener('click', resetGame);
document.getElementById('get-points').addEventListener('click', winSFX);
document.getElementById('theme-sound').addEventListener('click', themeSFX);

function winSFX(){
  let getPointsSFX = new Audio("./assets/sound/get-points.wav");
  getPointsSFX.play();
}

function themeSFX(){
  let themeSound = new Audio("./assets/sound/theme.wav");
  themeSound.play();
}

function addScoreToTeam1() {
  dingSFX.play();
  team1Score += currentRoundScore;
  currentRoundScore = 0;
  updateScoreDisplay();
}

function addScoreToTeam2() {
  dingSFX.play();
  team2Score += currentRoundScore;
  currentRoundScore = 0;
  updateScoreDisplay();
}

function nextRound(){
  currentRound++;

  if (currentRound >= dataset.length) {
    currentRound = 0; // or stop the game / show a message
    alert("End of Game")
  }
  
  resetRound();
  
  // Load next question
  loadQuestion(dataset[currentRound]);
}

function resetRound(){
  // Reset flipped cards
  cards.forEach(card => card.classList.remove('flipped'));

  //Reset currentRoundScore
  currentRoundScore = 0;
  updateScoreDisplay();
}

function resetGame(){
  resetRound();

  team1Score = 0;
  team2Score = 0;

  updateScoreDisplay();

  // Load first question
  currentRound = 0;
  loadQuestion(dataset[currentRound]);
}

function wrongAnswer(){
  let wrongSFX = new Audio('./assets/sound/wrong.wav');
  wrongSFX.play();

  let wrongElement = document.getElementById('wrong-x');
  
  wrongElement.style.display = "block";

  setTimeout(() => {
    wrongElement.style.display = "none";
  }, 1300); // flashes for 1 second

}

document.addEventListener('DOMContentLoaded', initialize);