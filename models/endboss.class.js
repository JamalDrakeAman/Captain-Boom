/**
 * Represents the final boss in the game, with unique behaviors, animations, and abilities.
 * Inherits properties and methods from the `EnemyObject` class.
 */
class Endboss extends EnemyObject {
    height = 330;
    width = 430;
    y = 70;
    x = 3000;
    speed = 15;
    enemyEnergy = 1000;
    boss = true;
    swordAttack = false;
    bossOnTheRight = false;
    hadFirstContact = false;
    currentAnimation = null;
    attackCounter = 100;
    attackReady = false;
    summonBat = false;
    hitCounter = 0;

    offset = {
        top: 120,
        left: 270,
        right: 50,
        bottom: 0
    }


    IMAGES_IDLE = [
        'img/4_boss/idle/Bringer-of-Death_Idle_1.png',
        'img/4_boss/idle/Bringer-of-Death_Idle_2.png',
        'img/4_boss/idle/Bringer-of-Death_Idle_3.png',
        'img/4_boss/idle/Bringer-of-Death_Idle_4.png',
        'img/4_boss/idle/Bringer-of-Death_Idle_5.png',
        'img/4_boss/idle/Bringer-of-Death_Idle_6.png',
        'img/4_boss/idle/Bringer-of-Death_Idle_7.png',
        'img/4_boss/idle/Bringer-of-Death_Idle_8.png'
    ]

    IMAGES_WALKING = [
        'img/4_boss/walk/Bringer-of-Death_Walk_1.png',
        'img/4_boss/walk/Bringer-of-Death_Walk_2.png',
        'img/4_boss/walk/Bringer-of-Death_Walk_3.png',
        'img/4_boss/walk/Bringer-of-Death_Walk_4.png',
        'img/4_boss/walk/Bringer-of-Death_Walk_5.png',
        'img/4_boss/walk/Bringer-of-Death_Walk_6.png',
        'img/4_boss/walk/Bringer-of-Death_Walk_7.png',
        'img/4_boss/walk/Bringer-of-Death_Walk_8.png',

    ];

    IMAGES_ATTACK = [
        'img/4_boss/attack/Bringer-of-Death_Attack_1.png',
        'img/4_boss/attack/Bringer-of-Death_Attack_2.png',
        'img/4_boss/attack/Bringer-of-Death_Attack_3.png',
        'img/4_boss/attack/Bringer-of-Death_Attack_4.png',
        'img/4_boss/attack/Bringer-of-Death_Attack_5.png',
        'img/4_boss/attack/Bringer-of-Death_Attack_6.png',
        'img/4_boss/attack/Bringer-of-Death_Attack_7.png',
        'img/4_boss/attack/Bringer-of-Death_Attack_8.png',
        'img/4_boss/attack/Bringer-of-Death_Attack_9.png',
        'img/4_boss/attack/Bringer-of-Death_Attack_10.png'
    ];

    IMAGES_HURT = [
        'img/4_boss/hurt/Bringer-of-Death_Hurt_1.png',
        'img/4_boss/hurt/Bringer-of-Death_Hurt_2.png',
        'img/4_boss/hurt/Bringer-of-Death_Hurt_3.png'
    ];


    IMAGES_ALERT = [
        'img/4_boss/2_alert/Bringer-of-Death_Cast_1.png',
        'img/4_boss/2_alert/Bringer-of-Death_Cast_2.png',
        'img/4_boss/2_alert/Bringer-of-Death_Cast_3.png',
        'img/4_boss/2_alert/Bringer-of-Death_Cast_4.png',
        'img/4_boss/2_alert/Bringer-of-Death_Cast_5.png',
        'img/4_boss/2_alert/Bringer-of-Death_Cast_6.png',
        'img/4_boss/2_alert/Bringer-of-Death_Cast_7.png',
        'img/4_boss/2_alert/Bringer-of-Death_Cast_8.png',
        'img/4_boss/2_alert/Bringer-of-Death_Cast_9.png'
    ];

    IMAGES_DEATH = [
        'img/4_boss/5_dead/Bringer-of-Death_Death_1.png',
        'img/4_boss/5_dead/Bringer-of-Death_Death_2.png',
        'img/4_boss/5_dead/Bringer-of-Death_Death_3.png',
        'img/4_boss/5_dead/Bringer-of-Death_Death_4.png',
        'img/4_boss/5_dead/Bringer-of-Death_Death_5.png',
        'img/4_boss/5_dead/Bringer-of-Death_Death_6.png',
        'img/4_boss/5_dead/Bringer-of-Death_Death_7.png',
        'img/4_boss/5_dead/Bringer-of-Death_Death_8.png',
        'img/4_boss/5_dead/Bringer-of-Death_Death_9.png',
        'img/4_boss/5_dead/Bringer-of-Death_Death_10.png'
    ];


