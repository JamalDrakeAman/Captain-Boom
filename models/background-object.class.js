/**
 * Represents a background object in the game.
 * The background object is a movable element that forms the visual backdrop of the game.
 * Inherits from MovableObject.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;


    /**
     * Initializes a new instance of the BackgroundObject class.
     * Loads the image for the background and sets its position.
     * 
     * @param {string} imagePath - The path to the image file for the background.
     * @param {number} x - The horizontal position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }

}