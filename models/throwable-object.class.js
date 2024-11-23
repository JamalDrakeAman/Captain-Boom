class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/6_gun/shot/shot_0.png');
        this.x = x;
        this.y = y;
        this.height = 350;
        this.width = 250;
        this.shoot();
    }

    shoot() {
        
        // this.speedY = 30;
        // this.applyGravity();
        setInterval(()=> {
            this.x += 10;
        },10)
    }
}