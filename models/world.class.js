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
    ammo = [new Ammo(), new Ammo(), new Ammo()];


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
        }, 100)
    }


    checkThrowObjects() {
        if (this.keyboard.D) {
            let ammo = new ThrowableObject(this.character.x + 100, this.character.y + 30);
            this.throwableObjects.push(ammo);
            setTimeout(() => {
                this.throwableObjects.splice(1, 1)
            }, 300)
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                console.log('Collision with Character, energy', this.character.energy);
                this.healthStatusBar.setPercentage(this.character.energy);
            }
        });
    }


    checkPickupCoins() { // Muss noch irgendwie nach index entfernt werden sonst wird immer nur das erste entfernt 
        this.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                console.log('Collision with coin');
                this.coins.splice(index, 1);
                this.coinStatusBar.pickupItem();
                this.coinStatusBar.setPercentage(this.coinStatusBar.itemCount);
            }
        });
    }


    checkPickupAmmo() { // Muss noch irgendwie nach index entfernt werden sonst wird immer nur das erste entfernt 
        this.ammo.forEach((ammo, index) => {
            if (this.character.isColliding(ammo)) {
                console.log('Collision with ammo');
                this.ammo.splice(index, 1)
                this.ammoStatusBar.pickupItem();
                // this.coinStatusBar.setPercentage(this.character.energy);
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
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
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0)

        // Dynamische Anzeige
        this.ctx.font = '35px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`${this.ammoStatusBar.itemCount}`, 100, 145);

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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