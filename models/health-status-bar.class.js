/**
 * Represents a health status bar that visually displays the health percentage of a character.
 * Inherits from `StatusBar`.
 */
class HealthStatusBar extends StatusBar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' 
    ];


    /**
     * Constructs a new `HealthStatusBar` instance with predefined images and position.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
     * Increases the health percentage by 20% when an item is picked up,
     * capping the percentage at 100%.
     * 
     * @returns {number} The updated health percentage.
     */
    pickupItem() {
        if (this.percentage < 100) {
            this.percentage + 20;
        } else {
            this.percentage = 100
        }
        return this.percentage;
    }

}