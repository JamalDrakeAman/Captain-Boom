/**
 * Represents a drawable object in the game. Provides functionality to load and draw images, 
 * and handles hitbox and frame rendering for debugging purposes.
 */
class DrawableObject {
    x = 120;
    y = 160;
    height = 150;
    width = 100;
    img;
    currentImage = 0;
    imageCache = {};


    /** 
     * Loads a single image into the object.
     * 
     * @param {string} path - The file path of the image to load.
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('imge') <img id="image" src>
        this.img.src = path;
    }


    /**
      * Preloads multiple images and stores them in the image cache.
      * 
      * @param {string[]} arr - An array of image file paths to preload.
      */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }


    /**
     * Draws the current image of the object onto the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }


    /**
     * Draws a frame around the object for debugging purposes.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Bat || this instanceof Skeleton || this instanceof Skeleton2) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    /**
     * Draws the hitbox of the object for debugging purposes.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Bat || this instanceof Skeleton || this instanceof Skeleton2) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

}