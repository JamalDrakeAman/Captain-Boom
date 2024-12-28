/**
 * Represents a movable object in the game.
 * Extends the `DrawableObject` class for shared drawing functionality.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    counter = 0;
    counting = false;
    offset = {};


    /**
     * Applies gravity to the object by updating its vertical position and speed.
     * Gravity affects the object's vertical position (`y`).
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Determines if the object is above the ground.
     * @returns {boolean} `true` if the object is above ground, `false` otherwise.
     */
    isAboveGround() {
        return this.y < 120;
    }


    /**
     * Checks for a collision with another movable object.
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} `true` if the objects are colliding, `false` otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * Checks for a collision with a sword. Includes extended collision detection when facing opposite directions.
     * @param {MovableObject} mo - The sword object to check for collision.
     * @returns {boolean} `true` if the sword is colliding with the object, `false` otherwise.
     */
    isCollidingWithSword(mo) {
        if (this.otherDirection) {
            return this.x + this.offset.left - 75 < mo.x + mo.width - mo.offset.right && // Erweiterter Bereich nach links
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        } else {
            return this.x + this.width - this.offset.right + 75 > mo.x + mo.offset.left && // +100 für den erweiterten Bereich
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
        }
    }


    /**
     * Checks for a collision with an end boss attack. Includes extended collision detection when facing opposite directions.
     * @param {MovableObject} mo - The end boss attack object to check for collision.
     * @returns {boolean} `true` if the end boss attack is colliding with the object, `false` otherwise.
     */
    isEndbossAttackColliding(mo) {
        if (this.otherDirection) {
            return this.x + this.offset.left - 200 < mo.x + mo.width - mo.offset.right && // Erweiterter Bereich nach links
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        } else {
            return this.x + this.width - this.offset.right + 190 > mo.x + mo.offset.left && // +100 für den erweiterten Bereich
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
        }

    }


    /**
     * Decreases the object's energy by 5 upon being hit.
     * If the energy drops below 0, it is reset to 0. Updates the `lastHit` timestamp.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Determines if the object is hurt by checking if less than 1 second has passed since the last hit.
     * @returns {boolean} `true` if the object is hurt, `false` otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }


    /**
     * Checks if the object is dead (i.e., if its energy is 0).
     * @returns {boolean} `true` if the object is dead, `false` otherwise.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Plays the animation for the object by cycling through a set of images.
     * Includes a delay mechanism to control animation speed.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        if (this.counting && this.counter > 0) {
            this.counter--;
        } else if (!this.counting && this.counter > 0) {
            this.counting = true;
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else if (this.counter == 0) {
            this.counting = false;
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }


    /**
     * Moves the object to the right by increasing its horizontal position (`x`).
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its horizontal position (`x`).
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Makes the object jump by setting its vertical speed (`speedY`).
     */
    jump() {
        this.speedY = 30;
        this.currentImage = 0;
    }

    /**
     * Makes the object bounce off an enemy by setting its vertical speed (`speedY`).
     */
    bounceOffEnemy() {
        this.speedY = 20;
        this.currentImage = 0;
    }

}