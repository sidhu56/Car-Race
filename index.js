const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

startScreen.addEventListener('click' , start);

let player = {speed:5 , score:0};
let keys = {ArrowUp : false , ArrowDown : false , ArrowLeft : false , ArrowRight : false} 
document.addEventListener('keydown' , keyDown);
document.addEventListener('keyup', keyUp);
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
}

function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
}

function start(){
    //gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML="";
    
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(x=0; x<5; x++){
    let roadline = document.createElement('div');
    roadline.setAttribute('class' , 'lines');
    roadline.y = (x*130)
    roadline.style.top = roadline.y + 'px';
    gameArea.appendChild(roadline); 
    }
    
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(x=0; x<4; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class' , 'enemy');
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        enemyCar.y = ((x+1) * 350 ) * -1;
        enemyCar.style.top = enemyCar.y + 'px';
        gameArea.appendChild(enemyCar); 
        }
}
function gamePlay(){
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    if(player.start){
        movelines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y > (road.top + 220)){player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom - 100)){player.y +=player.speed}
        if(keys.ArrowLeft && player.x > 0){player.x -=player.speed}
        if(keys.ArrowRight && player.x < (road.width -68)){player.x +=player.speed}

        car.style.top = player.y +"px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerText = "Score:" + player.score;
    }
}

function movelines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y >= 570){
            item.y -= 640;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    })
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            endGame();
        }
        if(item.y >= 650){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    })
}

function endGame(){
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your final score is : " + player.score + "<br>Press here to restart the game"
}
function isCollide(a,b){
    aRect =a.getBoundingClientRect();
    bRect =b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function randomColor(){
    function c(){
        let hex =Math.floor(Math.random()*256).toString(16);
        return ("0" + String(hex)).substr(-2) ;
    }
    return "#"+c()+c()+c();
}