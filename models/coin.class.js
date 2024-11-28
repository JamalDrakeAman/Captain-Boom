class Coin extends PickupItemObject {
    height = 40;
    width = 40;
    y = 240;
    x = 50;


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    IMAGES = [
        'img/8_item/coin/coin0.png',
        'img/8_item/coin/coin1.png',
    ];


    constructor() {
        super().loadImage('img/8_item/coin/coin0.png');
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
