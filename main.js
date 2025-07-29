// --- ГЛОБАЛЬНІ ЗМІННІ ---
let count = 0;
let coinsPerClick = 1;
let passiveIncome = false;
let passiveIncomeRate = 1000 / 3600;
let boostActive = false;
let normalCoinsPerClick = 1;
// У глобальних змінних додаємо:
let superClickUnlocked = false;
let superClickBought = false;

// В функції loadGame() додаємо:
if (localStorage.getItem("superClickUnlocked") === "true") superClickUnlocked = true;
if (localStorage.getItem("superClickBought") === "true") superClickBought = true;

// В функції saveGame() додаємо:
localStorage.setItem("superClickUnlocked", superClickUnlocked);
localStorage.setItem("superClickBought", superClickBought);

// Обробник для першого апгрейду (2 монети):
document.getElementById("buyUpgrade").addEventListener("click", () => {
  if (count >= 50 && coinsPerClick === 1) {
    count -= 50;
    coinsPerClick = 2;
    superClickUnlocked = true; // Розблоковуємо наступний рівень
    document.getElementById("buySuperClick").style.display = "block"; // Показуємо кнопку
    updateUI();
  }
});

// Обробник для супер-кліку (5 монет):
document.getElementById("buySuperClick").addEventListener("click", () => {
  if (count >= 250 && superClickUnlocked && !superClickBought) {
    count -= 250;
    coinsPerClick = 5;
    superClickBought = true;
    updateUI();
  }
});

// В updateUI() додаємо:
function updateUI() {
  // ... ваш існуючий код ...
  if (superClickUnlocked) {
    document.getElementById("buySuperClick").style.display = "block";
  }
  if (superClickBought) {
    document.getElementById("buySuperClick").disabled = true;
    document.getElementById("buySuperClick").textContent = "Already bought!";
  }
}
// --- ІНІЦІАЛІЗАЦІЯ ---
window.onload = function() {
  // Завантаження збережених даних
  const savedCoins = localStorage.getItem("coins");
  const savedCoinsPerClick = localStorage.getItem("coinsPerClick");
  const savedPassiveIncome = localStorage.getItem("passiveIncome");

  if (savedCoins) count = parseInt(savedCoins);
  if (savedCoinsPerClick) coinsPerClick = parseInt(savedCoinsPerClick);
  if (savedPassiveIncome === "true") passiveIncome = true;

  updateUI();
  
  // Пасивний дохід
  setInterval(() => {
    if (passiveIncome) {
      count += passiveIncomeRate;
      updateUI();
    }
  }, 1000);
};

// --- ОНОВЛЕННЯ ІНТЕРФЕЙСУ ---
function updateUI() {
  document.getElementById("counter").innerText = Math.floor(count);
  document.getElementById("coinsPerClickDisplay").innerText = `Coins per click: ${coinsPerClick}`;
  updateRank();
  updateProfitPerHour();
}

// --- АПГРЕЙДИ ---
document.getElementById("buyUpgrade").addEventListener("click", () => {
  if (count >= 50 && coinsPerClick === 1) {
    count -= 50;
    coinsPerClick = 2;
    updateUI();
  } else {
    alert(coinsPerClick > 1 ? "Upgrade already bought!" : "Not enough coins!");
  }
});

document.getElementById("buySuperUpgrade").addEventListener("click", () => {
  if (count >= 1500 && coinsPerClick < 10) {
    count -= 1500;
    coinsPerClick = 10;
    updateUI();
  } else {
    alert(coinsPerClick >= 10 ? "Super Upgrade already bought!" : "Not enough coins!");
  }
});

// --- BOOST SYSTEM ---
function activateBoost() {
  if (boostActive) return;
  
  boostActive = true;
  normalCoinsPerClick = coinsPerClick;
  coinsPerClick = normalCoinsPerClick * 2;
  
  document.getElementById("penguin").classList.add("boosted");
  
  setTimeout(() => {
    boostActive = false;
    coinsPerClick = normalCoinsPerClick;
    document.getElementById("penguin").classList.remove("boosted");
  }, 7000);
}

// --- АВТОЗБЕРЕЖЕННЯ ---
function saveGame() {
  localStorage.setItem("coins", count);
  localStorage.setItem("coinsPerClick", coinsPerClick);
  localStorage.setItem("passiveIncome", passiveIncome);
}

window.addEventListener("beforeunload", saveGame);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") saveGame();
});
