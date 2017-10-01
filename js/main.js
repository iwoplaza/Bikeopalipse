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
	Coins.init();
	Powerups.init();
	Characters.init();
	Explosions.init();
	Zombies.init();
	
	Stats.fetch();
	
<<<<<<< HEAD
	ScreenHandler.open(new ScreenGame());
=======
	ScreenHandler.open(new ScreenControls());
>>>>>>> 48f3384cb78d807f87f48713d5a9177b7d679995
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