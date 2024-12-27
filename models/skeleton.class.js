/**
 * Represents a skeleton enemy in the game.
 * Extends the `EnemyObject` class for shared enemy functionality.
 */
class Skeleton extends EnemyObject {
    height = 150;
    width = 150;
    y = 240;

    run = false;
    jump = false;
    dead = false;
    walkRight = false;

    runCounter = Math.round(Math.random() * 100);
    jumpCounter = Math.round(Math.random() * 200);

    offset = {
        top: 65,
        left: 50,
        right: 50,
        bottom: 0
    }

    skeleton_hurt = new Audio('audio/skeleton-dead.mp3');

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

    IMAGES_RUN = [
        'img/3_enemies/skeleton/run/skeleton-run1.png',
        'img/3_enemies/skeleton/run/skeleton-run2.png',
        'img/3_enemies/skeleton/run/skeleton-run3.png',
        'img/3_enemies/skeleton/run/skeleton-run4.png',
        'img/3_enemies/skeleton/run/skeleton-run5.png',
        'img/3_enemies/skeleton/run/skeleton-run6.png',
        'img/3_enemies/skeleton/run/skeleton-run7.png'
    ]

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
        'img/3_enemies/skeleton/attack1/skeleton-attack7.png',

        'img/3_enemies/skeleton/attack2/skeleton-attack1.png',
        'img/3_enemies/skeleton/attack2/skeleton-attack2.png',
        'img/3_enemies/skeleton/attack2/skeleton-attack3.png',
        'img/3_enemies/skeleton/attack2/skeleton-attack4.png',

        'img/3_enemies/skeleton/attack3/skeleton-attack1.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack2.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack3.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack4.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack5.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack6.png',
        'img/3_enemies/skeleton/attack3/skeleton-attack7.png'
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


    /**
     * Constructs a new instance of `Skeleton` with randomized properties and animations.
     */
    constructor() {
        super().loadImage('img/3_enemies/skeleton/walk/skeleton-walk1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK_1);
        this.loadImages(this.IMAGES_ATTACK_2);
        this.loadImages(this.IMAGES_ATTACK_3);
        this.x = 500 + Math.random() * 4200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.applyGravity();
        this.animate();
    }


    /**
     * Animates the skeleton enemy by managing movement and animations.
     */
    animate() {
        setInterval(() => {
            if (this.walkRight) {
                this.moveRight();
                this.otherDirection = false;
            } else {
                this.moveLeft();
                this.otherDirection = true;
            }

        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.enemyEnergy == 0) {
                this.enemyDie();
            } else if (this.isHurt()) {
                this.enemyHurt();
            } else if (this.runCounter > 100) {
                this.enemyRun();
            }
            this.runCounter++
            this.jumpCounter++
        }, 200);
    }



    /**
     * Handles the death of the skeleton enemy.
     * Plays the death animation, stops movement, and triggers the death sound.
     */
    enemyDie() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        if (!this.dead) {
            this.dead = true;
            if (sound) {
                this.skeleton_hurt.play();
            }
        }
    }



    /**
     * Handles the skeleton's hurt state by playing the hurt animation.
     */
    enemyHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.runCounter = 97;
    }


    /**
     * Handles the skeleton's jump state by playing the jump animation.
     * Initiates a jump if not already jumping.
     */
    enemyJump() {
        this.playAnimation(this.IMAGES_JUMP);
        if (!this.jump) {
            this.speedY = 30;
            this.jump = true;
        } else if (this.jumpCounter > 310) {
            this.jumpCounter = Math.round(Math.random() * 200);
            this.jump = false;
        }

    }

    /**
    * Handles the skeleton's run state by increasing speed and playing the run animation.
    * Toggles the run state based on the run counter.
    */
    enemyRun() {
        this.playAnimation(this.IMAGES_RUN);
        if (!this.run) {
            this.speed = this.speed * 8;
            this.run = true;
        } else if (this.runCounter > 110) {
            this.runCounter = Math.round(Math.random() * 100);
            this.speed = this.speed / 8;
            this.run = false;
        }
    }


}

