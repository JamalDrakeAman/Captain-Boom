/**
 * Represents an ammo object in the game.
 * The ammo object is collectible and used as a resource for the player.
 * Inherits from MovableObject.
 */
class Ammo extends MovableObject {
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


    /**
     * Initializes a new instance of the Ammo class.
     * Loads the images for the ammo and sets its initial position.
     */
    constructor() {
        super().loadImage('img/8_item/ammo/bullet0.png');
        this.loadImages(this.IMAGES);
        this.x = 400 + Math.random() * 4000;
        this.y = 50 + Math.random() * 300;
        this.animate();
    }


    /**
     * Animates the ammo object by cycling through its images.
     * The animation updates at a regular interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
    }
}