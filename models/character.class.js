/**
 * Represents the main character of the game.
 * Extends the `MovableObject` class and includes various animations, sounds, and interactions.
 */
class Character extends MovableObject {
    height = 400;
    width = 450;
    y = 80;
    speed = 10;
    enemyHit = false;

    offset = {
        top: 140,
        left: 190,
        right: 190,
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
        'img/1_character/dead/pirate_dead1.png',
        'img/1_character/dead/pirate_dead1.png',
        'img/1_character/dead/pirate_dead1.png',
        'img/1_character/dead/pirate_dead1.png',

        'img/1_character/dead/pirate_dead1.png',
        'img/1_character/dead/pirate_dead2.png',
        'img/1_character/dead/pirate_dead3.png',
        'img/1_character/dead/pirate_dead4.png'
    ];

    IMAGES_GUN_OUT = [
        'img/1_character/gun-out/pirate_gun_out0.png',
        'img/1_character/gun-out/pirate_gun_out0.png',
        'img/1_character/gun-out/pirate_gun_out0.png',
        'img/1_character/gun-out/pirate_gun_out0.png',

        'img/1_character/gun-out/pirate_gun_out1.png',
        'img/1_character/gun-out/pirate_gun_out1.png',
        'img/1_character/gun-out/pirate_gun_out1.png',
        'img/1_character/gun-out/pirate_gun_out1.png',

        'img/1_character/gun-out/pirate_gun_out2.png',
        'img/1_character/gun-out/pirate_gun_out2.png',
        'img/1_character/gun-out/pirate_gun_out2.png',
        'img/1_character/gun-out/pirate_gun_out2.png',

        'img/1_character/gun-out/pirate_gun_out3.png',
        'img/1_character/gun-out/pirate_gun_out3.png',
        'img/1_character/gun-out/pirate_gun_out3.png',
        'img/1_character/gun-out/pirate_gun_out3.png',

        'img/1_character/gun-out/pirate_gun_out4.png',
        'img/1_character/gun-out/pirate_gun_out4.png',
        'img/1_character/gun-out/pirate_gun_out4.png',
        'img/1_character/gun-out/pirate_gun_out4.png',

        'img/1_character/gun-out/pirate_gun_out5.png',
        'img/1_character/gun-out/pirate_gun_out5.png',
        'img/1_character/gun-out/pirate_gun_out5.png',
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

        'img/1_character/sword-attack2/pirate_attack2_0.png',
        'img/1_character/sword-attack2/pirate_attack2_1.png',
        'img/1_character/sword-attack2/pirate_attack2_2.png',
        'img/1_character/sword-attack2/pirate_attack2_3.png',
        'img/1_character/sword-attack2/pirate_attack2_4.png',
        'img/1_character/sword-attack2/pirate_attack2_5.png',

        'img/1_character/sword-attack3/pirate_attack3_0.png',
        'img/1_character/sword-attack3/pirate_attack3_1.png',
        'img/1_character/sword-attack3/pirate_attack3_2.png',
        'img/1_character/sword-attack3/pirate_attack3_3.png',
        'img/1_character/sword-attack3/pirate_attack3_4.png',
        'img/1_character/sword-attack3/pirate_attack3_5.png'
    ];

    world;


    /**
     * Constructs a new `Character` instance.
     * Initializes the character's animations, loads images, applies gravity, and starts animations.
     */
    constructor() {
        super().loadImage('img/1_character/walk/pirate_run1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_FALLING);
        this.loadImages(this.IMAGES_LANDING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_GUN_SHOOT);
        this.loadImages(this.IMAGES_SWORD_ATTACK_1);
        this.applyGravity();
        this.animate();
    }


    /**
     * Manages the character's animations and interactions with the game world.
     * Handles movement, jumping, attacking, and playing appropriate animations and sounds.
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 80);
    }

    moveCharacter() {
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x - 35;
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
            characterWalkSound.play();
        }
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -100;
    }

    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) {
            characterWalkSound.play();
        }
    }

    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    jump() {
        super.jump();
        this.isLanding = false;
        characterJumpSound.play();
    }


    playCharacter() {
        this.playAnimation(this.IMAGES_IDLE);
        if (this.isDead()) {
            this.dead();
        } else if (this.isHurt()) {
            this.hurt();
        } else if (this.world.keyboard.D) {
            this.trigger();
        } else if (this.world.keyboard.F) {
            this.swordHit();
        } else if (this.isAboveGround()) {
            this.handleJumpAndFall();
        } else {
            this.walk();
        }
    }

    dead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        this.resetCurrentImage();
    }

    hurt() {
        this.playAnimation(this.IMAGES_HURT);
        characterHurtSound.play();
    }

    trigger() {
        characterTriggerSound.play();
        this.playAnimation(this.IMAGES_GUN_SHOOT);
    }

    swordHit() {
        this.playAnimation(this.IMAGES_SWORD_ATTACK_1);
        characterSwordSound.play();
    }

    walk() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    resetCurrentImage() {
        if (this.currentImage > 8) {
            this.currentImage = 5;
        } else if (this.currentImage < 5 || this.currentImage > 7) {
            this.currentImage = 5;
        }
    }


    /**
     * Restores a portion of the character's energy (health).
     */
    health() {
        if (this.energy <= 80) {
            this.energy = this.energy + 20;
        } else {
            this.energy = 100;
        }
    }


    /**
     * Handles the character's jump and fall animations.
     */
    handleJumpAndFall() {
        if (this.speedY > 0) {
            this.jumping();
        } else {
            this.playAnimation(this.IMAGES_FALLING);
            this.falling();
            this.landing();
        }
    }

    jumping() {
        this.playAnimation(this.IMAGES_JUMPING);
        if (this.currentImage < 1) {
            this.currentImage--
        }
    }

    falling() {
        if (this.currentImage < 1) {
            this.currentImage--
            this.isLanding = false;
        }
    }

    landing() {
        if (this.y > 50 && !this.isLanding) {
            this.counter = 1
            this.playAnimation(this.IMAGES_LANDING);
            characterLandingSound.play();
        }
    }

}