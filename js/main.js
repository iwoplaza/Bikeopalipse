var canvas, ctx;

function main() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	
    Resources.loadAll(onResourcesLoaded);
}

function onResourcesLoaded() {
	Fonts.init();
	Obstacle.init();
	ScreenHandler.open(new ScreenTitle());
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