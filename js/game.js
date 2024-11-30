let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is', world);
}


function startGame() {
    let startScreen = document.getElementById('startscreen');
    startScreen.classList.add('d-none')
}

/////////////////////

function fullscreen() {
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // canvas.requestFullscreen();

    let canvas = document.getElementById('canvas');
    canvas.classList.toggle('fullscreen')
}



// function fullscreen() {
//     let fullscreen = document.getElementById('fullscreen');
//     enterFullscreen(fullscreen);
// }

// function enterFullscreen(element) {
//     if (element.requestFullscreen) {
//         element.requestFullscreen();
//     } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
//         element.msRequestFullscreen();
//     } else if (element.webkitRequestFullscreen) {  // iOS Safari
//         element.webkitRequestFullscreen();
//     }
// }

// function exitFullscreen() {
//     if (document.exitFullscreen) {
//         document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//     }
// }

///////////////////////////

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

