/**
 * Represents a game level, containing enemies, clouds, and background objects.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 4250;


    /**
     * Constructs a new `Level` instance with specified enemies, clouds, and background objects.
     * 
     * @param {EnemyObject[]} enemies - The enemies to include in the level.
     * @param {Cloud[]} clouds - The clouds to include in the level.
     * @param {BackgroundObject[]} backgroundObjects - The background objects to include in the level.
     */
    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}