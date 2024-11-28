class Coin extends PickupItemObject {
    height = 40;
    width = 40;
    y = 240;
    x = 50;

    IMAGES = [
        'img/8_item/coin/coin0.png',
        'img/8_item/coin/coin1.png',
    ];


    constructor() {
        super().loadImage('img/8_item/coin/coin0.png');
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
