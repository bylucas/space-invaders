const gameArea = document.querySelector('.game-area');
const gun = document.querySelector('.gun');
const missile = document.querySelector('.missile');

let gunPosition = gameArea.offsetWidth/2;

let rightPressed = false;
let leftPressed = false;
let firePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", keyFireHandler, false);


box = gun.getBoundingClientRect()
x = box.top
y = box.left


box2 = missile.getBoundingClientRect()
z = box2.top

function start(){
missile.style.top = x + 'px'
missile.style.left = y + 25 + 'px'
}

start()

function sticky() {

    missile.style.left = gunPosition + 'px';
}


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
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
        sticky()
        
    }

    else if (leftPressed) {
    	gunPosition -=5;
    	gun.style.left = gunPosition + 'px';
    	sticky()
    }


  }

  function keyFireHandler(e) {
     if(e.keyCode === 32) {
        firePressed = true;
        setTimeout(launch, 200);
    }
  }


  function launch(){

       let pos = x
       let moveMissile = setInterval(travel, 10);

       function travel() {
       if (pos == -50) {
        clearInterval(moveMissile);

      } else { 
        pos--;
       
       missile.style.top = pos + 'px'
       missile.style.left = 0;
       
      }
    }
}

  
