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

// 1. Глобальні змінні (додаємо на початку коду)
let count = 0;
let coinsPerClick = 1;
let upgrades = {
  basic: { bought: false, cost: 50, value: 2 },    // 2 монети за клік
  super: { bought: false, cost: 250, value: 5 },   // 5 монет за клік
  mega: { bought: false, cost: 1000, value: 10 }   // 10 монет за клік (опціонально)
};

// 2. Оновлена функція кліку по пінгвіну
document.getElementById("penguin").addEventListener("click", () => {
  // Визначаємо поточний множник кліку
  let multiplier = 1;
  if (upgrades.basic.bought) multiplier = upgrades.basic.value;
  if (upgrades.super.bought) multiplier = upgrades.super.value;
  if (upgrades.mega.bought) multiplier = upgrades.mega.value;
  
  count += multiplier;
  updateUI();
});

// 3. Обробники кнопок (оновлені)
document.getElementById("buyUpgrade").addEventListener("click", () => {
  if (!upgrades.basic.bought && count >= upgrades.basic.cost) {
    count -= upgrades.basic.cost;
    upgrades.basic.bought = true;
    document.getElementById("buySuperClick").style.display = "block"; // Показуємо наступний рівень
    updateUI();
  }
});

document.getElementById("buySuperClick").addEventListener("click", () => {
  if (!upgrades.super.bought && count >= upgrades.super.cost && upgrades.basic.bought) {
    count -= upgrades.super.cost;
    upgrades.super.bought = true;
    document.getElementById("buyMegaClick").style.display = "block"; // Для наступного рівня
    updateUI();
  }
});

// 4. Збереження/завантаження (додаємо в saveGame/loadGame)
function saveGame() {
  localStorage.setItem("upgrades", JSON.stringify(upgrades));
  // ... інші збереження
}

function loadGame() {
  const savedUpgrades = localStorage.getItem("upgrades");
  if (savedUpgrades) upgrades = JSON.parse(savedUpgrades);
  
  // Показуємо доступні апгрейди
  if (upgrades.basic.bought) {
    document.getElementById("buySuperClick").style.display = "block";
    if (upgrades.super.bought) {
      document.getElementById("buyMegaClick").style.display = "block";
    }
  }
  // ... інше завантаження
}
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
window.onload = function() {
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
    status.textContent = '';
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
const buySuperUpgradeBtn = document.getElementById("buySuperUpgrade");
buySuperUpgradeBtn.addEventListener("click", () => {
  if (count >= 1500 && coinsPerClick < 10) {
    count -= 1500;
    coinsPerClick = 10;
    counter.innerText = count;
    updateRank();
    alert("Super Upgrade bought! Now 10 coins per click.");
  } else if (coinsPerClick >= 10) {
    alert("Super Upgrade already bought!");
  } else {
    alert("Not enough coins!");
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
};
// --- BOOST LOGIC ---
let clickTimes = [];
let boostActive = false;
let boostTimeout = null;
let normalCoinsPerClick = 1; // базове значення

function activateBoost() {
  if (boostActive) return;
  boostActive = true;
  normalCoinsPerClick = coinsPerClick;
  coinsPerClick = normalCoinsPerClick * 2;
  penguin.classList.add('boosted');
  boostTimeout = setTimeout(() => {
    boostActive = false;
    coinsPerClick = normalCoinsPerClick;
    penguin.classList.remove('boosted');
  }, 7000);
}
function updateCoinsPerClickDisplay() {
  document.getElementById("coinsPerClickDisplay").innerText = `Coins per click: ${coinsPerClick}`;
}
buyUpgradeBtn.addEventListener("click", () => {
  if (count >= 50 && coinsPerClick === 1) {
    count -= 50;
    coinsPerClick = 2;
    counter.innerText = count;
    updateCoinsPerClickDisplay();
    updateRank();
    alert("Upgrade bought! Now 2 coins per click.");
  } else if (coinsPerClick > 1) {
    alert("Upgrade already bought!");
  } else {
    alert("Not enough coins!");
  }
});
function updateCoinsPerClickDisplay() {
  document.getElementById("coinsPerClickDisplay").innerText = `Coins per click: ${coinsPerClick}`;
}

// При апгрейді:
buyUpgradeBtn.addEventListener("click", () => {
  if (count >= 50 && coinsPerClick === 1) {
    count -= 50;
    coinsPerClick = 2;
    counter.innerText = count;
    updateCoinsPerClickDisplay();
    updateRank();
    alert("Upgrade bought! Now 2 coins per click.");
  }
  // ...інші умови...
});

// Після завантаження гри:
window.onload = function() {
  // ...твій код...
  counter.innerText = count;
  updateCoinsPerClickDisplay();
  updateRank();
  updateProfitPerHour();
};
let superUpgradeCost = 1500;

document.getElementById("buySuperUpgrade").addEventListener("click", () => {
  if (pingviCoins >= superUpgradeCost) {
    pingviCoins -= superUpgradeCost;
    coinsPerClick += 10;
    updateUI();
  } else {
    alert("Not enough Pingvi coins!");
  }
});
