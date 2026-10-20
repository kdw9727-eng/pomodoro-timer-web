const TIMER_MINUTES_KEY = "pomodoroTimerMinutes";
const DEFAULT_MINUTES = 25;

const settingForm = document.getElementById("setting-form");
const timerMinutesInput = document.getElementById("timer-minutes");
const saveButton = document.getElementById("save-button");

function getSavedMinutes() {
  const savedMinutes = Number(localStorage.getItem(TIMER_MINUTES_KEY));

  if (Number.isInteger(savedMinutes) && savedMinutes >= 1 && savedMinutes <= 60) {
    return savedMinutes;
  }

  return DEFAULT_MINUTES;
}

function isValidTimerValue() {
  const inputValue = timerMinutesInput.value.trim();
  const minutes = Number(inputValue);

  return (
    inputValue !== "" &&
    Number.isInteger(minutes) &&
    minutes >= 1 &&
    minutes <= 60
  );
}

function updateSaveButton() {
  saveButton.disabled = !isValidTimerValue();
}

timerMinutesInput.value = getSavedMinutes();
updateSaveButton();

timerMinutesInput.addEventListener("input", updateSaveButton);

settingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isValidTimerValue()) {
    updateSaveButton();
    return;
  }

  localStorage.setItem(TIMER_MINUTES_KEY, timerMinutesInput.value.trim());
  window.location.href = "index.html";
});
