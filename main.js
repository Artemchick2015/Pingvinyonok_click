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

// ===== ГЛОБАЛЬНІ ЗМІННІ =====
let count = 0;
let coinsPerClick = 1;
const upgrades = {
  double: { cost: 50, value: 2, bought: false },
  super: { cost: 250, value: 5, bought: false },
  mega: { cost: 1000, value: 10, bought: false }
};

// ===== ЗАВАНТАЖЕННЯ ГРИ =====
function loadGame() {
  const savedData = JSON.parse(localStorage.getItem("gameData")) || {};
  
  count = savedData.count || 0;
  coinsPerClick = savedData.coinsPerClick || 1;
  
  // Оновлюємо статус апгрейдів
  if (savedData.upgrades) {
    Object.assign(upgrades, savedData.upgrades);
  }
  
  updateUI();
}

// ===== ЗБЕРЕЖЕННЯ ГРИ =====
function saveGame() {
  const gameData = {
    count,
    coinsPerClick,
    upgrades
  };
  localStorage.setItem("gameData", JSON.stringify(gameData));
}

// ===== ОНОВЛЕННЯ ІНТЕРФЕЙСУ =====
function updateUI() {
  document.getElementById("counter").textContent = count;
  document.getElementById("coinsPerClickDisplay").textContent = `Coins per click: ${coinsPerClick}`;
  
  // Оновлюємо кнопки апгрейдів
  document.getElementById("buyDouble").disabled = upgrades.double.bought;
  document.getElementById("buySuper").disabled = upgrades.super.bought;
  document.getElementById("buyMega").disabled = upgrades.mega.bought;
}

// ===== ОБРОБНИКИ КНОПОК =====
document.getElementById("buyDouble").addEventListener("click", () => {
  if (!upgrades.double.bought && count >= upgrades.double.cost) {
    count -= upgrades.double.cost;
    coinsPerClick = upgrades.double.value;
    upgrades.double.bought = true;
    updateUI();
    saveGame();
  }
});

document.getElementById("buySuper").addEventListener("click", () => {
  if (!upgrades.super.bought && count >= upgrades.super.cost) {
    count -= upgrades.super.cost;
    coinsPerClick = upgrades.super.value;
    upgrades.super.bought = true;
    updateUI();
    saveGame();
  }
});

document.getElementById("buyMega").addEventListener("click", () => {
  if (!upgrades.mega.bought && count >= upgrades.mega.cost) {
    count -= upgrades.mega.cost;
    coinsPerClick = upgrades.mega.value;
    upgrades.mega.bought = true;
    updateUI();
    saveGame();
  }
});

// ===== ЗАПУСК ГРИ =====
window.onload = function() {
  loadGame();
  
  // Клік по пінгвіну
  document.getElementById("penguin").addEventListener("click", () => {
    count += coinsPerClick;
    updateUI();
    saveGame();
  });
};
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
