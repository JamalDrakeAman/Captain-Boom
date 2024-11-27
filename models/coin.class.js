class Coin extends PickupItemObject {
    height = 50;
    width = 50;
    y = 240;
    x = 50;

    IMAGES = [
        'img/8_item/coin0.png',
        'img/8_item/coin1.png',
    ];


    constructor() {
        super().loadImage('img/8_item/coin0.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }


}
