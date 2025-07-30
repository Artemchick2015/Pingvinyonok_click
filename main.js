// Змінні гри
let coins = 0;
let coinsPerClick = 1;
let passiveIncome = false;

// Елементи DOM
const coinsDisplay = document.getElementById('coins');
const status = document.getElementById('status');
const clickPenguinBtn = document.getElementById('clickPenguin');
const upgradeClickBtn = document.getElementById('upgradeClick');
const upgradePassiveBtn = document.getElementById('upgradePassive');
const promoInput = document.getElementById('promoInput');
const applyPromoBtn = document.getElementById('applyPromoBtn');
const promoStatus = document.getElementById('promoStatus');

const rpsButtons = document.querySelectorAll(".rps-btn");
const rpsResult = document.getElementById("rps-result");

// Функція оновлення показу монет
function updateDisplay() {
  coinsDisplay.textContent = `Монети: ${coins}`;
}

// Функція автозбереження гри
function autoSaveGame() {
  localStorage.setItem("coins", coins);
  localStorage.setItem("coinsPerClick", coinsPerClick);
  localStorage.setItem("passiveIncome", passiveIncome);
}

// Завантаження збережених даних
function loadGame() {
  const savedCoins = localStorage.getItem("coins");
  const savedCPC = localStorage.getItem("coinsPerClick");
  const savedPassive = localStorage.getItem("passiveIncome");

  if (savedCoins !== null) coins = parseInt(savedCoins);
  if (savedCPC !== null) coinsPerClick = parseInt(savedCPC);
  if (savedPassive !== null) passiveIncome = (savedPassive === 'true');

  updateDisplay();

  if (coinsPerClick > 1) upgradeClickBtn.disabled = true;
  if (passiveIncome) upgradePassiveBtn.disabled = true;
}

// Основна логіка кліку
clickPenguinBtn.addEventListener('click', () => {
  coins += coinsPerClick;
  updateDisplay();
  status.textContent = '';
});

// Логіка апгрейду кліку
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

// Логіка пасивного доходу
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

// Пасивний дохід: +1 монета кожні 3.6 секунди
setInterval(() => {
  if (passiveIncome) {
    coins += 1;
    updateDisplay();
  }
}, 3600);

// ПРОМОКОД логіка
applyPromoBtn.addEventListener('click', () => {
  const code = promoInput.value.trim().toLowerCase();
  if (code === 'freecoins') {
    coins += 100;
    updateDisplay();
    promoStatus.textContent = 'Промокод активовано! +100 монет 🎉';
  } else {
    promoStatus.textContent = 'Невірний промокод.';
  }
  promoInput.value = '';
});

// Камінь-ножиці-папір логіка
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function decideWinner(player, computer) {
  if (player === computer) return "Нічия! 🎲";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) return "Ви виграли! 🎉";
  return "Ви програли! 😞";
}

rpsButtons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.getAttribute("data-choice");
    const computerChoice = getComputerChoice();
    const resultText = `Ви вибрали: ${playerChoice}, Комп'ютер вибрав: ${computerChoice}. ${decideWinner(playerChoice, computerChoice)}`;
    rpsResult.textContent = resultText;
  });
});

// Автозбереження при закритті і приховуванні сторінки
window.addEventListener("beforeunload", autoSaveGame);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") autoSaveGame();
});

// Завантаження гри при відкритті сторінки
window.onload = () => {
  loadGame();
  updateDisplay();
  status.textContent = '';
};
