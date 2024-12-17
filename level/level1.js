let level1;

function initLevel() {

    level1 = new Level(
        [
            // new Skeleton(),
            // new Skeleton(),
            // new Skeleton(),
            // new Bat(),
            // new Bat(),
            // new Bat(),
            // new Bat(),
            // new Skeleton(),
            // new Skeleton2(),
            // new Skeleton2(),
            // new Skeleton2(),
            new Endboss()
        ],
        [
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/sky.png', -719),
            new BackgroundObject('img/5_background/layers/sun.png', -719),
            new BackgroundObject('img/5_background/layers/sea.png', -719),
            new BackgroundObject('img/5_background/layers/cloud.png', -719),
            new BackgroundObject('img/5_background/layers/decor.png', -719),
            new BackgroundObject('img/5_background/layers/land.png', -719),

            new BackgroundObject('img/5_background/layers/sky.png', 0),
            new BackgroundObject('img/5_background/layers/sun.png', 0),
            new BackgroundObject('img/5_background/layers/sea.png', 0),
            new BackgroundObject('img/5_background/layers/cloud.png', 0),
            new BackgroundObject('img/5_background/layers/decor.png', 0),
            new BackgroundObject('img/5_background/layers/land.png', 0),

            new BackgroundObject('img/5_background/layers/sky.png', 719),
            new BackgroundObject('img/5_background/layers/sun.png', 719),
            new BackgroundObject('img/5_background/layers/sea.png', 719),
            new BackgroundObject('img/5_background/layers/cloud.png', 719),
            new BackgroundObject('img/5_background/layers/decor.png', 719),
            new BackgroundObject('img/5_background/layers/land.png', 719),

            new BackgroundObject('img/5_background/layers/sky.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/sun.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/sea.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/cloud.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/decor.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/land.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/sky.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/sun.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/sea.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/cloud.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/decor.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/land.png', 719 * 3),
        ]
    );

}