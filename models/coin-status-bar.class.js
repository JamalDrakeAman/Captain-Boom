/**
 * Represents the status bar for coins collected by the player.
 * Extends the `StatusBar` class.
 */
class CoinStatusBar extends StatusBar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];


    /**
     * Constructs a new `CoinStatusBar` instance.
     * Sets the position, dimensions, and initial image of the coin status bar.
     */
    constructor() {
        super();
        this.loadImage('img/8_item/coin/coin0.png');
        this.x = 40;
        this.y = 65;
        this.width = 45;
        this.height = 45;
    }


    /**
     * Increases the coin count in the status bar when a coin is picked up.
     * Updates the item count by incrementing it by 1.
     */
    pickupItem() {
        this.itemCount += 1;
    }
}