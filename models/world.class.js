class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    healthStatusBar = new HealthStatusBar();
    coinStatusBar = new CoinStatusBar();
    ammoStatusBar = new AmmoStatusBar();
    throwableObjects = [];

    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
    ammo = [new Ammo(), new Ammo(), new Ammo(), new Ammo(), new Ammo(), new Ammo()];
    health = [new Health(), new Health(), new Health()];

    endBoss = this.level.enemies.find(enemie => enemie.boss);

    // characterRight = false;

    moveCamera = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkJumpOnEnemy();
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkPickupCoins();
            this.checkPickupAmmo();
            this.checkPickupHealth()
            this.checkShootHitEnemys();
            this.checkCollisionsWithSword();
            this.clearDeadEnemys();
            this.checkEnemyDistance();
            this.checkEndBossDistance();
            this.checkCharacterIsDead();
            this.checkEndbossIsDead();
            this.checkCollisionEndbossAttack();
        }, 100)
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.ammoStatusBar.itemCount > 0) {
            if (this.character.otherDirection) {
                let ammo = new ThrowableObject(this.character.x - 10, this.character.y + 30, this.character.otherDirection);
                this.throwableObjects.push(ammo);
                this.ammoStatusBar.itemCount--;
                if (sound) {
                    this.character.shoot_sound.play();
                }
                setTimeout(() => this.throwableObjects.splice(0, 1), 300);
            } else {
                let ammo = new ThrowableObject(this.character.x + 160, this.character.y + 30);
                this.throwableObjects.push(ammo);
                this.ammoStatusBar.itemCount--;
                if (sound) {
                    this.character.shoot_sound.play();
                }
                setTimeout(() => this.throwableObjects.splice(0, 1), 300)
            }
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.enemyHit) {
                this.character.hit();
                this.healthStatusBar.setPercentage(this.character.energy);
            }
        });
    }


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


    checkCollisionEndbossAttack() {
        let attackCharacter = this.endBoss.swordAttack;
        if (this.character.isEndbossAttackColliding(this.endBoss)) {
            if (attackCharacter && this.endBoss.currentImage > 4) {
                this.character.hit();
                this.healthStatusBar.setPercentage(this.character.energy);
            }
        }
    }


    checkPickupCoins() {
        this.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                this.coins.splice(index, 1);
                this.coinStatusBar.pickupItem();
                if (sound) {
                    this.character.coins_sound.play();
                }
            }
        });
    }


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


    checkPickupAmmo() {
        this.ammo.forEach((ammo, index) => {
            if (this.character.isColliding(ammo)) {
                this.ammo.splice(index, 1)
                this.ammoStatusBar.pickupItem();
                if (sound) {
                    this.character.loaded_sound.play();
                }
            }
        });
    }


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


    clearDeadEnemys() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.enemyEnergy == 0) {
                setTimeout(() => {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                }, 1000)
            }
        });
    }


    checkEndbossIsDead() {
        if (this.endBoss.enemyEnergy == 0) {
            winGame = true;
            stopGame();
        }
    }


    checkCharacterIsDead() {
        if (this.healthStatusBar.percentage == 0) {
            stopGame();
        }
    }


    checkEnemyDistance() {
        let distance = 100000000000;
        this.level.enemies.forEach(enemy => {
            let enemyDistance = Math.abs(enemy.x - this.character.x - 100);
            if (enemyDistance < distance) {
                distance = enemyDistance;
            }
            // console.log('Distance Enemy to Character', enemy.distance);
        })
        if (distance < 400) {
            // console.log('Distance Enemy to Character', distance);
        }
        return distance;
    }


    checkEndBossDistance() {
        let distance = 100000000000;
        let enemyDistance = this.endBoss.x - this.character.x + 120;
        if (enemyDistance < distance) {
            distance = enemyDistance;
        }
        // console.log('Distance EndBoss to Character', enemyDistance);
        if (distance < 400 && distance > 0) {
            console.log('Distance EndBoss to Character', distance);
            console.log('Move Left');
            this.endBoss.otherDirection = false;

            this.cameraPositionLeft();

        } else if (distance < 0 && distance > - 400) {
            console.log('Move Right', distance);
            this.endBoss.otherDirection = true;

            this.cameraPositionRight();
        }
        return distance;
    }


    cameraPositionRight() {
        // Wenn moveCamera weniger als 20 ist, dann sanft nach rechts verschieben
        if (this.moveCamera < 2) {
            this.moveCamera += 0.1; // Sanftere Bewegung nach rechts
            console.log('moveCamera', this.moveCamera);
            
        } else {
            // Wenn moveCamera die Grenze erreicht hat, stoppe die Bewegung
            this.moveCamera = 2; // Setze den maximalen Wert
        }
    }
    
    cameraPositionLeft() {
        // Wenn moveCamera mehr als 0 ist, dann sanft nach links verschieben
        if (this.moveCamera > 0) {
            this.moveCamera -= 0.1; // Sanftere Bewegung nach links
            console.log('moveCamera', this.moveCamera);
        } else {
            // Wenn moveCamera die Grenze erreicht hat, stoppe die Bewegung
            this.moveCamera = 0; // Setze den minimalen Wert
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x + this.moveCamera, 0);
        this.resetShadow();
        this.addObjectsToMap(this.level.backgroundObjects);
        this.enableShadow();
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.ammoStatusBar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.ammo);
        this.addObjectsToMap(this.health);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.level.enemies.forEach((enemy) => {
            if (enemy.showEnergy) {
                this.ctx.font = '25px pirates, Arial, Helvetica, sans-serif';
                this.ctx.fillStyle = 'red';
                this.ctx.fillText(`${enemy.enemyEnergy}o`, enemy.x + enemy.width / 2, enemy.y + 45);
            }
        });

        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        // Dynamische Anzeige
        this.ctx.font = '40px pirates, Arial, Helvetica, sans-serif';
        this.ctx.fillStyle = '#51bbe8';
        this.ctx.fillText(`${this.coinStatusBar.itemCount}`, 100, 100);
        this.ctx.fillText(`${this.ammoStatusBar.itemCount}`, 100, 155);

        this.endBossStatus();

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    enableShadow() {
        this.ctx.shadowColor = '#000000'; // Schattenfarbe
        this.ctx.shadowBlur = 10; // Weiche des Schattens
        this.ctx.shadowOffsetX = 5; // Horizontale Verschiebung
        this.ctx.shadowOffsetY = 5; // Vertikale Verschiebung
    }


    resetShadow() {
        this.ctx.shadowColor = 'transparent'; // Schattenfarbe entfernen
        this.ctx.shadowBlur = 0; // Schatten unsichtbar machen
        this.ctx.shadowOffsetX = 0; // Horizontal zurücksetzen
        this.ctx.shadowOffsetY = 0; // Vertikal zurücksetzen
    }


    endBossStatus() {
        let endBossEnergy = this.endBoss.enemyEnergy
        if (endBossEnergy) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillText(`${endBossEnergy}o`, 600, 90);
        }
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawHitbox(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}