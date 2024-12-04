class Character extends MovableObject {
    height = 400;
    width = 400;
    y = 80;
    speed = 10;

    offset = {
        top: 125,
        left: 165,
        right: 165,
        bottom: 130
    };

    IMAGES_IDLE = [
        'img/1_character/idle/pirate_idle0.png',
        'img/1_character/idle/pirate_idle1.png',
        'img/1_character/idle/pirate_idle2.png',
        'img/1_character/idle/pirate_idle3.png',
        'img/1_character/idle/pirate_idle4.png'
    ];

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

    IMAGES_GUN_OUT = [
        'img/1_character/gun-out/pirate_gun_out0.png',
        'img/1_character/gun-out/pirate_gun_out1.png',
        'img/1_character/gun-out/pirate_gun_out2.png',
        'img/1_character/gun-out/pirate_gun_out3.png',
        'img/1_character/gun-out/pirate_gun_out4.png',
        'img/1_character/gun-out/pirate_gun_out5.png'
    ];

    IMAGES_GUN_SHOOT = [
        'img/1_character/gun-shoot/pirate_gun_shoot0.png',
        'img/1_character/gun-shoot/pirate_gun_shoot1.png',
        'img/1_character/gun-shoot/pirate_gun_shoot2.png',
        'img/1_character/gun-shoot/pirate_gun_shoot3.png',
        'img/1_character/gun-shoot/pirate_gun_shoot4.png'
    ];

    IMAGES_SWORD_ATTACK_1 = [
        'img/1_character/sword-attack1/pirate_attack1_0.png',
        'img/1_character/sword-attack1/pirate_attack1_1.png',
        'img/1_character/sword-attack1/pirate_attack1_2.png',
        'img/1_character/sword-attack1/pirate_attack1_3.png',
        'img/1_character/sword-attack1/pirate_attack1_4.png',
        'img/1_character/sword-attack1/pirate_attack1_5.png',
        // ATTACK 2
        'img/1_character/sword-attack2/pirate_attack2_0.png',
        'img/1_character/sword-attack2/pirate_attack2_1.png',
        'img/1_character/sword-attack2/pirate_attack2_2.png',
        'img/1_character/sword-attack2/pirate_attack2_3.png',
        'img/1_character/sword-attack2/pirate_attack2_4.png',
        'img/1_character/sword-attack2/pirate_attack2_5.png',
        // ATTACK 3
        'img/1_character/sword-attack3/pirate_attack3_0.png',
        'img/1_character/sword-attack3/pirate_attack3_1.png',
        'img/1_character/sword-attack3/pirate_attack3_2.png',
        'img/1_character/sword-attack3/pirate_attack3_3.png',
        'img/1_character/sword-attack3/pirate_attack3_4.png',
        'img/1_character/sword-attack3/pirate_attack3_5.png'


    ];

    // IMAGES_SWORD_ATTACK_2 = [
    //     'img/1_character/sword-attack2/pirate_attack2_0.png',
    //     'img/1_character/sword-attack2/pirate_attack2_1.png',
    //     'img/1_character/sword-attack2/pirate_attack2_2.png',
    //     'img/1_character/sword-attack2/pirate_attack2_3.png',
    //     'img/1_character/sword-attack2/pirate_attack2_4.png',
    //     'img/1_character/sword-attack2/pirate_attack2_5.png',
    // ];

    // IMAGES_SWORD_ATTACK_3 = [
    //     'img/1_character/sword-attack3/pirate_attack3_0.png',
    //     'img/1_character/sword-attack3/pirate_attack3_1.png',
    //     'img/1_character/sword-attack3/pirate_attack3_2.png',
    //     'img/1_character/sword-attack3/pirate_attack3_3.png',
    //     'img/1_character/sword-attack3/pirate_attack3_4.png',
    //     'img/1_character/sword-attack3/pirate_attack3_5.png',
    // ];

    world;

    walking_sound = new Audio('audio/walk.mp3');
    shoot_sound = new Audio('audio/shot.mp3');
    sword_sound = new Audio('audio/sword.mp3');
    trigger_sound = new Audio('audio/trigger.mp3');

    loaded_sound = new Audio('audio/load-ammo.mp3');
    coins_sound = new Audio('audio/coins.mp3');

    constructor() {
        super().loadImage('img/1_character/walk/pirate_run1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_GUN_SHOOT);
        this.loadImages(this.IMAGES_SWORD_ATTACK_1);
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
            this.playAnimation(this.IMAGES_IDLE);
        }, 1000 / 10)


        setInterval(() => {

            if (this.world.keyboard.D) {
                this.trigger_sound.play();
                this.playAnimation(this.IMAGES_GUN_SHOOT);
            }

            if (this.world.keyboard.F) {
                this.playAnimation(this.IMAGES_SWORD_ATTACK_1);
                this.sword_sound.play();
            }
        }, 1000 / 20)

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
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