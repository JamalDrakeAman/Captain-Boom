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
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
    ammo = [new Ammo(), new Ammo(), new Ammo(), new Ammo(), new Ammo(), new Ammo()];


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
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkPickupCoins();
            this.checkPickupAmmo();
            this.checkShootHitEnemys();
            this.checkCollisionsWithSword();

            this.clearDeadEnemys();
            // this.checkEnemyClose();
        }, 100)
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.ammoStatusBar.itemCount > 0) {

            if (this.character.otherDirection) {
                let ammo = new ThrowableObject(this.character.x - 10, this.character.y + 30, this.character.otherDirection);
                this.throwableObjects.push(ammo);
                this.ammoStatusBar.itemCount--;
                this.character.shoot_sound.play();
                setTimeout(() => {
                    this.throwableObjects.splice(0, 1);
                }, 300)
            } else {
                let ammo = new ThrowableObject(this.character.x + 160, this.character.y + 30);
                this.throwableObjects.push(ammo);
                this.ammoStatusBar.itemCount--;
                this.character.shoot_sound.play();
                setTimeout(() => {
                    this.throwableObjects.splice(0, 1);
                }, 300)
            }
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                // console.log('Collision with Character, energy', this.character.energy);
                this.healthStatusBar.setPercentage(this.character.energy);
            }
        });
    }


    checkCollisionsWithSword() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingWithSword(enemy)) {
                console.log('Collision with Sword, energy', this.character.energy);
                if (this.keyboard.F) {
                    // this.level.enemies.splice(index, 1);
                    enemy.swordHit();
                    console.log('Hit enemy Energy', enemy.enemyEnergy);
                    enemy.showEnergy = true; // Energieanzeige aktivieren
                    setTimeout(() => enemy.showEnergy = false, 2000); // Nach 2 Sekunden ausblenden
                }
            }
        });
    }


    checkPickupCoins() { // Muss noch irgendwie nach index entfernt werden sonst wird immer nur das erste entfernt 
        this.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                console.log('Collision with coin');
                this.character.coins_sound.play();
                this.coins.splice(index, 1);
                this.coinStatusBar.pickupItem();
                // this.coinStatusBar.setPercentage(this.coinStatusBar.itemCount);
            }
        });
    }


    checkPickupAmmo() { // Muss noch irgendwie nach index entfernt werden sonst wird immer nur das erste entfernt 
        this.ammo.forEach((ammo, index) => {
            if (this.character.isColliding(ammo)) {
                console.log('Collision with ammo');
                this.character.loaded_sound.play();
                this.ammo.splice(index, 1)
                this.ammoStatusBar.pickupItem();
                // this.coinStatusBar.setPercentage(this.character.energy);
            }
        });
    }


    checkShootHitEnemys() {
        this.level.enemies.forEach((enemy, index) => {

            this.throwableObjects.forEach((obj) => {
                if (obj.isColliding(enemy)) {
                    // this.throwableObjects.hit();
                    // console.log('Ammo Collision with Character', this.throwableObjects);
                    // console.log('Ammo', obj);
                    console.log('Enemy', enemy);

                    // this.level.enemies.splice(index, 1);
                    this.level.enemies[index].shootHit()
                    // this.level.enemies[index].enemyDie();

                    // this.healthStatusBar.setPercentage(this.character.energy);
                    enemy.showEnergy = true; // Energieanzeige aktivieren
                    setTimeout(() => enemy.showEnergy = false, 2000); // Nach 2 Sekunden ausblenden
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

    // checkEnemyClose(){
    //     this.level.enemies.forEach((enemy, index) => {
    //         if (Math.abs(this.character.x - enemy.x) <= 200) {
    //            console.log('Enemy go Attack', enemy);

    //         }
    //     });
    // }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

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

        this.ctx.fillStyle = 'red';
        this.ctx.fillText(`${this.level.enemies[this.level.enemies.length - 1].enemyEnergy} o`, 590, 90);

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