let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function start() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(update, 1);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.textContent = '00:00:00';
  laps = [];
  renderLaps();
}

function lap() {
  if (running) {
    laps.push(display.textContent);
    renderLaps();
  }
}

function update() {
  updatedTime = new Date().getTime() - startTime;
  let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
  let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
  let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
  return ('0' + unit).slice(-2);
}

function renderLaps() {
  lapsContainer.innerHTML = laps.map(lap => `<div>${lap}</div>`).join('');
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
