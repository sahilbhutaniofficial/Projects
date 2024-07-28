//GAme Constants
let inputdir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const musicSound = new Audio("music/music.mp3");
const moveSound = new Audio("music/move.mp3");
let score = 0;

let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1/speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //if ypu bump into walls
    if (snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }

    return false;
}

function gameEngine() {
  //Part 1 : updating the snake array

if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputdir = {x:0 , y:0};
    alert("Game Over Press Any Key To Play Again");
    snakeArr = [{x:13 , y:15}];
    musicSound.play();
    score = 0;
}

//if you have eaten the food increment tthe score and regenerate the score

if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score += 1;
    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "HiScore:" + hiscoreval;
    }
    scoreBox.innerHTML = "Score : " + score;
    snakeArr.unshift({ x: snakeArr[0].x + inputdir.x , y: snakeArr[0].y + inputdir.y});
    a = 2;
    b = 16;

    food = { x : Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())}
}

//moving the snake
for( let i = snakeArr.length - 2 ; i >= 0 ; i--){
    snakeArr[i + 1] = {...snakeArr[i]};
}

snakeArr[0].x += inputdir.x;
snakeArr[0].y += inputdir.y;

  //Part 2 : Display the snake and Food

  //Display the snake

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if(index === 0){
    snakeElement.classList.add("head");       
    }
    else{
        snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //Display of Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main Logic Starts Here
 musicSound.play();
 let hiscore = localStorage.getItem("hiscore");
 if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore" , JSON.stringify(hiscoreval))
 }
 else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore:" + hiscore;
 }

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputdir = { x: 0, y: 0 }; //Start Here
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
    console.log("ArrowUp");
    inputdir.x = 0;
    inputdir.y = -1;
    break;

    case "ArrowDown":
    console.log("ArrowDown");
    inputdir.x = 0;
    inputdir.y = 1;
    break;

    case "ArrowLeft":
    console.log("ArrowLeft");
    inputdir.x = -1;
    inputdir.y = 0;
    break;

    case "ArrowRight":
    console.log("ArrowRight");
    inputdir.x = 1;
    inputdir.y = 0;
    break;
    default:
        break;
  }
});
