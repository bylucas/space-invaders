const gameArea = document.querySelector('.game-board');
const gun = document.querySelector('.gun');
const barrel = document.querySelector('.barrel');
const result = document.querySelector('.result');
const resultsDisplay = document.querySelector('.results')

//half gameArea - half width
let boundary = 125
let width = 50

//give missilePos a value before keys are pressed
let missilePos = 130

const alienBlock = document.querySelector('.alien-block')

//start with empty array for shot aliens
let alienBin = []

results = 0

//load the invaders
for (let i = 0; i < 36; i++) {
  const square = document.createElement('div')
  alienBlock.appendChild(square)
  square.classList.add('invader')
}

//group the aliens
const squares = Array.from(document.querySelectorAll('.alien-block div'))

//make array of aliens
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15, 16, 17,
  18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35
]


function Gun() {
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        if (boundary + width !== 50)
          boundary -= 5
        gun.style.left = boundary + 'px'
        //over-ride missilePos default value
        missilePos = gun.style.left
        break

      case 'ArrowRight':
        if (boundary + width !== 310)
          boundary += 5
        gun.style.left = boundary + 'px'
        missilePos = gun.style.left
        break

      case 'ArrowUp':
        //make barrel kick!
        barrel.style.marginTop = '-17px';
        setTimeout(fire, 100);
        break
    }
  })
}

function fire() {
  launchMissiles();
  //barrel kick!
  barrel.style.marginTop = '-10px';
  clearTimeout(fire);
}

function launchMissiles() {
  //make the missiles
  let missile = document.createElement('div')
  missile.classList.add('missile')
  gameArea.appendChild(missile)
  //take the px off missilePos
  missileFire = parseInt(missilePos, 10);
  //center over barrel and add px
  missile.style.left = missileFire + 16 + 'px'

  let laserId = setInterval(fireMissile, 10)
  let firePos = 295

  function fireMissile() {
    if (firePos == -50) {
      missile.remove()
      clearInterval(laserId);
    } else {
      firePos -= 5
      missile.style.top = firePos + 'px'
      destroyAliens()
    }
  }

  function destroyAliens() {

    for (let i = 0; i < alienInvaders.length; i++) {
      //find the measurements of missile and i
      let m = missile.getBoundingClientRect()
      let a = squares[alienInvaders[i]].getBoundingClientRect()

      //if the missile connects with alien but only if alien is live - 'invader'
      if (m.top < a.bottom && m.left > a.left && m.right < a.right && squares[i].classList.contains('invader')) {
        //add a class of 'boom' but only for a short time
        squares[i].classList.add('boom')
        setTimeout(() => squares[i].classList.remove('boom'), 300)
        clearInterval(laserId)

        //kill the invader
        squares[i].classList.remove('invader')
        squares[i].classList.add('shot')
        missile.remove()

        //remove dead aliens to alienBin array and count
        const alienRemoved = alienInvaders.indexOf(alienInvaders)
        alienBin.push(alienRemoved)
        results++
        resultsDisplay.innerHTML = results
        //if the alienBin gets full you win
        if (alienBin.length === alienInvaders.length) {
          winner()
        }
      }
    }
  }
}

function Aliens() {
  //workout where the aliens are and move them
  let blockArea = alienBlock.offsetLeft

  if (blockArea < 5 || goingRight == true) {
    moveblockRight()
  }
  if (goingRight == false) {
    moveblockLeft()
  }
}

//move right until aliens hit right side
function moveblockRight() {
  let blockPos = 0
  let moveBlock = setInterval(() => {
    if (blockPos == 110) {
      moveblockDown()

      clearInterval(moveBlock)
      goingRight = false
    } else {
      alienBlock.style.left = blockPos++ + 'px'
    }
  }, 30);
}

//move left until aliens hit left side
function moveblockLeft() {
  let blockPos = 100
  moveBlock = setInterval(() => {
    if (blockPos == 0) {
      moveblockDown()
      goingRight = true
      clearInterval(moveBlock)

    } else {
      alienBlock.style.left = blockPos-- + 'px'
    }
  }, 30);
}

//setTimeout to move down once
function moveblockDown() {
  let blockTop = alienBlock.offsetTop
  let downPos = blockTop
  blockDown = setTimeout(() => {
    if (downPos == 200) {
      gameOver()
      clearTimeout(blockDown)
    } else {
      alienBlock.style.top = downPos + 20 + 'px'
      Aliens()

    }
  }, 300);
}

//moving effect of the aliens - needs improving with images
function changeColor() {
  for (let i = 0; i < alienInvaders.length; i++) {
    setInterval(setColor, 300);
    function setColor() {
      if (squares[i].classList.contains('invader')) {
        squares[alienInvaders[i]].style.backgroundColor = squares[alienInvaders[i]].style.backgroundColor == "rgb(34, 36, 34)" ? "rgb(81, 83, 81)" : "rgb(34, 36, 34)"
      }
    }
  }
}

function winner() {
  result.innerHTML = `<h4>WINNER!!</h4>`
  setTimeout(() => {
    document.location.reload();
  }, 3000);
}

function gameOver() {
  result.innerHTML = `<h4>YOU LOOSE!!</h4>`
  setTimeout(() => {
    document.location.reload();
  }, 3000);
}

const button = document.querySelector('button.start');
button.addEventListener('click', () => {
  Gun()
  Aliens();
  changeColor()
});