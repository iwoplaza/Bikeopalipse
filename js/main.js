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
    var cont = new ScreenControls();
    cont.keyDown = function(e) {
        var keyCode = e.keyCode;

        if(keyCode == 32) {
            ScreenHandler.open(new ScreenIntro());
        }
    };
	ScreenHandler.open(cont);
>>>>>>> e8d64c81829bec74d37ac1ae0bc0230a7f91bea0
	
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