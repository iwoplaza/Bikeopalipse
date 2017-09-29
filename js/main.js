var canvas, ctx;

function main() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    ScreenHandler.open(new ScreenGame());
    tick();
}

function tick() {
    update();
    draw();
    
    requestAnimationFrame(tick);
}

function update() {
    Time.update();
    ScreenHandler.update();
}

function draw() {
    ScreenHandler.draw();
}

document.addEventListener("keydown", function(e) {
    ScreenHandler.keyDown(e);
});

document.addEventListener("keyup", function(e) {
    ScreenHandler.keyUp(e);
});

main();