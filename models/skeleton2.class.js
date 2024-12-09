class Skeleton2 extends EnemyObject {
    height = 200;
    width = 200;
    y = 240;

    offset = {
        top: 45,
        left: 70,
        right: 15,
        bottom: 45
    }

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

    IMAGES_DEAD = [
        'img/3_enemies/skeleton2/death/skeleton2-dead1.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead2.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead3.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead4.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead5.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead6.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead7.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead8.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead9.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead10.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead11.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead12.png',
        'img/3_enemies/skeleton2/death/skeleton2-dead13.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies/skeleton/walk/skeleton-walk1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * 2200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = true;
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);

        }, 200);

    }


    enemyDie() {
        this.playAnimation(this.IMAGES_DEAD);
    }

}