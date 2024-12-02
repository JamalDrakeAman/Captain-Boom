class Skeleton extends EnemyObject {
    height = 150;
    width = 150;
    y = 240;

    offset = {
        top: 65,
        left: 50,
        right: 50,
        bottom: 0
    }

    IMAGES_WALKING = [
        'img/3_enemies/skeleton/walk/skeleton-walk1.png',
        'img/3_enemies/skeleton/walk/skeleton-walk2.png',
        'img/3_enemies/skeleton/walk/skeleton-walk3.png',
        'img/3_enemies/skeleton/walk/skeleton-walk4.png',
        'img/3_enemies/skeleton/walk/skeleton-walk5.png',
        'img/3_enemies/skeleton/walk/skeleton-walk6.png',
        'img/3_enemies/skeleton/walk/skeleton-walk7.png',
        'img/3_enemies/skeleton/walk/skeleton-walk8.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies/skeleton/walk/skeleton-walk1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 2200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


}

