/**
 * Represents a status bar in the game, such as health, coin, or ammo indicators.
 * Extends the `DrawableObject` class for rendering functionality.
 */
class StatusBar extends DrawableObject {

    IMAGES = [];
    percentage = 100;
    itemCount = 0;

    /**
     * Updates the percentage value of the status bar and sets the corresponding image.
     * @param {number} percentage - The new percentage value (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 .... 5
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image to display based on the current percentage.
     * @returns {number} The index of the image in the `IMAGES` array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5
        } else if (this.percentage >= 80) {
            return 4
        } else if (this.percentage >= 60) {
            return 3
        } else if (this.percentage >= 40) {
            return 2
        } else if (this.percentage >= 20) {
            return 1
        } else {
            return 0
        }
    }

    /**
     * Increases the item count associated with this status bar by a fixed value (e.g., 20).
     * Used for tracking collectibles like coins or ammo.
     */
    pickupItem() {
        this.itemCount += 20;
    }
}