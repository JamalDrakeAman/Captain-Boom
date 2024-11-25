class ThrowableObject extends MovableObject {

    IMAGES_SHOOT = [
        'img/6_gun/shot/shot_0.png',
        'img/6_gun/shot/shot_1.png',
        'img/6_gun/shot/shot_2.png',
        'img/6_gun/shot/shot_3.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_gun/shot/shot_0.png');
        this.loadImages(this.IMAGES_SHOOT);
        this.x = x;
        this.y = y;
        this.height = 350;
        this.width = 250;
        this.shoot();
    }

    shoot() {
        // this.speedY = 30;
        // this.applyGravity();
        setInterval(() => {
            this.x += 10;

        }, 10)

        setInterval(() => {
            this.playAnimation(this.IMAGES_SHOOT);
        },60)

    }
} 