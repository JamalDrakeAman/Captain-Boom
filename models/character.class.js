class Character extends MovableObject {
    height = 400;
    width = 400;
    y = 80;
    speed = 10;
    IMAGES_WALKING = [
        'img/1_character/walk/pirate_run1.png',
        'img/1_character/walk/pirate_run2.png',
        'img/1_character/walk/pirate_run3.png',
        'img/1_character/walk/pirate_run4.png',
        'img/1_character/walk/pirate_run5.png',
        'img/1_character/walk/pirate_run6.png',
    ];

    IMAGES_JUMPING = [
        'img/1_character/jump/pirate_jump1.png',
        'img/1_character/jump/pirate_jump2.png'
    ];

    IMAGES_FALLING = [
        'img/1_character/fall/pirate_fall1.png',
        'img/1_character/fall/pirate_fall2.png'
    ];

    IMAGES_LANDING = [
        'img/1_character/landing/pirate_landing1.png',
        'img/1_character/landing/pirate_landing2.png'
    ];

    IMAGES_HURT = [
        'img/1_character/hurt/pirate_hurt1.png',
        'img/1_character/hurt/pirate_hurt2.png',
        'img/1_character/hurt/pirate_hurt3.png'
    ];

    IMAGES_DEAD = [
        'img/1_character/dead/pirate_dead1.png',
        'img/1_character/dead/pirate_dead2.png',
        'img/1_character/dead/pirate_dead3.png',
        'img/1_character/dead/pirate_dead4.png'
    ];

    world;
    walking_sound = new Audio('audio/walk.mp3')

    constructor() {
        super().loadImage('img/1_character/walk/pirate_run1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        // this.loadImages(this.IMAGES_FALLING);
        // this.loadImages(this.IMAGES_LANDING);

        this.applyGravity();
        this.animate();
    }

    animate() {


        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > -100) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }


            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x - 35;
        }, 1000 / 60)


        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
            } else
                if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                } else {
                    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                        // Walk animation
                        this.playAnimation(this.IMAGES_WALKING);
                    }
                }
        }, 50);
    }



}