class Ammo extends PickupItemObject {
    height = 100;
    width = 50;
    y = 240;
    x = 50;

    IMAGES = [
        'img/8_item/ammo/bullet0.png',
        'img/8_item/ammo/bullet1.png',
    ];


    constructor() {
        super().loadImage('img/8_item/ammo/bullet0.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
    }
}