/**
 * Represents a cloud in the game's background.
 * Extends the `MovableObject` class to allow horizontal movement.
 */
class Cloud extends MovableObject {
    y = 20;
    height = 220;
    width = 500;
    speed = 1;


    /**
     * Constructs a new `Cloud` instance.
     * Loads the cloud image, initializes its position, and starts the animation for movement.
     */
    constructor() {
        super().loadImage('img/5_background/layers/clouds/1.png');
        this.x = Math.random() * 6000;
        this.animate();
    }


    /**
     * Animates the cloud by moving it to the left at regular intervals.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 50)
    }

}