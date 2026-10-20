const TIMER_MINUTES_KEY = "pomodoroTimerMinutes";
const DEFAULT_MINUTES = 25;

function getInitialTime() {
  const savedMinutes = Number(localStorage.getItem(TIMER_MINUTES_KEY));

  if (Number.isInteger(savedMinutes) && savedMinutes >= 1 && savedMinutes <= 60) {
    return savedMinutes * 60;
  }

  return DEFAULT_MINUTES * 60;
}

let remainingTime = getInitialTime();
let timerId = null;

const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-button");

function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  minutesElement.textContent = formattedMinutes;
  secondsElement.textContent = formattedSeconds;
  timerElement.setAttribute(
    "aria-label",
    `남은 시간 ${minutes}분 ${seconds}초`,
  );
  document.title = `${formattedMinutes}:${formattedSeconds} · Pomodoro`;
}

function startTimer() {
  if (timerId !== null || remainingTime === 0) {
    return;
  }

  startButton.disabled = true;
  timerId = window.setInterval(() => {
    remainingTime -= 1;
    updateTimerDisplay();

    if (remainingTime === 0) {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }

  startButton.disabled = remainingTime === 0;
}

function resetTimer() {
  stopTimer();
  remainingTime = getInitialTime();
  startButton.disabled = false;
  updateTimerDisplay();
}

window.addEventListener("storage", (event) => {
  if (event.key === TIMER_MINUTES_KEY) {
    resetTimer();
  }
});

updateTimerDisplay();
