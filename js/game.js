let canvas;
let world;
let keyboard = new Keyboard();
let winGame = false;
let currentIndex = 0;
let isMuted = true;
let sounds = [];

const characterJumpSound = new Audio('audio/jump.mp3');
const characterWalkSound = new Audio('audio/walk.mp3');
const characterLandingSound = new Audio('audio/landing.mp3');
const characterShootSound = new Audio('audio/shot.mp3');
const characterSwordSound = new Audio('audio/sword.mp3');
const characterTriggerSound = new Audio('audio/trigger.mp3');
const characterLoadedSound = new Audio('audio/load-ammo.mp3');
const characterCoinsSound = new Audio('audio/coins.mp3');
const characterHurtSound = new Audio('audio/pirate-hurt.mp3');
const endbossSound = new Audio('audio/monster-sound.mp3');
const endbossHurtSound = new Audio('audio/endboss-hurt.mp3');
const endbossSummonSound = new Audio('audio/boss-summon.mp3');
const endbossSwordHitSound = new Audio('audio/endboss-sword.mp3');
const skeletonHurtSound = new Audio('audio/skeleton-dead.mp3');
const backgroundMusic = new Audio('audio/pirates-music.mp3');
const winGameSound = new Audio('audio/win-game.mp3');
const gameOverSound = new Audio('audio/game-over.mp3');
backgroundMusic.loop = true;


sounds.push(
    characterJumpSound,
    characterWalkSound,
    characterLandingSound,
    characterShootSound,
    characterSwordSound,
    characterTriggerSound,
    characterLoadedSound,
    characterCoinsSound,
    characterHurtSound,
    endbossSound,
    endbossHurtSound,
    endbossSummonSound,
    endbossSwordHitSound,
    skeletonHurtSound,
    backgroundMusic,
    winGameSound,
    gameOverSound
)


/**
 * Toggles the mute state of all sounds and updates the mute button UI.
 */
function toggleMute() {
    isMuted = !isMuted;
    updateMuteStatus();
    updateMuteBtn();
}


/**
 * Updates the mute status for all sound elements.
 */
function updateMuteStatus() {
    sounds.forEach((sound) => {
        sound.muted = isMuted; // Den Mute-Status aller Sounds aktualisieren
    });
}


/**
 * Updates the sound icon to reflect the current mute status.
 */
function updateMuteBtn() {
    let soundIcon = document.getElementById('sound-icon');
    soundIcon.src = isMuted ? 'img/mute-icon.png' : 'img/sound-icon.png';
}


const characterImages = [
    'img/1_character/idle/pirate_idle0.png',
    'img/1_character/idle/pirate_idle1.png',
    'img/1_character/idle/pirate_idle2.png',
    'img/1_character/idle/pirate_idle3.png',
    'img/1_character/idle/pirate_idle4.png',

    'img/1_character/walk/pirate_run1.png',
    'img/1_character/walk/pirate_run2.png',
    'img/1_character/walk/pirate_run3.png',
    'img/1_character/walk/pirate_run4.png',
    'img/1_character/walk/pirate_run5.png',
    'img/1_character/walk/pirate_run6.png',

    'img/1_character/jump/pirate_jump1.png',
    'img/1_character/jump/pirate_jump2.png',

    'img/1_character/fall/pirate_fall1.png',
    'img/1_character/fall/pirate_fall2.png',

    'img/1_character/landing/pirate_landing1.png',
    'img/1_character/landing/pirate_landing2.png',

    'img/1_character/gun-out/pirate_gun_out0.png',
    'img/1_character/gun-out/pirate_gun_out1.png',
    'img/1_character/gun-out/pirate_gun_out2.png',
    'img/1_character/gun-out/pirate_gun_out3.png',
    'img/1_character/gun-out/pirate_gun_out4.png',
    'img/1_character/gun-out/pirate_gun_out5.png',

    'img/1_character/gun-shoot-with-fire/tile000.png',
    'img/1_character/gun-shoot-with-fire/tile001.png',
    'img/1_character/gun-shoot-with-fire/tile002.png',
    'img/1_character/gun-shoot-with-fire/tile003.png',
    'img/1_character/gun-shoot-with-fire/tile004.png',

    'img/1_character/gun-shoot-with-fire/tile000.png',
    'img/1_character/gun-shoot-with-fire/tile001.png',
    'img/1_character/gun-shoot-with-fire/tile002.png',
    'img/1_character/gun-shoot-with-fire/tile003.png',
    'img/1_character/gun-shoot-with-fire/tile004.png',

    'img/1_character/sword-attack1/pirate_attack1_0.png',
    'img/1_character/sword-attack1/pirate_attack1_1.png',
    'img/1_character/sword-attack1/pirate_attack1_2.png',
    'img/1_character/sword-attack1/pirate_attack1_3.png',
    'img/1_character/sword-attack1/pirate_attack1_4.png',
    'img/1_character/sword-attack1/pirate_attack1_5.png',

    'img/1_character/sword-attack2/pirate_attack2_0.png',
    'img/1_character/sword-attack2/pirate_attack2_1.png',
    'img/1_character/sword-attack2/pirate_attack2_2.png',
    'img/1_character/sword-attack2/pirate_attack2_3.png',
    'img/1_character/sword-attack2/pirate_attack2_4.png',
    'img/1_character/sword-attack2/pirate_attack2_5.png',

    'img/1_character/sword-attack3/pirate_attack3_0.png',
    'img/1_character/sword-attack3/pirate_attack3_1.png',
    'img/1_character/sword-attack3/pirate_attack3_2.png',
    'img/1_character/sword-attack3/pirate_attack3_3.png',
    'img/1_character/sword-attack3/pirate_attack3_4.png',
    'img/1_character/sword-attack3/pirate_attack3_5.png',
];


