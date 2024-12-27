/**
 * Represents a collectible coin in the game.
 * Extends the `MovableObject` class to inherit movement and animation behavior.
 */
class Coin extends MovableObject {
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


    /**
    * Constructs a new `Coin` instance.
    * - Loads the default coin image.
    * - Loads all animation frames into the image cache.
    * - Randomly sets the x and y coordinates for the coin within a range.
    */
    constructor() {
        super().loadImage('img/8_item/coin/coin0.png');
        this.loadImages(this.IMAGES);
        this.x = 400 + Math.random() * 4000;
        this.y = 50 + Math.random() * 300;
        this.animate();
    }


    /**
     * Starts the coin animation by cycling through the images.
     * Uses `setInterval` to change the frame every 300ms.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
    }

}
