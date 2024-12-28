/**
 * Represents the final boss in the game, with unique behaviors and animations.
 * Extends the `EnemyObject` class.
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

    offset = {
        top: 120,
        left: 270,
        right: 50,
        bottom: 0
    }

    // monster_sound = new Audio('audio/monster-sound.mp3');
    // monster_hurt_sound = new Audio('audio/endboss-hurt.mp3');
    summon_sound = new Audio('audio/boss-summon.mp3');
    sword_hit_sound = new Audio('audio/endboss-sword.mp3');


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
     * Handles the animation and behavior of the boss.
     */
    animate() {
        let attackCounter = 100;
        let attackReady = false;
        let summonBat = false;
        let currentAnimation = null;
        let i = 0

        setInterval(() => {
            if (this.endBossDead()) {
                if (currentAnimation !== this.IMAGES_DEATH) {
                    this.currentImage = 0; // Animation beginnt neu
                    currentAnimation = this.IMAGES_DEATH;
                }
                this.playAnimation(this.IMAGES_DEATH);
                // if (sound) {
                //     this.monster_sound.play();
                // }
                endbossSound.play();
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                // if (sound) {
                //     this.monster_hurt_sound.play();
                // }
                endbossHurtSound.play();
            }
            else if (summonBat && attackReady) {
                if (currentAnimation !== this.IMAGES_ALERT) {
                    this.currentImage = 0; // Animation beginnt neu
                    currentAnimation = this.IMAGES_ALERT;
                }
                this.playAnimation(this.IMAGES_ALERT);
                if (this.currentImage > 8) {
                    this.currentImage = 5;
                } else if (this.currentImage < 5 || this.currentImage > 7) {
                    this.currentImage = 5;
                }
            }
            else if (attackCounter < 50 && attackReady) {
                if (currentAnimation !== this.IMAGES_ATTACK) {
                    if (i == 1) {
                        this.swordAttack = true;
                        // console.log('Boss Sword Attack is True');
                        setTimeout(() => {
                            // if (sound) {
                            //     this.sword_hit_sound.play();
                            // }
                            endbossSwordHitSound.play();
                        }, 200);
                    }
                    i++
                    this.currentImage = 0; // Animation beginnt neu
                    currentAnimation = this.IMAGES_ATTACK;
                }
                this.playAnimation(this.IMAGES_ATTACK);
                if (this.currentImage > 8) {
                    i = 0;
                    this.swordAttack = false;
                    // console.log('Boss Sword Attack is False');
                }
                if (attackCounter < 0) {
                    attackCounter = 100;
                }
            }
            else if (attackReady) {
                if (currentAnimation !== this.IMAGES_WALKING) {
                    this.currentImage = 0; // Animation beginnt neu
                    currentAnimation = this.IMAGES_WALKING;
                }
                this.playAnimation(this.IMAGES_WALKING);
                if (this.otherDirection) {
                    this.moveRight();
                } else {
                    this.moveLeft();
                }

            }
            else {
                if (currentAnimation !== this.IMAGES_IDLE) {
                    this.currentImage = 0; // Animation beginnt neu
                    currentAnimation = this.IMAGES_IDLE;
                }
                this.playAnimation(this.IMAGES_IDLE);
            }
            attackCounter -= 2;
        }, 200);


        setInterval(() => {
            if (this.enemyEnergy < 1000 && this.enemyEnergy > 0) {
                this.enemyEnergy += 5;
            }
            if (world.character.x > 2600 && !this.hadFirstContact) {
                this.hadFirstContact = true
                attackReady = true;
                summonBat = true;
                // if (sound) {
                //     this.monster_sound.play();
                // }
                endbossSound.play();
            }
            if (summonBat && attackReady) {
                this.summonEnemies();
                // if (sound) {
                //     this.summon_sound.play();
                // }
                endbossSummonSound.play();
            }
        }, 1000);


        setInterval(() => {
            summonBat = !summonBat;
        }, 7000);
    }


    /**
     * Checks if the boss is dead.
     * @returns {boolean} True if the boss is dead, false otherwise.
     */
    endBossDead() {
        return this.enemyEnergy == 0;
    }


    /**
     * Summons enemy reinforcements near the boss.
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