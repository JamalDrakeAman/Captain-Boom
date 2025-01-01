class Collisions {


    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.enemyHit && enemy.enemyEnergy > 0) {
                this.character.hit();
                this.healthStatusBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * Checks if the character jumps on an enemy, applying the appropriate effects.
     */
    checkJumpOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0 && !this.character.enemyHit) {
                this.character.enemyHit = true;
                enemy.jumpHit();
                this.character.bounceOffEnemy();
                enemy.showEnergy = true;
                setTimeout(() => enemy.showEnergy = false, 2000);
                setTimeout(() => this.character.enemyHit = false, 500);
            }
        })
    }


    /**
     * Handles collisions between the character's sword and enemies.
     */
    checkCollisionsWithSword() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingWithSword(enemy)) {
                if (this.keyboard.F) {
                    enemy.swordHit();
                    enemy.showEnergy = true;
                    setTimeout(() => enemy.showEnergy = false, 2000);
                }
            }
        });
    }


    /**
     * Checks for collisions between the character and the end boss's attack.
     */
    checkCollisionEndbossAttack() {
        let attackCharacter = this.endBoss.swordAttack;
        if (this.character.isEndbossAttackColliding(this.endBoss)) {
            if (attackCharacter && this.endBoss.currentImage > 4) {
                this.character.hit();
                this.healthStatusBar.setPercentage(this.character.energy);
            }
        }
    }


    /**
     * Checks if the character picks up any coins.
     */
    checkPickupCoins() {
        this.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                this.coins.splice(index, 1);
                this.coinStatusBar.pickupItem();
                characterCoinsSound.play();
            }
        });
    }


    /**
     * Checks if the character picks up any health items.
     */
    checkPickupHealth() {
        if (this.healthStatusBar.percentage < 100) {
            this.health.forEach((health, index) => {
                if (this.character.isColliding(health)) {
                    this.health.splice(index, 1);
                    this.character.health();
                    this.healthStatusBar.setPercentage(this.character.energy);
                }
            });
        }
    }


    /**
     * Checks if the character picks up any ammunition.
     */
    checkPickupAmmo() {
        this.ammo.forEach((ammo, index) => {
            if (this.character.isColliding(ammo)) {
                this.ammo.splice(index, 1)
                this.ammoStatusBar.pickupItem();
                characterLoadedSound.play();
            }
        });
    }


    /**
     * Checks if throwable objects hit any enemies.
     */
    checkShootHitEnemys() {
        this.level.enemies.forEach((enemy, index) => {
            this.throwableObjects.forEach((obj) => {
                if (obj.isColliding(enemy)) {
                    this.level.enemies[index].shootHit();
                    enemy.showEnergy = true;
                    setTimeout(() => enemy.showEnergy = false, 2000);
                }
            })
        });
    }
}