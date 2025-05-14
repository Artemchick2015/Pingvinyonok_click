// --- АВТОЗБЕРЕЖЕННЯ ---
function autoSaveGame() {
  localStorage.setItem("coins", count);
  localStorage.setItem("coinsPerClick", coinsPerClick);
  localStorage.setItem("passiveIncome", passiveIncome);
}
window.addEventListener("beforeunload", autoSaveGame);
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "hidden") autoSaveGame();
});
let coins = 0;
let coinsPerClick = 1;
let passiveIncome = false;

const coinsDisplay = document.getElementById('coins');
const status = document.getElementById('status');
const clickPenguinBtn = document.getElementById('clickPenguin');
const upgradeClickBtn = document.getElementById('upgradeClick');
const upgradePassiveBtn = document.getElementById('upgradePassive');

function updateDisplay() {
  coinsDisplay.textContent = `Монети: ${coins}`;
}

clickPenguinBtn.addEventListener('click', () => {
  coins += coinsPerClick;
  updateDisplay();
});

upgradeClickBtn.addEventListener('click', () => {
  if (coins >= 50 && coinsPerClick === 1) {
    coins -= 50;
    coinsPerClick = 2;
    updateDisplay();
    status.textContent = 'Апгрейд куплено! Тепер 2 монети за клік.';
    upgradeClickBtn.disabled = true;
  } else if (coinsPerClick > 1) {
    status.textContent = 'Апгрейд вже куплено!';
  } else {
    status.textContent = 'Недостатньо монет для покупки апгрейду.';
  }
});

upgradePassiveBtn.addEventListener('click', () => {
  if (coins >= 1000 && !passiveIncome) {
    coins -= 1000;
    passiveIncome = true;
    updateDisplay();
    status.textContent = 'Пасивний дохід активовано!';
    upgradePassiveBtn.disabled = true;
  } else if (passiveIncome) {
    status.textContent = 'Пасивний дохід вже активовано!';
  } else {
    status.textContent = 'Недостатньо монет для покупки пасивного доходу.';
  }
});

// Пасивний дохід: додаємо 1 монету кожні 3.6 секунди (1000 монет на годину)
setInterval(() => {
  if (passiveIncome) {
    coins += 1;
    updateDisplay();
  }
}, 3600);

updateDisplay();
