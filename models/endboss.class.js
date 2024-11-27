class Endboss extends MovableObject {
    height = 330;
    width = 430;
    y = 70;

    offset = {
        top: 100,
        left: 250,
        right: 50,
        bottom: 0
    }

    IMAGES_WALKING = [
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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();

        this.x = 2200;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


}