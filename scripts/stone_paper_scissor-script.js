let score0 = 0;
let score1 = 0;

function gameLogic0() {
  let value = document.querySelector(".btn--roll0").textContent;
  let gen = ["Stone", "Paper", "Scissor"];
  let guess = Math.floor(Math.random() * gen.length);
  document.getElementById("current--1").textContent = gen[guess];
  document.getElementById("current--0").textContent = value;
  if (gen[guess] === "Scissor") {
    document.querySelector(".status").textContent = "YOU WIN!";
    score0++;
    document.getElementById("score--0").textContent = score0;
  } else if (gen[guess] === "Stone")
    document.querySelector(".status").textContent = "TRY AGAIN!";
  else {
    document.querySelector(".status").textContent = "YOU LOST";
    score1++;
    document.getElementById("score--1").textContent = score1;
  }
}

function gameLogic1() {
  let value = document.querySelector(".btn--roll1").textContent;
  let gen = ["Stone", "Paper", "Scissor"];
  let guess = Math.floor(Math.random() * gen.length);
  document.getElementById("current--1").textContent = gen[guess];
  document.getElementById("current--0").textContent = value;
  if (gen[guess] === "Stone") {
    document.querySelector(".status").textContent = "YOU WIN!";
    score0++;
    document.getElementById("score--0").textContent = score0;
  } else if (gen[guess] === "Paper")
    document.querySelector(".status").textContent = "TRY AGAIN!";
  else {
    document.querySelector(".status").textContent = "YOU LOST";
    score1++;
    document.getElementById("score--1").textContent = score1;
  }
}

function gameLogic2() {
  let value = document.querySelector(".btn--roll2").textContent;
  let gen = ["Stone", "Paper", "Scissor"];
  let guess = Math.floor(Math.random() * gen.length);
  document.getElementById("current--1").textContent = gen[guess];
  document.getElementById("current--0").textContent = value;
  if (gen[guess] === "Paper") {
    document.querySelector(".status").textContent = "YOU WIN!";
    score0++;
    document.getElementById("score--0").textContent = score0;
  } else if (gen[guess] === "Scissor")
    document.querySelector(".status").textContent = "TRY AGAIN!";
  else {
    document.querySelector(".status").textContent = "YOU LOST";
    score1++;
    document.getElementById("score--1").textContent = score1;
  }
}
function newGame() {
   score0 = 0;
   score1 = 0;

  document.querySelector(".status").textContent = "???";
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
}
