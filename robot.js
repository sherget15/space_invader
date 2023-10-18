const ufo = new Image()
ufo.src = 'ufo.png'

class Robot {
    // constructor function holds blueprints for the <class Robot>
    constructor() {
        this.x = 150
        this.y = 200
        // vy = velocity & y-coordinate (this determines speed that Robot moves up & down)
        this.vy = 0 
        this.originalWidth = 1902
        this.originalHeight = 1604
        this.width = this.originalWidth / 40
        this.height = this.originalHeight / 40
        // weight - determins amount of force pulling down on Robot
        this.weight = 1
    }

    // using update method to calculate position & speed of player character (robot) for each frame of animation 
    update() {

        // curve makes player-character slightly bounce up & down while idling at bottom of canvas/screen instead of standing still
        // Math.sin just cycles between -1 & 1 continuously
        let curve = Math.sin(angle) * 20

        // using if/else loop to introduce restrictions to make sure player-character always stays on canvas
        // <(this.height * 3)> this provides space between player-character and bottom of canvas (tells player-character to stop going down at height of 3)
        if (this.y > canvas.height - (this.height * 3) + curve) {
            this.y = canvas.height - (this.height * 3) + curve
            this.vy = 0
        } else {
            this.vy += this.weight
            // multiplying <vy *= 0.9> keeps up/down speed of player-character from continuously increasing  
            this.vy *= 0.9
            this.y += this.vy
        }

        // provide restrictions so player-character can't go off top of canvas
        if (this.y < 0 + this.height) { 
            this.y = 0 + this.height
            // set vy to 0 to make player-character fall instantly when spacebar not pressed
            this.vy = 0
        }

        // this will handle keyboard input
        // calls flap() to move player-character when spacebar is pressed
        // <this.y > this.height *3> makes player-character slightly bounce up & down while at top of canvas/screen instead of staying still at top of screen
        if (spacePressed && this.y > this.height * 3) this.flap()

    }


    // draw method to show player character on screen (using rectangle as placeholder) 
    draw() {
        ctx.fillStyle = 'red'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(ufo, 0, 0, this.originalWidth, this.originalHeight, this.x - 20, this.y - 12, this.width, this.height)
    }


    // method to control up/down velocity of player when pressing spacebar (spacebar = up/jump)
    flap() {
        // decrease negative velocity of y by 2 which will give player character a push upwards
        this.vy -= 2
    }


}

// after creating a new class, we must always create an instance of that class
//  the <new> keyword will call our class constructor, create a new empty object, and assign it properties and values based on lines 4 to 11
// this object will also have full access to the custom class methods we created above (update, draw, flap)
const robot = new Robot()