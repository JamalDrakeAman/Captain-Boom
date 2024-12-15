class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    counter = 0;
    counting = false;

    offset = {

    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 120;
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

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


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    // playAnimation(images) {
    //     let i = this.currentImage % images.length
    //     let path = images[i];
    //     this.img = this.imageCache[path];
    //     this.currentImage++
    // }


    playAnimation(images) {
        // console.log(this.counter);
        if (this.counting && this.counter > 0) {
            this.counter--
            // console.log('counter reduced');
        } else if (!this.counting && this.counter > 0) {
            this.counting = true;
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++
        } else if (this.counter == 0) {

            this.counting = false;
            // console.log('counter is null');
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
        this.currentImage = 0;
    }

}