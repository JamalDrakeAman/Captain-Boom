class Cloud extends MovableObject {
    y = 20;
    height = 220;
    width = 500;

    constructor() {
        super().loadImage('img/5_background/layers/clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

}