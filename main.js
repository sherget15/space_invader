const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 400

// determine whether or not spacebar is being pressed
let spacePressed = false
// angle will be used by Math.side method to make avatar move slightly up and down while idle 
let angle = 0
// use hue to cycle through multiple colors of player (or whatever... maybe footsteps...)
let hue = 0 
// frame keeps track of frame count of our animation loop so we can add any periodic triggers for game, like making obstacles appear
let frame = 0
let score = 0
// gamespeed needs to be global variable so that we can make all elements move at same speed
let gamespeed = 2


const background = new Image()
background.src = 'space_bg.png'
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}


function handleBackground() {
    if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width
    else BG.x1 -= gamespeed
    if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width
    else BG.x2 -= gamespeed
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height)
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height)
}


function animate() {
    // call 'clearRect' to clear entire canvas between every frame of animation
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleBackground()
    handleObstacles()
    handleExhaust()
    
    // update will calculate player position, speed, & draw 
    robot.update()
    // draw will draw rectangle at new coordinates
    robot.draw()

    ctx.fillStyle = 'red'
    ctx.font = '90px Georgia'
    ctx.strokeText(score, 450, 70)
    ctx.fillText(score, 450, 70) 


    handleCollisions()
    if (handleCollisions()) return;

    requestAnimationFrame(animate)

    // multiplying by 0.12 slows down player-character's bounce speed 
    angle += 0.12
    hue++
    frame++
}
animate()


// event listener for 'keydown' events, this will now return 'true' when player is pressing the spacebar('Space')
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') spacePressed = true
})

// event listener for 'keyup' events, this will now return 'false' when player is NOT pressing the spacebar('Space')
window.addEventListener('keyup', function(e) {
    if (e.code === 'Space') spacePressed = false
})


const bang = new Image()
bang.src = 'bang.png'



function handleCollisions() {
    for (let i = 0; i < obstaclesArr.length; i++) {
        if (robot.x < obstaclesArr[i].x + obstaclesArr[i].width && robot.x + robot.width > obstaclesArr[i].x && ((robot.y < 0 + obstaclesArr[i].top && robot.y + robot.height > 0) || (robot.y > canvas.height - obstaclesArr[i].bottom && robot.y + robot.height < canvas.height))) {
            // collision detected
            ctx.drawImage(bang, robot.x, robot.y, 50, 50)
            ctx.font = '25px Georgia'
            ctx.fillStyle = 'red'
            ctx.fillText('Game Over, your score is ' + score, 160, canvas.height / 2 - 10)
            return true
        }
    }
}