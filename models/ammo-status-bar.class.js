class AmmoStatusBar extends StatusBar {

    itemCount = 10;

    constructor() {
        super();
        this.loadImage('img/8_item/ammo/bullet0.png');
        this.x = 40;
        this.y = 89;
        this.width = 45;
        this.height = 110;
    }


    pickupItem() {
        this.itemCount += 1;
    }

}