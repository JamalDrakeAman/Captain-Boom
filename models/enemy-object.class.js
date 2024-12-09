class EnemyObject extends MovableObject {
    height = 150;
    width = 150;
    y = 240;
    IMAGES_WALKING = [
        'img/3_enemies/skeleton/walk/skeleton-walk1.png',
        'img/3_enemies/skeleton/walk/skeleton-walk2.png',
        'img/3_enemies/skeleton/walk/skeleton-walk3.png',
        'img/3_enemies/skeleton/walk/skeleton-walk4.png',
        'img/3_enemies/skeleton/walk/skeleton-walk5.png',
        'img/3_enemies/skeleton/walk/skeleton-walk6.png',
        'img/3_enemies/skeleton/walk/skeleton-walk7.png',
        'img/3_enemies/skeleton/walk/skeleton-walk8.png',
    ];

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = true;
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.otherDirection = true;
        }, 200);
    }

    
}