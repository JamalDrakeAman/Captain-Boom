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
     * Loads animation images, applies gravity, and starts the animation loop.
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
     * Starts the character's animation and movement logic.
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacter(), 80);
    }


    /**
     * Handles the character's movement based on keyboard inputs.
     */
    moveCharacter() {
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x - 35;
    }

    
    /**
     * Checks if the character can move to the right.
     * @returns {boolean} True if the character can move right.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * Moves the character to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
            characterWalkSound.play();
        }
    }


    /**
    * Checks if the character can move to the left.
    * @returns {boolean} True if the character can move left.
    */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -100;
    }


    /**
     * Moves the character to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) {
            characterWalkSound.play();
        }
    }


    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    /**
     * Makes the character jump.
     */
    jump() {
        super.jump();
        this.isLanding = false;
        characterJumpSound.play();
    }


    /**
     * Plays animations based on the character's state and keyboard inputs.
     */
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


    /**
     * Plays the character's death animation.
     */
    dead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        this.resetCurrentImage();
    }


    /**
     * Plays the character's hurt animation and sound.
     */
    hurt() {
        this.playAnimation(this.IMAGES_HURT);
        characterHurtSound.play();
    }


    /**
     * Triggers the gun-shooting animation and sound.
     */
    trigger() {
        characterTriggerSound.play();
        this.playAnimation(this.IMAGES_GUN_SHOOT);
    }


    /**
     * Triggers the sword attack animation and sound.
     */
    swordHit() {
        this.playAnimation(this.IMAGES_SWORD_ATTACK_1);
        characterSwordSound.play();
    }


    /**
     * Handles the character's walking animation.
     */
    walk() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * Resets the current image index for certain animations.
     */
    resetCurrentImage() {
        if (this.currentImage > 8) {
            this.currentImage = 5;
        } else if (this.currentImage < 5 || this.currentImage > 7) {
            this.currentImage = 5;
        }
    }


    /**
     * Restores a portion of the character's energy.
     */
    health() {
        if (this.energy <= 80) {
            this.energy = this.energy + 20;
        } else {
            this.energy = 100;
        }
    }


    /**
     * Manages jump and fall animations based on the character's speed and position.
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


    /**
     * Plays the jumping animation when the character is moving upward.
     * Decreases the current image index for a smooth transition between frames.
     */
    jumping() {
        this.playAnimation(this.IMAGES_JUMPING);
        if (this.currentImage < 1) {
            this.currentImage--
        }
    }


    /**
     * Plays the falling animation when the character is moving downward.
     * Ensures the landing animation is reset once the character is falling.
     */
    falling() {
        if (this.currentImage < 1) {
            this.currentImage--
            this.isLanding = false;
        }
    }


    /**
     * Plays the landing animation when the character hits the ground after a fall or jump.
     * Plays a landing sound and ensures the animation only triggers once per landing.
     */
    landing() {
        if (this.y > 50 && !this.isLanding) {
            this.counter = 1
            this.playAnimation(this.IMAGES_LANDING);
            characterLandingSound.play();
        }
    }

}