const slideshow = document.getElementById('character-images');


/**
 * Updates the displayed image in the character slideshow.
 * Cycles through the character images at regular intervals.
 */
function showNextImage() {
    slideshow.src = characterImages[currentIndex];
    currentIndex = (currentIndex + 1) % characterImages.length; // Index inkrementieren und zurücksetzen, wenn Ende erreicht
}

setInterval(showNextImage, 80);


/**
 * Initializes the game, setting up the canvas and world.
 * Logs the initialized character object to the console.
 */
// function init() {
//     initLevel();
//     canvas = document.getElementById('canvas');
//     world = new World(canvas, keyboard);
//     console.log('My character is', world);
// }


/**
 * Toggles the visibility of the controls information container.
 * Also toggles other UI elements such as the start screen title and buttons.
 */
function toggleControlsInfo() {
    let controleContainer = document.getElementById('controls-info-container');
    controleContainer.classList.toggle('show-hide-box');
    let characterShowContainer = document.getElementById('character-images-container');
    characterShowContainer.classList.toggle('change-character-position')
    let startScreenTitle = document.getElementById('startscreen-title');
    startScreenTitle.classList.toggle('d-none');
    let startScreenBtn = document.getElementById('start-game-btn');
    startScreenBtn.classList.toggle('d-none');

    let impressumBtn = document.getElementById('impressum-btn');
    impressumBtn.classList.toggle('d-none');
}


/**
 * Toggles the visibility of the "Impressum" information container.
 * Adjusts related UI elements accordingly.
 */
function toggleImpressumInfo() {
    let impressumContainer = document.getElementById('impressum-info-container');
    impressumContainer.classList.toggle('show-hide-box')
    let startScreenTitle = document.getElementById('startscreen-title');
    startScreenTitle.classList.toggle('d-none');
    let startScreenBtn = document.getElementById('start-game-btn');
    startScreenBtn.classList.toggle('d-none');

    let cnontrolInfoBtn = document.getElementById('controls-info-btn');
    cnontrolInfoBtn.classList.toggle('d-none');
}


/**
 * Starts the game by initializing the world and hiding the start screen.
 */
function startGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    let startScreen = document.getElementById('startscreen');
    startScreen.classList.add('d-none');
    backgroundMusic.play();
}


/**
 * Restarts the game by resetting the world and hiding the end screen.
 */
function restartGame() {
    let endscreen = document.getElementById('endscreen');
    endscreen.classList.remove('d-flex');
    initLevel();
    world = new World(canvas, keyboard);
    winGame = false;
    backgroundMusic.play();
}


/**
 * Stops the game and shows the end screen with appropriate messages and animations.
 * Pauses the background music and clears all intervals.
 */
function stopGame() {
    let endscreenTitle = document.getElementById('endscreen-title');
    let endscreen = document.getElementById('endscreen');
    setTimeout(() => {
        if (winGame) {
            endscreenTitle.innerHTML = 'YOU WIN';
            endscreen.style.backgroundImage = "url('img/sunset.gif')";
            winGameSound.play();
        } else {
            endscreenTitle.innerHTML = 'YOU LOSE';
            endscreen.style.backgroundImage = "url('img/giphy (6).gif')";
            gameOverSound.play();
        }
        endscreen.classList.toggle('d-flex');
        clearAllIntervals();
        backgroundMusic.pause();
    }, 1200);
}


/**
 * Clears all active intervals in the application.
 * Prevents unnecessary animations or logic loops from continuing.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * Reloads the page, taking the user back to the start screen.
 */
function goStartScreen() {
    location.reload();
}


/**
 * Toggles fullscreen mode for the canvas element.
 * Adjusts related UI elements accordingly.
 */
function fullscreen() {
    let canvas = document.getElementById('canvas');
    let gameTitle = document.getElementById('game-title');
    canvas.classList.toggle('fullscreen');
    gameTitle.classList.toggle('d-none');
}


/**
 * Handles `keydown` events to update the state of the `keyboard` object.
 * Listens for specific keys (e.g., arrow keys, space, D, F).
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 70) {
        keyboard.F = true;
    }
});


/**
 * Handles `keyup` events to update the state of the `keyboard` object.
 * Resets keys to their default state when released.
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 70) {
        keyboard.F = false;
    }
});

