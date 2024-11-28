class Ammo extends PickupItemObject {
    height = 100;
    width = 50;
    y = 240;
    x = 50;

    offset = {
        top: 30,
        left: 0,
        right: 0,
        bottom: 30
    }

    IMAGES = [
        'img/8_item/ammo/bullet0.png',
        'img/8_item/ammo/bullet1.png',
    ];


    constructor() {
        super().loadImage('img/8_item/ammo/bullet0.png');
        this.loadImages(this.IMAGES);
        this.x = 400 + Math.random() * 1000;
        this.y = 50 + Math.random() * 300;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
    }
}