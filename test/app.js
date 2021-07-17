

const gameArea = document.querySelector('.game-board');
const gun = document.querySelector('.gun');
const barrel = document.querySelector('.barrel');

let gunPosition = gameArea.offsetWidth/2;

let rightPressed = false;
let leftPressed = false;
let firePressed = false;
let missileCount = 10;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", keyFireHandler, false);


 
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }

    else if (e.keyCode === 32) {
        firePressed = false;
    }
    moveGun();
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }

    moveGun();
}

function moveGun() {

if(rightPressed) {
	gunPosition +=5;
        gun.style.left = gunPosition + 'px';
        
    }

    else if (leftPressed) {
    	gunPosition -=5;
    	gun.style.left = gunPosition + 'px';
    }

  }


  function keyFireHandler(e) {
     if(e.keyCode === 32) {
        firePressed = true;
        barrel.style.marginTop = '-10px';
        setTimeout(fire, 100);
    }
  }

  function fire() {
   
       launchMissiles();
       barrel.style.marginTop = '-20px';
    clearTimeout(fire);
  }



function launchMissiles() {

  let missile = document.createElement('div')
       missile.classList.add('missile')
       gameArea.appendChild(missile)
  squareArea = barrel.offsetLeft
  y = squareArea
       //missilePos = gunPosition

  //box = barrel.offsetLeft
   x = barrel.style.left
   //y = barrel.getClientRect/2
console.log(y)
function start(){
  missile.style.left = y + 'px'
  //missile.style.top = x + 'px'
}
       
start()
       let pos = 500
       let moveMissile = setInterval(travel, 10);

       function travel() {
       if (pos == -100) {
        clearInterval(moveMissile);

      } else {
        pos--;
       
       missile.style.top = pos + 'px'
       //console.log(missile)
       
      }
    }
  }

  class Alienship {
    constructor(){
    this.alienship = document.createElement('div')
    //this.ShipPosition = gameArea.offsetWidth
  }
  init(){
    this.alienship.classList.add('alienship')
    gameArea.appendChild(this.alienship)
    
  }
  launchShip(){
    let shipPos = 1000
    this.moveShip = setInterval(() => {
   if (shipPos == -20) {
      clearInterval(this.moveShip)
    } else {
      //shipPos--
      this.alienship.style.left = shipPos-- + 'px'
    }
  }, 10);
    

  }
  }

  const alienship = new Alienship();
alienship.init();

const button = document.querySelector('button');
button.addEventListener('click', () => {
 alienship.launchShip();
});



