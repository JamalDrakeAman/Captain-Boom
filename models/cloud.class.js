class Cloud extends MovableObject {
    y = 20;
    height = 220;
    width = 500;
    speed = 1;

    constructor() {
        super().loadImage('img/5_background/layers/clouds/1.png');
        this.x = Math.random() * 6000;
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 50)

    }

}