const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_NORMAL_ATTACK = "NORMAL_ATTACK"; // MODE_NORMAL_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; // MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_NORMAL_ATTACK = "PLAYER_NORMAL_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

function getMaxLifeValues() {
  const enteredValue = prompt("Maximum life for you and the monster.", "100");
  const parsedValue = parseInt(enteredValue);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: "Invalid user input, not a number!" };
  }
  return parsedValue;
}

let chosenMaxLife;

try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert('The entered value is not valid, using 100 instead.');
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry;
  logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  switch (event) {
    case LOG_EVENT_PLAYER_NORMAL_ATTACK:
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = "MONSTER";
      break;
    case LOG_EVENT_MONSTER_ATTACK:
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = "PLAYER";
      break;
    default:
      break;
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function attackPlayer() {
  let initialPlayerHealth = currentPlayerHealth;
  const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= monsterDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    monsterDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    alert("You would be dead, but your extra life saved you!");
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
  }
  if (currentPlayerHealth <= 0) {
    alert("You lost!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Monster won",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  if (mode === MODE_NORMAL_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_NORMAL_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  if (currentMonsterHealth <= 0) {
    alert("You won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "Player won",
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  } else {
    attackPlayer();
  }
}

function attackHandler() {
  attackMonster(MODE_NORMAL_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  attackPlayer();
}

function printLogHandler() {
  let i = 0;
  for (const logEntry of battleLog) {
    console.log(`#${i}`);
    i++;
    for (const key in logEntry) {
      console.log(`${key}: ${logEntry[key]}`);
    }
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
