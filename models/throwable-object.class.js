class ThrowableObject extends MovableObject {

    IMAGES_SHOOT = [
        'img/6_gun/shot/shot_0.png',
        'img/6_gun/shot/shot_1.png',
        'img/6_gun/shot/shot_2.png',
        'img/6_gun/shot/shot_3.png'
    ];

    offset = {
        top: 130,
        left: 100,
        right: 50,
        bottom: 130
    };

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_gun/shot/shot_0.png');
        this.loadImages(this.IMAGES_SHOOT);
        this.x = x;
        this.y = y;
        this.height = 350;
        this.width = 250;
        this.otherDirection = otherDirection
        this.shoot();
    }
    
    shoot() {

        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 10)

        
        setInterval(() => {
            this.playAnimation(this.IMAGES_SHOOT);
        }, 60)

    }
} 