    /**
     * Creates an instance of the `Endboss` class and initializes animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_HURT[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.animate();
    }


    /**
     * Handles the animation and behavior of the boss through periodic updates.
     */
    animate() {
        setInterval(() => this.playEndboss(), 200);
        setInterval(() => {
            this.regenerateEnergy();
            this.checkFirstContact();
            this.checkSummonBat();
        }, 1000);
        setInterval(() => {
            this.summonBat = !this.summonBat;
        }, 7000);
    }

    regenerateEnergy() {
        if (this.enemyEnergy < 1000 && this.enemyEnergy > 0) {
            this.enemyEnergy += 5;
        }
    }

    checkFirstContact() {
        if (world.character.x > 2600 && !this.hadFirstContact) {
            this.hadFirstContact = true
            this.attackReady = true;
            this.summonBat = true;
            endbossSound.play();
        }
    }

    checkSummonBat() {
        if (this.summonBat && this.attackReady) {
            this.summonEnemies();
            endbossSummonSound.play();
        }
    }


    /**
     * Determines the current state of the boss and plays the appropriate animation.
     */
    playEndboss() {
        if (this.isBossDead())
            this.dead();
        else if (this.isHurt())
            this.hurt();
        else if (this.isSummon())
            this.summon();
        else if (this.isAttack())
            this.attack();
        else if (this.attackReady)
            this.walk();
        else {
            this.idle();
        }
        this.attackCounter -= 2;
    }


    /**
     * Plays the death animation and sound for the boss.
     */
    dead() {
        this.switchAnimation(this.IMAGES_DEATH);
        this.playAnimation(this.IMAGES_DEATH);
        endbossSound.play();
    }


    /**
     * Plays the hurt animation and sound for the boss.
     */
    hurt() {
        this.playAnimation(this.IMAGES_HURT);
        endbossHurtSound.play();
    }


    /**
     * Checks if the boss is summoning reinforcements.
     * @returns {boolean} True if summoning, false otherwise.
     */
    isSummon() {
        return this.summonBat && this.attackReady;
    }


    /**
     * Plays the summon animation and manages summoning logic.
     */
    summon() {
        this.switchAnimation(this.IMAGES_ALERT);
        this.playAnimation(this.IMAGES_ALERT);
        if (this.currentImage > 8) {
            this.currentImage = 5;
        } else if (this.currentImage < 5 || this.currentImage > 7) {
            this.currentImage = 5;
        }
    }


    /**
     * Checks if the boss is ready to attack.
     * @returns {boolean} True if attacking, false otherwise.
     */
    isAttack() {
        return this.attackCounter < 50 && this.attackReady;
    }


    /**
    * Plays the attack animation and manages attack logic.
    */
    attack() {
        if (this.currentAnimation !== this.IMAGES_ATTACK) {
            if (this.hitCounter == 1) {
                this.swordAttack = true;
                setTimeout(() => {
                    endbossSwordHitSound.play();
                }, 200);
            }
            this.hitCounter++
            this.currentImage = 0;
            this.currentAnimation = this.IMAGES_ATTACK;
        }
        this.playAnimation(this.IMAGES_ATTACK);
        if (this.currentImage > 8) {
            this.hitCounter = 0;
            this.swordAttack = false;
        }
        if (this.attackCounter < 0) {
            this.attackCounter = 100;
        }
    }


    /**
     * Plays the walking animation and moves the boss left or right.
     */
    walk() {
        this.switchAnimation(this.IMAGES_WALKING)
        this.playAnimation(this.IMAGES_WALKING);
        if (this.otherDirection) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }


    /**
     * Plays the idle animation for the boss.
     */
    idle() {
        this.switchAnimation(this.IMAGES_IDLE)
        this.playAnimation(this.IMAGES_IDLE);
    }


    /**
     * Switches the current animation to a new one.
     * @param {Array} newAnimation - Array of image paths for the new animation.
     */
    switchAnimation(newAnimation) {
        if (this.currentAnimation !== newAnimation) {
            this.currentImage = 0;
            this.currentAnimation = newAnimation;
        }
    }

    /**
     * Checks if the boss is dead.
     * @returns {boolean} True if the boss is dead, false otherwise.
     */
    isBossDead() {
        return this.enemyEnergy == 0;
    }


    /**
     * Summons enemy reinforcements (bats) near the boss's position.
     */
    summonEnemies() {
        for (let j = 0; j < 3; j++) {
            let newEnemy = new Bat();
            if (this.otherDirection) {
                newEnemy.x = this.x;
                newEnemy.otherDirection = true;
            } else {
                newEnemy.x = this.x + 350;
                newEnemy.otherDirection = false;
            }
            newEnemy.y = 70 + Math.random() * 250;
            world.level.enemies.push(newEnemy);
        }
    }


}