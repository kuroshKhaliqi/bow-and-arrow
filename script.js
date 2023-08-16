let arrowElement = document.getElementById("arrow");
let playerElement = document.getElementById("player");
let ballonElement1 = document.getElementById("ballon1");
let ballonElement2 = document.getElementById("ballon2");
let ballonElement3 = document.getElementById("ballon3");
let ballonElement4 = document.getElementById("ballon4");
let ballonElement5 = document.getElementById("ballon5");
let ballonElement6 = document.getElementById("ballon6");
let ballonElement7 = document.getElementById("ballon7");
let ballonElement8 = document.getElementById("ballon8");
let arrowMovmentId;
let ballonDirection = "DOWN";
let arrowCounterElement = document.getElementById("arrow-counter");
let arrowCounter = 10;
arrowElement.style.top = "130px";
playerElement.style.top = "50px";
let arrowIsMoving = false;
let ballonCounter = 8;

function moveArrow() {
  let spaceLeft = +arrowElement.style.left.split("p")[0];

  if (spaceLeft > window.innerWidth) {
    clearInterval(arrowMovmentId);
    if (arrowCounter > 0) {
      respawnArrow();
    } else if (arrowCounter == 0) {
      alert("Game Over");
    }
  } else {
    arrowElement.style.left = spaceLeft + 30 + "px";
  }
}
function fireArrow() {
  if (arrowIsMoving == false) {
    arrowIsMoving = true;
    arrowMovmentId = setInterval(moveArrow, 100);
  }
}

function respawnArrow() {
  arrowElement.style.left = 50 + "px";
  arrowCounter = arrowCounter - 1;
  arrowCounterElement.innerText = "Arrows: " + arrowCounter;
  arrowIsMoving = false;
}

function moveBallon(ballonElement) {
  let topSpace = +ballonElement.style.top.split("p")[0];
  if (ballonDirection == "DOWN") {
    ballonElement.style.top = topSpace + 10 + "px";
    // move down
  } else {
    ballonElement.style.top = topSpace - 10 + "px";
    // move up
  }
  let windowHeight = window.outerHeight;
  if (topSpace < 40) {
    ballonDirection = "DOWN";
  }
  if (topSpace > windowHeight - 150) {
    ballonDirection = "UP";
  }
  if (isColliding(ballonElement)) {
    ballonElement.style.display = "none";
    ballonCounter = ballonCounter - 1;
    if (ballonCounter == 0) {
      alert("You Won");
    }
  }
}

function movePlayer(event) {
  let key = event.key;
  let topSpacePlayer = +playerElement.style.top.split("p")[0];
  let topSpaceArrow = +arrowElement.style.top.split("p")[0];
  console.log(window.outerHeight);
  console.log("ts" + topSpacePlayer);
  if (key === "w" && arrowIsMoving == false && topSpacePlayer > 10) {
    playerElement.style.top = topSpacePlayer - 10 + "px";
    arrowElement.style.top = topSpaceArrow - 10 + "px";
    //move up
  }
  if (
    key === "s" &&
    arrowIsMoving == false &&
    topSpacePlayer < window.outerHeight - 350
  ) {
    playerElement.style.top = topSpacePlayer + 10 + "px";
    arrowElement.style.top = topSpaceArrow + 10 + "px";

    //move down
  }
}

setInterval(() => moveBallon(ballonElement1), 100);
setInterval(() => moveBallon(ballonElement2), 100);
setInterval(() => moveBallon(ballonElement3), 100);
setInterval(() => moveBallon(ballonElement4), 100);
setInterval(() => moveBallon(ballonElement5), 100);
setInterval(() => moveBallon(ballonElement6), 100);
setInterval(() => moveBallon(ballonElement7), 100);
setInterval(() => moveBallon(ballonElement8), 100);

window.addEventListener("click", fireArrow);
window.addEventListener("keydown", () => movePlayer(event));
function isColliding(ballonElement) {
  let a = arrowElement.getBoundingClientRect();
  let b = ballonElement.getBoundingClientRect();
  if (
    a.x < b.x + b.width - 10 &&
    a.x + a.width - 10 > b.x &&
    a.y < b.y + b.height - 10 &&
    a.y + a.height - 10 > b.y
  ) {
    return true;
  }
}
