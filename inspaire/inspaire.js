let img;
let classifier;
const classifierType = 'Darknet'; // 'MobileNet' | Darknet' | 'Darnet-tiny'

async function setup() {
  // Setup ml5 here
  classifier = await ml5.imageClassifier(classifierType);
  await newImg();
}

// Do the AI bit here
async function classify() {
  const results = await classifier.classify(img);
  console.log(results);
  
  printResult(results);
  speakResults(results);
}


// Loading images
async function newImg() {
  documentLoading();
  img = await loadImg();
  document.getElementById('result').innerHTML = '';
  documentReady();
}

function loadImg() {
  return new Promise((resolve, reject) => {
    const img = document.getElementById("img");
    img.crossOrigin = "anonymous";
    const x = Math.round(200 + 300 * Math.random());
    const y = Math.round(200 + 300 * Math.random());
    img.src = `https://picsum.photos/${x}/${y}`;
    img.onload = () => resolve(img)
    img.onerror = reject;
  });
}


// Set loading / unloading
function documentReady() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("content").style.display = "initial";
}

function documentLoading() {
  document.getElementById("content").style.display = "none";
  document.getElementById("loading").style.display = "initial";
}

document.addEventListener("DOMContentLoaded", setup, false);


// Speaking section
function speakResults(results) {
  results.forEach((val) => {
    say(val.label);
  });
}

function say(m) {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[5];
  msg.volume = 1;
  msg.rate = 1;
  msg.pitch = 0.8;
  msg.text = m;
  speechSynthesis.speak(msg);
}

// Printing section
function printResult(results) {
  const mainResults = results[0].label;
  const firstWord = mainResults.split(',')[0];
  document.getElementById('result').innerHTML = firstWord;
}

