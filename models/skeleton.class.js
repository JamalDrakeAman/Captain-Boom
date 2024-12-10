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

    IMAGES_JUMP = [
        'img/3_enemies/skeleton/jump/skeleton-jump1.png',
        'img/3_enemies/skeleton/jump/skeleton-jump2.png',
        'img/3_enemies/skeleton/jump/skeleton-jump3.png',
        'img/3_enemies/skeleton/jump/skeleton-jump4.png',
        'img/3_enemies/skeleton/jump/skeleton-jump5.png',
        'img/3_enemies/skeleton/jump/skeleton-jump6.png',
        'img/3_enemies/skeleton/jump/skeleton-jump7.png',
        'img/3_enemies/skeleton/jump/skeleton-jump8.png',
        'img/3_enemies/skeleton/jump/skeleton-jump9.png',
        'img/3_enemies/skeleton/jump/skeleton-jump10.png'
    ]

    IMAGES_HURT = [
        'img/3_enemies/skeleton/hurt/skeleton-hurt1.png',
        'img/3_enemies/skeleton/hurt/skeleton-hurt2.png',
        'img/3_enemies/skeleton/hurt/skeleton-hurt3.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies/skeleton/dead/skeleton-dead1.png',
        'img/3_enemies/skeleton/dead/skeleton-dead2.png',
        'img/3_enemies/skeleton/dead/skeleton-dead3.png'
    ]

    IMAGES_ATTACK_1 = [
        'img/3_enemies/skeleton/attack1/skeleton-attack1.png',
        'img/3_enemies/skeleton/attack1/skeleton-attack2.png',
        'img/3_enemies/skeleton/attack1/skeleton-attack3.png',
        'img/3_enemies/skeleton/attack1/skeleton-attack4.png',
        'img/3_enemies/skeleton/attack1/skeleton-attack5.png',
        'img/3_enemies/skeleton/attack1/skeleton-attack6.png',
        'img/3_enemies/skeleton/attack1/skeleton-attack7.png'
    ]

    IMAGES_ATTACK_2 = [
        'img/3_enemies/skeleton/attack2/skeleton-attack1.png',
        'img/3_enemies/skeleton/attack2/skeleton-attack2.png',
        'img/3_enemies/skeleton/attack2/skeleton-attack3.png',
        'img/3_enemies/skeleton/attack2/skeleton-attack4.png'
    ]

    IMAGES_ATTACK_3 = [
        'img/3_enemies/skeleton/attack3/skeleton-attack1.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack2.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack3.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack4.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack5.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack6.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack7.png'
    ]

    walkInterval;

    constructor() {
        super().loadImage('img/3_enemies/skeleton/walk/skeleton-walk1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK_1);
        this.loadImages(this.IMAGES_ATTACK_2);
        this.loadImages(this.IMAGES_ATTACK_3);
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
            if (this.enemyEnergy == 0) {
                this.enemyDie();
            } else if (this.isHurt()) {
                this.enemyHurt();
            }

        }, 200);

    }

    enemyDie() {
        this.playAnimation(this.IMAGES_DEAD);
        // this.speed = 0;
    }

    enemyHurt() {
        this.playAnimation(this.IMAGES_HURT);
    }


}

