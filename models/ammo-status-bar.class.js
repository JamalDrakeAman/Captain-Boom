/**
 * Represents the ammo status bar displayed in the game.
 * Inherits from the StatusBar class and tracks the player's ammo count.
 */
class AmmoStatusBar extends StatusBar {

    itemCount = 10;


    /**
     * Initializes a new instance of the AmmoStatusBar class.
     * Loads the ammo status bar image and sets its initial position and dimensions.
     */
    constructor() {
        super();
        this.loadImage('img/8_item/ammo/bullet0.png');
        this.x = 40;
        this.y = 89;
        this.width = 45;
        this.height = 110;
    }


     /**
     * Increases the ammo count by one.
     * This method is called when the player collects an ammo item.
     */
    pickupItem() {
        this.itemCount += 1;
    }

}