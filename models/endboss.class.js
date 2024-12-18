class Endboss extends EnemyObject {
    height = 330;
    width = 430;
    y = 70;

    enemyEnergy = 1000;

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


    hadFirstContact = false;

    constructor() {
        super().loadImage(this.IMAGES_HURT[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.animate();

        this.x = 1200;
    }

    animate() {

        let i = 0;
        let attackCounter = 100;

        let alertTriggered = false;

        setInterval(() => {
            if (this.endBossDead()) {
                this.playAnimation(this.IMAGES_DEATH);
            }


            else if (this.enemyEnergy <= 600 && !alertTriggered) {
                this.playAnimation(this.IMAGES_ALERT);
                this.summonEnemies(); // Methode zum Beschwören neuer GegnerÍ‚
                // this.summonEnemies(); // Methode zum Beschwören neuer Gegner
            }

            else if (i < 10) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (attackCounter < 50) {
                this.playAnimation(this.IMAGES_ATTACK);
                if (attackCounter < 0) {
                    attackCounter = 100;
                }
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }


            if (this.enemyEnergy <= 400 && !alertTriggered) {
                alertTriggered = true; // Sicherstellen, dass Alert nur einmal passiert
            }


            if (world.character.x > 900 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true
            }

            i++;
            attackCounter -= 2

        }, 200);

        setInterval(() => {
            if (this.enemyEnergy < 1000 && this.enemyEnergy > 0) {
                this.enemyEnergy += 10;
            }
        }, 1000)
    }


    endBossDead() {
        return this.enemyEnergy == 0;
    }


    summonEnemies() {
        console.log("Der Endboss beschwört Verstärkung!");
        for (let j = 0; j < 3; j++) { // Beschwöre z.B. 3 neue Gegner
            let newEnemy = new Bat(); // Erstelle einen neuen Gegner
            newEnemy.x = this.x + 350 // Setze die Gegnerposition nahe beim Endboss
            newEnemy.y = 70 + Math.random() * 200;; // Standard Y-Position
            world.level.enemies.push(newEnemy); // Füge den Gegner zur Gegnerliste hinzu
        }
    }


}