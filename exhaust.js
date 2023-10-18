const exhaustArr = []

class Exhaust {
    constructor() {
        this.x = robot.x
        this.y = robot.y + 30
        this.size = Math.random() * 7 + 3
        this.speedY = (Math.random() * 1) - 0.5
        this.color = 'hsla(' + hue + ', 100%, 50%, 1)'
    }


    update() {
        this.x -= gamespeed
        this.y += this.speedY
    }


    draw() {
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    }
}


function handleExhaust() {
    exhaustArr.unshift(new Exhaust)
    for (i = 0; i < exhaustArr.length; i++) {
        exhaustArr[i].update()
        exhaustArr[i].draw()
    }

    if (exhaustArr.length > 200) {
        for (let i = 0; i < 20; i++) {
            exhaustArr.pop(exhaustArr[i])
        }
    }


}

