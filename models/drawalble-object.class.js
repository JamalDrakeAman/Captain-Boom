class DrawableObject {
    x = 120;
    y = 160;
    height = 150;
    width = 100;
    img;
    currentImage = 0;
    imageCache = {};


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('imge') <img id="image" src>
        this.img.src = path;
    }

    /**
 * 
 * @param {Array} arr - ['img/image1.pgn', 'img/image1.pgn', ....]
 */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Skeleton || this instanceof Skeleton2 || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

}