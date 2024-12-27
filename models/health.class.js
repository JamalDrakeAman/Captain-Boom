/**
 * Represents a health item in the game, such as a heart icon.
 * The item can animate and is used to restore health or lives for the player.
 */
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


    /**
     * Constructs a new `Health` instance and initializes its position and animation.
     */
    constructor() {
        super().loadImage('img/8_item/health/heart-icon0.png');
        this.loadImages(this.IMAGES);
        this.x = 500 + Math.random() * 3500;
        this.y = 50 + Math.random() * 300;
        this.animate();
    }


    /**
     * Animates the health item by cycling through the images in the `IMAGES` array.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
    }
}