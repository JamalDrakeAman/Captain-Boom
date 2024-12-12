let canvas;
let world;
let keyboard = new Keyboard();


let sound = false;
let game_music_sound = new Audio('audio/pirates-music.mp3');


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
    let ControleContainer = document.getElementById('controls-info-container');
    ControleContainer.classList.toggle('show-hide-box')
}


function startGame() {
    let startScreen = document.getElementById('startscreen');
    startScreen.classList.add('d-none');
}

/////////////////////

function fullscreen() {
    let canvas = document.getElementById('canvas');
    let gameTitle = document.getElementById('game-title');
    canvas.classList.toggle('fullscreen');
    gameTitle.classList.toggle('d-none');
}

////////////////////

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

