/**
 * Represents a Bat enemy in the game. 
 * The Bat class extends EnemyObject and handles the animation, movement, and behavior of a flying enemy.
 */
class Bat extends EnemyObject {
    height = 50;
    width = 50;
    y = 240;
    drop = false;
    enemyEnergy = 30;
    runCounter = Math.round(Math.random() * 100);
    run = false;

    dropChance = Math.random();
    item;
    dropArray;

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    }

    IMAGES_BLUE_FLY = [
        'img/3_enemies/bat/blue-bat-fly/blue-bat-fly0.png',
        'img/3_enemies/bat/blue-bat-fly/blue-bat-fly1.png',
        'img/3_enemies/bat/blue-bat-fly/blue-bat-fly2.png',
        'img/3_enemies/bat/blue-bat-fly/blue-bat-fly3.png',
        'img/3_enemies/bat/blue-bat-fly/blue-bat-fly4.png',
        'img/3_enemies/bat/blue-bat-fly/blue-bat-fly5.png'
    ];

    IMAGES_BLUE_HIT = [
        'img/3_enemies/bat/blue-bat-hit/blue-bat-hit.png'
    ];

    IMAGES_PURPLE_FLY = [
        'img/3_enemies/bat/purple-bat-fly/purple-bat-fly0.png',
        'img/3_enemies/bat/purple-bat-fly/purple-bat-fly1.png',
        'img/3_enemies/bat/purple-bat-fly/purple-bat-fly2.png',
        'img/3_enemies/bat/purple-bat-fly/purple-bat-fly3.png',
        'img/3_enemies/bat/purple-bat-fly/purple-bat-fly4.png',
        'img/3_enemies/bat/purple-bat-fly/purple-bat-fly5.png',
    ];

    IMAGES_PURPLE_HIT = [
        'img/3_enemies/bat/purple-bat-hit/purple-bat-hit.png'
    ];


    /**
     * Initializes a new instance of the Bat class.
     * Sets random position, speed, and loads all animations.
     */
    constructor() {
        super().loadImage('img/3_enemies/bat/blue-bat-fly/blue-bat-fly0.png');
        this.loadImages(this.IMAGES_BLUE_FLY);
        this.loadImages(this.IMAGES_BLUE_HIT);
        this.loadImages(this.IMAGES_PURPLE_FLY);
        this.loadImages(this.IMAGES_PURPLE_HIT);
        this.x = 500 + Math.random() * 4200;
        this.y = 50 + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.5;
        this.applyGravity();
        this.animate();
    }


    /**
     * Starts the animation and movement loops for the Bat.
     * Handles movement, state changes, and animations based on energy and behavior.
     */
    animate() {
        setInterval(() => this.moveBat(), 1000 / 60);

        setInterval(() => this.playBat(), 100);

    }


    /**
     * Handles the movement of the bat based on its direction.
     */
    moveBat() {
        if (this.otherDirection) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }


    /**
     * Controls the bat's animations and states, including hurt, death, and run behavior.
     */
    playBat() {
        this.playAnimation(this.IMAGES_BLUE_FLY);
        if (this.enemyEnergy == 0) {
            this.enemyDie();
        } else if (this.isHurt()) {
            this.enemyHurt();
        } else if (this.runCounter > 100) {
            this.enemyRun();
        }
        this.runCounter++
    }


    /**
     * Handles the death behavior of the Bat.
     * Plays the hit animation, stops movement, and drops an item if not already dropped.
     */
    enemyDie() {
        this.playAnimation(this.IMAGES_BLUE_HIT);
        this.speed = 0;
        this.y += 10
        if (!this.drop) {
            this.dropRandomItem()
            this.drop = true;
        }
    }


    /**
     * Handles the hurt behavior of the Bat.
     * Plays the hit animation for the purple bat and resets the run counter.
     */
    enemyHurt() {
        this.playAnimation(this.IMAGES_PURPLE_HIT);
        this.runCounter = 97;
    }


    /**
     * Makes the Bat enter a "running" state, temporarily increasing its speed.
     * Handles the running animation and resets the state after a short time.
     */
    enemyRun() {
        this.playAnimation(this.IMAGES_PURPLE_FLY);
        if (!this.run) {
            this.speed = this.speed * 8;
            this.run = true;
        } else if (this.runCounter > 110) {
            this.runCounter = Math.round(Math.random() * 100);
            this.speed = this.speed / 8;
            this.run = false;
        }
    }


    /**
     * Drops a random item with specific probabilities:
     * - 10% chance to drop a coin.
     * - 5% chance to drop a health item.
     * - 30% chance to drop ammo.
     * - No drop for the remaining cases.
     */
    dropRandomItem() {
        if (this.dropChance < 0.1) {
            this.dropCoin();
        } else if (this.dropChance < 0.15) {
            this.dropHealth();
        } else if (this.dropChance < 0.45) {
            this.dropAmmo();
        } else {
            this.dropArray = null;
        }
        this.addItemToDropArray();
    }


    /**
     * Drops a coin item and assigns it to the corresponding array.
     */
    dropCoin() {
        this.item = new Coin();
        this.dropArray = world.coins;
    }


    /**
     * Drops a health item and assigns it to the corresponding array.
     */
    dropHealth() {
        this.item = new Health();
        this.dropArray = world.health;
    }


    /**
     * Drops an ammo item and assigns it to the corresponding array.
     */
    dropAmmo() {
        this.item = new Ammo();
        this.dropArray = world.ammo;
    }


    /**
     * Adds the dropped item to the designated drop array.
     * Sets the item's position based on the Bat's current position.
     */
    addItemToDropArray() {
        if (this.dropArray) {
            this.item.x = this.x;
            this.item.y = this.y;
            this.dropArray.push(this.item);
        }
    }


}