class Bat extends EnemyObject {
    height = 50;
    width = 50;
    y = 240;
    drop = false;
    enemyEnergy = 30;
    runCounter = Math.round(Math.random() * 100);
    run = false;

    offset = {
        top: 7,
        left: 7,
        right: 7,
        bottom: 7
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

    animate() {
        setInterval(() => {
            this.moveLeft();

        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_BLUE_FLY);
            if (this.enemyEnergy == 0) {
                this.enemyDie();
            } else if (this.isHurt()) {
                this.enemyHurt();
            } else if (this.runCounter > 100) {
                this.enemyRun();
            }
            this.runCounter++

        }, 100);

    }

    enemyDie() {
        this.playAnimation(this.IMAGES_BLUE_HIT);
        this.speed = 0;
        this.y += 10
        if (!this.drop) {
            this.dropRandomItem()
            this.drop = true;
        }
    }

    enemyHurt() {
        this.playAnimation(this.IMAGES_PURPLE_HIT);
        this.runCounter = 97;
    }


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


    dropRandomItem() {
        let dropChance = Math.random(); // Zufallswert zwischen 0 und 1
        let item;
        let dropArray;

        if (dropChance < 0.1) { // 10% Chance, eine Münze zu droppen
            item = new Coin();
            dropArray = world.coins;
        } else if (dropChance < 0.15) { // 5% Chance, ein Health-Item zu droppen
            item = new Health();
            dropArray = world.health;
        } else if (dropChance < 0.45) { // 30% Chance, Munition zu droppen
            item = new Ammo();
            dropArray = world.ammo;
        } else {
            dropArray = null; // Kein Drop
            console.log('Noo Drop');
        }

        if (dropArray) {
            item.x = this.x;
            item.y = this.y;
            dropArray.push(item);
            console.log('Item Dropped:', item);

        }

    }


}