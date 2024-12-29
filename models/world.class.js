/**
 * Represents the game world and its components.
 */
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
    moveCamera = 0;


    /**
     * Creates an instance of the game world.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game will be rendered.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Initializes the character's reference to this world.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Continuously checks for various game events and interactions at regular intervals.
     */
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


    //////////////////////////// noch Kürzen 
    checkThrowObjects() {
        if (this.keyboard.D && this.ammoStatusBar.itemCount > 0) {

            if (this.character.otherDirection) {
                let ammo = new ThrowableObject(this.character.x - 10, this.character.y + 30, this.character.otherDirection);
                this.throwableObjects.push(ammo);
            } else {
                let ammo = new ThrowableObject(this.character.x + 160, this.character.y + 30);
                this.throwableObjects.push(ammo);
            }
            this.ammoStatusBar.itemCount--;
            setTimeout(() => this.throwableObjects.splice(0, 1), 300)
            characterShootSound.play();
        }
    }


    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.enemyHit) {
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


    /**
     * Removes enemies with zero energy from the game.
     */
    clearDeadEnemys() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.enemyEnergy == 0) {
                setTimeout(() => {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                }, 1000)
            }
        });
    }


    /**
     * Checks if the end boss has been defeated and ends the game if so.
     */
    checkEndbossIsDead() {
        if (this.endBoss.enemyEnergy == 0) {
            winGame = true;
            stopGame();
        }
    }


    /**
     * Checks if the character's health is zero and ends the game if so.
     */
    checkCharacterIsDead() {
        if (this.healthStatusBar.percentage == 0) {
            stopGame();
        }
    }


    /**
     * Checks the distance between the character and each enemy, updating their walking direction.
     */
    checkEnemyDistance() {
        this.level.enemies.forEach(enemy => {
            let enemyDistance = enemy.x - this.character.x - 130;
            if (enemyDistance < 400 && enemyDistance > 0) {
                enemy.walkRight = false;
            }
            else if (enemyDistance < 0 && enemyDistance > - 400) {
                enemy.walkRight = true;
            }
        })
    }


    /**
     * Checks the character's position relative to the end boss and updates their behavior.
     */
    checkEndBossDistance() {
        this.isPlayerLeftOfBoss();
        this.isPlayerRightOfBoss();
    }

    isPlayerLeftOfBoss() {
        let playerLeftOfEnemy = this.character.x + 200 < this.endBoss.x;
        if (playerLeftOfEnemy && this.endBoss.bossOnTheRight) {
            this.endBoss.offset = {
                top: 120,
                left: 270,
                right: 50,
                bottom: 0
            };
            this.endBoss.x = this.endBoss.x - 200
            this.endBoss.bossOnTheRight = false;
            this.endBoss.otherDirection = false;
            this.cameraPositionLeft();
        }
    }

    isPlayerRightOfBoss() {
        let playerRightOfEnemy = this.character.x + 200 > this.endBoss.x + this.endBoss.width;
        if (playerRightOfEnemy && !this.endBoss.bossOnTheRight) {
            this.endBoss.offset = {
                top: 120,
                left: 50,
                right: 270,
                bottom: 0
            };
            this.endBoss.x = this.endBoss.x + 200
            this.endBoss.bossOnTheRight = true;
            this.endBoss.otherDirection = true;
            this.cameraPositionRight();
        }
    }


    /**
     * Moves the camera position to the right.
     */
    cameraPositionRight() {
        let moveRight = setInterval(() => {
            if (this.moveCamera < 250) {
                this.moveCamera += 0.8;
            } else {
                clearInterval(moveRight);
            }
        }, 20)
    }


    /**
     * Moves the camera position to the left.
     */
    cameraPositionLeft() {
        let moveLeft = setInterval(() => {
            if (this.moveCamera > 0) {
                this.moveCamera -= 0.8;
            } else {
                clearInterval(moveLeft);
            }
        }, 20)
    }


    /**
     * Draws all objects in the game world and handles rendering logic.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x + this.moveCamera, 0);
        this.resetShadow();
        this.addObjectsToMap(this.level.backgroundObjects);
        this.enableShadow();
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x - this.moveCamera, 0);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.ammoStatusBar);
        this.ctx.translate(this.camera_x + this.moveCamera, 0);
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
        this.ctx.translate(-this.camera_x - this.moveCamera, 0);

        this.ctx.font = '40px pirates, Arial, Helvetica, sans-serif';
        this.ctx.fillStyle = '#51bbe8';
        this.ctx.fillText(`${this.coinStatusBar.itemCount}`, 100, 100);
        this.ctx.fillText(`${this.ammoStatusBar.itemCount}`, 100, 155);

        this.endBossStatus();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Enables shadow effects for the rendering context.
     */
    enableShadow() {
        this.ctx.shadowColor = '#000000';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 5;
        this.ctx.shadowOffsetY = 5;
    }


    /**
     * Resets shadow effects in the rendering context.
     */
    resetShadow() {
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
    }


    /**
     * Displays the energy level of the end boss.
     */
    endBossStatus() {
        let endBossEnergy = this.endBoss.enemyEnergy
        if (endBossEnergy) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillText(`${endBossEnergy}o`, 600, 90);
        }
    }


    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - The objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * Adds a single movable object to the map.
     * @param {Object} mo - The object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        // mo.drawHitbox(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips an object's image horizontally.
     * @param {Object} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores the object's position after flipping its image.
     * @param {Object} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}