class AmmoStatusBar extends StatusBar {
    // IMAGES = [
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0 
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' // 5
    // ];

    constructor() {
        super();
        this.loadImage('img/8_item/ammo/bullet0.png');
        this.x = 40;
        this.y = 80;
        this.width = 50;
        this.height = 110;
        // this.setPercentage(100);
    }


    pickupItem() {
        this.itemCount += 1;
    }

}