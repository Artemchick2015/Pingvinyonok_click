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

  // додатковий апгрейд
const buyUpgradeFiveBtn = document.createElement("button");
buyUpgradeFiveBtn.className = "upgrade-button";
buyUpgradeFiveBtn.id = "buyUpgradeFive";
buyUpgradeFiveBtn.textContent = "Buy 5 coins per click (250 coins)";
document.getElementById("upgradeMenu").appendChild(buyUpgradeFiveBtn);

buyUpgradeFiveBtn.addEventListener("click", () => {
  if (count >= 250 && coinsPerClick < 5) {
    count -= 250;
    coinsPerClick = 5;
    counter.innerText = count;
    updateRank();
    alert("Upgrade bought! Now 5 coins per click.");
  } else if (coinsPerClick >= 5) {
    alert("You already have this upgrade or better!");
  } else {
    alert("Not enough coins!");
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
