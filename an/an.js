const startTime = 8;
const startLives = 3;
let question;
let score;
let lives;
let timer;
let time;
let playing;

let classifier;
const classifierType = "SpeechCommands18w";
let speechWaiting;

async function setup() {
  listenToKeys();
  await loadClassifier();
  loadElement("new-game");
}

// Load the AI model here
async function loadClassifier() {
  classifier = await ml5.soundClassifier("SpeechCommands18w", {
    probabilityThreshold: 0.9
  });
  // Do the actual classification here
  // - emits a continual stream of data
  classifier.classify(delaySpeech);
}

// Without a delay it can here the same number multiple times
function delaySpeech(err, results) {
  if (!playing || speechWaiting) return;
  speechWaiting = true;
  gotSpeech(err, results);
  setTimeout(() => (speechWaiting = false), 600);
}

// Process the actual results
function gotSpeech(error, results) {
  const mainResult = results[0];

  const answer = convertLabelToNumber(mainResult.label);
  if (!answer) return;

  checkAnswer(answer);
}

function convertLabelToNumber(label) {
  if (label === "one") return 1;
  if (label === "two") return 2;
  if (label === "three") return 3;
  if (label === "four") return 4;
  if (label === "five") return 5;
  if (label === "six") return 6;
  if (label === "seven") return 7;
  if (label === "eight") return 8;
  if (label === "nine") return 9;
}

function newGame() {
  playing = true;
  score = 0;
  lives = startLives;
  loadElement("playing");
  startTimer();
  updateScore();
  updateLives();
  newQuestion();
}

function newQuestion() {
  if (score < 5) {
    generateQuestion(false);
    return updateBasicQuestion();
  } else if (score < 10) {
    generateQuestion(false);
    return updateQuestion();
  }
  generateQuestion(true);
  return updateQuestion();
}

function generateQuestion(includeConstant) {
  const answer = Math.floor(Math.random() * 9 + 1);
  const constant = includeConstant ? Math.floor(Math.random() * 9 + 1) : 0;
  const left = Math.floor(Math.random() * 11 + 1);

  const right = left * answer + constant;
  question = {
    answer,
    left,
    right,
    constant
  };
}

function checkAnswer(answer) {
  if (parseInt(answer) === question.answer) {
    score = score + 1;
  } else {
    lives = lives - 1;
  }
  if (lives <= 0) {
    return gameOver();
  }
  resetTimer();
  updateScore();
  updateLives();
  newQuestion();
}

function startTimer() {
  time = startTime;
  timer = setInterval(() => {
    time = time - 0.1;
    if (time <= 0) {
      checkAnswer();
    }
    updateTimer();
  }, 100);
}

function resetTimer() {
  const adjustedTime = startTime - score / 5;
  time = adjustedTime > 1 ? adjustedTime : 1;
}

function updateTimer() {
  const time2sf = (Math.round(time * 10) / 10).toFixed(1);
  document.getElementById("timer").innerHTML = `Time: ${time2sf}`;
}

function updateScore() {
  document.getElementById("score").innerHTML = `Score: ${score}`;
}

function updateLives() {
  document.getElementById("lives").innerHTML = `Lives: ${lives}`;
}

function updateQuestion() {
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const constantPart = question.constant ? ` + ${question.constant}` : "";
  document.getElementById("question").innerHTML = `${
    question.left
  }${letter}${constantPart} = ${question.right}`;
  document.getElementById("question2").innerHTML = `${letter} = ?`;
}

function updateBasicQuestion() {
  document.getElementById("question").innerHTML = `${question.right} &#247; ${
    question.left
  } = ?`;
  document.getElementById("question2").innerHTML = ``;
}

function updateAnswer(answer) {
  document.getElementById("question").innerHTML = `answer: ${answer}`;
}

function gameOver() {
  playing = false;
  loadElement("game-over");
  document.getElementById("final-score").innerHTML = score;
  clearInterval(timer);
}

function loadElement(id) {
  hideAll();
  document.getElementById(id).style.display = "initial";
}

function hideAll() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("game-over").style.display = "none";
  document.getElementById("new-game").style.display = "none";
  document.getElementById("playing").style.display = "none";
}

function listenToKeys() {
  document.body.addEventListener("keydown", e => {
    checkAnswer(e.key);
  });
}
document.addEventListener("DOMContentLoaded", setup, false);
