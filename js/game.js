let canvas;
let world;
let keyboard = new Keyboard();
let game_music_sound = new Audio('audio/pirates-music.mp3');
let winGame = false;
let currentIndex = 0;
let sound = false;

let shoot = 'ready';

const characterImages = [
    // IDLE
    'img/1_character/idle/pirate_idle0.png',
    'img/1_character/idle/pirate_idle1.png',
    'img/1_character/idle/pirate_idle2.png',
    'img/1_character/idle/pirate_idle3.png',
    'img/1_character/idle/pirate_idle4.png',
    // WALK
    'img/1_character/walk/pirate_run1.png',
    'img/1_character/walk/pirate_run2.png',
    'img/1_character/walk/pirate_run3.png',
    'img/1_character/walk/pirate_run4.png',
    'img/1_character/walk/pirate_run5.png',
    'img/1_character/walk/pirate_run6.png',
    // JUMP
    'img/1_character/jump/pirate_jump1.png',
    'img/1_character/jump/pirate_jump2.png',
    // FALL
    'img/1_character/fall/pirate_fall1.png',
    'img/1_character/fall/pirate_fall2.png',
    //LANDING
    'img/1_character/landing/pirate_landing1.png',
    'img/1_character/landing/pirate_landing2.png',
    // GUN OUT
    'img/1_character/gun-out/pirate_gun_out0.png',
    'img/1_character/gun-out/pirate_gun_out1.png',
    'img/1_character/gun-out/pirate_gun_out2.png',
    'img/1_character/gun-out/pirate_gun_out3.png',
    'img/1_character/gun-out/pirate_gun_out4.png',
    'img/1_character/gun-out/pirate_gun_out5.png',
    //SHOOT
    'img/1_character/gun-shoot-with-fire/tile000.png',
    'img/1_character/gun-shoot-with-fire/tile001.png',
    'img/1_character/gun-shoot-with-fire/tile002.png',
    'img/1_character/gun-shoot-with-fire/tile003.png',
    'img/1_character/gun-shoot-with-fire/tile004.png',
    //SHOOT
    'img/1_character/gun-shoot-with-fire/tile000.png',
    'img/1_character/gun-shoot-with-fire/tile001.png',
    'img/1_character/gun-shoot-with-fire/tile002.png',
    'img/1_character/gun-shoot-with-fire/tile003.png',
    'img/1_character/gun-shoot-with-fire/tile004.png',
    // ATTACK
    'img/1_character/sword-attack1/pirate_attack1_0.png',
    'img/1_character/sword-attack1/pirate_attack1_1.png',
    'img/1_character/sword-attack1/pirate_attack1_2.png',
    'img/1_character/sword-attack1/pirate_attack1_3.png',
    'img/1_character/sword-attack1/pirate_attack1_4.png',
    'img/1_character/sword-attack1/pirate_attack1_5.png',
    // ATTACK 2
    'img/1_character/sword-attack2/pirate_attack2_0.png',
    'img/1_character/sword-attack2/pirate_attack2_1.png',
    'img/1_character/sword-attack2/pirate_attack2_2.png',
    'img/1_character/sword-attack2/pirate_attack2_3.png',
    'img/1_character/sword-attack2/pirate_attack2_4.png',
    'img/1_character/sword-attack2/pirate_attack2_5.png',
    // ATTACK 3
    'img/1_character/sword-attack3/pirate_attack3_0.png',
    'img/1_character/sword-attack3/pirate_attack3_1.png',
    'img/1_character/sword-attack3/pirate_attack3_2.png',
    'img/1_character/sword-attack3/pirate_attack3_3.png',
    'img/1_character/sword-attack3/pirate_attack3_4.png',
    'img/1_character/sword-attack3/pirate_attack3_5.png',
];


const slideshow = document.getElementById('character-images');

function showNextImage() {
    slideshow.src = characterImages[currentIndex];
    currentIndex = (currentIndex + 1) % characterImages.length; // Index inkrementieren und zurücksetzen, wenn Ende erreicht
}

setInterval(showNextImage, 80);


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is', world);
}


function toggleSound() {
    let soundIcon = document.getElementById('sound-icon');
    sound = !sound;
    if (sound) {
        soundIcon.src = 'img/sound-icon.png';
        game_music_sound.play();
        setInterval(() => {
            game_music_sound.play();
        }, 67000);
    } else {
        soundIcon.src = 'img/mute-icon.png';
        game_music_sound.pause();
    }
}


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


function startGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    let startScreen = document.getElementById('startscreen');
    startScreen.classList.add('d-none');
}


function restartGame() {
    let endscreen = document.getElementById('endscreen');
    endscreen.classList.remove('d-flex');
    initLevel();
    world = new World(canvas, keyboard);
    winGame = false;
    console.log('Restart');
}


function stopGame() {
    let endscreenTitle = document.getElementById('endscreen-title');
    let endscreen = document.getElementById('endscreen');
    setTimeout(() => {
        if (winGame) {
            endscreenTitle.innerHTML = 'YOU WIN'
            endscreen.style.backgroundImage = "url('img/sunset.gif')"
        } else {
            endscreenTitle.innerHTML = 'YOU LOSE'
            endscreen.style.backgroundImage = "url('img/giphy (6).gif')"
        }
        endscreen.classList.toggle('d-flex');
        clearAllIntervals();
        game_music_sound.pause();
    }, 1200);
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


function goStartScreen() {
    location.reload();
}


function fullscreen() {
    let canvas = document.getElementById('canvas');
    let gameTitle = document.getElementById('game-title');
    canvas.classList.toggle('fullscreen');
    gameTitle.classList.toggle('d-none');
}


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

