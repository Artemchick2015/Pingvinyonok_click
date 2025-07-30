// --- Ініціалізація змінних ---
let count = 0;
let coinsPerClick = 1;
let passiveIncome = false;
const passiveIncomeRate = 1000 / 3600; // 1000 монет на годину

// DOM елементи
const counter = document.getElementById("counter");
const rank = document.getElementById("rank");
const profitPerHourElement = document.getElementById("profitPerHour");

const buyUpgradeBtn = document.getElementById("buyUpgrade");
const buyPassiveIncomeBtn = document.getElementById("buyPassiveIncome");
const buySuperUpgradeBtn = document.getElementById("buySuperUpgrade");
const penguin = document.getElementById("penguin");

const saveBtn = document.getElementById("saveBtn");

// --- Функції оновлення ---
function updateDisplay() {
  counter.innerText = Math.floor(count);
  updateRank();
  updateProfitPerHour();
}

function updateRank() {
  if (count < 10) rank.innerText = "Level: Newbie 🐣";
  else if (count < 50) rank.innerText = "Level: Pingvinyonok-student 🐧";
  else if (count < 100) rank.innerText = "Level: Boss of the snow ❄️";
  else rank.innerText = "Level: Pingvi-Legend 🔥";
}

function updateProfitPerHour() {
  if (passiveIncome) {
    profitPerHourElement.innerText = `Profit per hour: 1000 coins`;
  } else {
    profitPerHourElement.innerText = `Profit per hour: 0 coins`;
  }
}

// --- Автозбереження гри ---
function autoSaveGame() {
  localStorage.setItem("coins", count);
  localStorage.setItem("coinsPerClick", coinsPerClick);
  localStorage.setItem("passiveIncome", passiveIncome);
}

window.addEventListener("beforeunload", autoSaveGame);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") autoSaveGame();
});

// --- Завантаження прогресу ---
window.onload = function() {
  const savedCoins = localStorage.getItem("coins");
  const savedCoinsPerClick = localStorage.getItem("coinsPerClick");
  const savedPassiveIncome = localStorage.getItem("passiveIncome");

  if (savedCoins !== null && !isNaN(savedCoins)) {
    count = parseFloat(savedCoins);
  }
  if (savedCoinsPerClick !== null && !isNaN(savedCoinsPerClick)) {
    coinsPerClick = parseInt(savedCoinsPerClick);
  }
  if (savedPassiveIncome === "true") {
    passiveIncome = true;
  }

  // Відключення кнопок апгрейдів після завантаження, якщо вони куплені
  if (coinsPerClick >= 2) buyUpgradeBtn.disabled = true;
  if (coinsPerClick >= 5) buySuperUpgradeBtn.disabled = true;
  if (passiveIncome) buyPassiveIncomeBtn.disabled = true;

  updateDisplay();
};

// --- Подія кліку по пінгвіну ---
penguin.addEventListener("click", () => {
  count += coinsPerClick;
  updateDisplay();
});

// --- Кнопка апгрейду до 2 монет за клік ---
buyUpgradeBtn.addEventListener("click", () => {
  if (count >= 50 && coinsPerClick < 2) {
    count -= 50;
    coinsPerClick = 2;
    buyUpgradeBtn.disabled = true;
    alert("Upgrade bought! Now 2 coins per click.");
    updateDisplay();
  } else if (coinsPerClick >= 2) {
    alert("Upgrade already bought!");
  } else {
    alert("Not enough coins!");
  }
});

// --- Кнопка апгрейду до 5 монет за клік (новий апгрейд) ---
buySuperUpgradeBtn.addEventListener("click", () => {
  if (count >= 250 && coinsPerClick < 5) {
    count -= 250;
    coinsPerClick = 5;
    buySuperUpgradeBtn.disabled = true;
    alert("Super Upgrade bought! Now 5 coins per click.");
    updateDisplay();
  } else if (coinsPerClick >= 5) {
    alert("Super Upgrade already bought!");
  } else {
    alert("Not enough coins!");
  }
});

// --- Кнопка пасивного доходу ---
buyPassiveIncomeBtn.addEventListener("click", () => {
  if (count >= 1000 && !passiveIncome) {
    count -= 1000;
    passiveIncome = true;
    buyPassiveIncomeBtn.disabled = true;
    alert("Passive income bought!");
    updateDisplay();
  } else if (passiveIncome) {
    alert("Passive income already bought!");
  } else {
    alert("Not enough coins!");
  }
});

// --- Пасивний дохід (кожну секунду) ---
setInterval(() => {
  if (passiveIncome) {
    count += passiveIncomeRate;
    updateDisplay();
  }
}, 1000);

// --- Кнопка ручного збереження ---
saveBtn.addEventListener("click", () => {
  autoSaveGame();
  alert("Result saved!");
});
