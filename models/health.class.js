class Health extends MovableObject {
    height = 40;
    width = 40;
    y = 240;
    x = 50;

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    }

    IMAGES = [
        'img/8_item/health/heart-icon0.png',
        'img/8_item/health/heart-icon1.png'
    ];


    constructor() {
        super().loadImage('img/8_item/health/heart-icon0.png');
        this.loadImages(this.IMAGES);
        this.x = 500 + Math.random() * 3500;
        this.y = 50 + Math.random() * 300;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
    }
}