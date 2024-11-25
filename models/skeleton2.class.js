class Skeleton2 extends EnemyObject {
    height = 200;
    width = 200;
    y = 240;

    IMAGES_WALKING = [
        'img/3_enemies/skeleton2/walk/skeleton2-walk0.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk1.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk2.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk3.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk4.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk5.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk6.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk7.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk8.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk9.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk10.png',
        'img/3_enemies/skeleton2/walk/skeleton2-walk11.png',
    ];



    constructor() {
        super().loadImage('img/3_enemies/skeleton/walk/skeleton-walk1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

}