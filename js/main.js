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
	Talkers.init();
	
	Stats.fetch();
	
    var cont = new ScreenControls();
    cont.keyDown = function(e) {
        var keyCode = e.keyCode;

        if(keyCode == 32) {
			AudioManager.playSFX('res/sfx/Click.ogg');
            ScreenHandler.open(new ScreenBrief());
        }
    };
	ScreenHandler.open(cont);
	ScreenHandler.open(new ScreenGame(new GameModeTutorial()));
	
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