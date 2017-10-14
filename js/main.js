var canvas, ctx;
var gl;

function main() {
    canvas = document.getElementById('canvas');
    //ctx = canvas.getContext('2d');
	//ctx.imageSmoothingEnabled = false;
	
	try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) { }
	
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
		return;
    }
	
	ctx = new Context();
	initGL();
    Resources.loadAll(onResourcesLoaded);
}

function initGL() {
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.ALWAYS);
	gl.enable(gl.BLEND);
    gl.bindTexture(gl.TEXTURE_2D, null);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clearColor(0, 0, 0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	ctx.ortho(0, canvas.width, canvas.height, 0, 0, 100);
}

function onResourcesLoaded() {
	Shaders.use('default');
	
	Fonts.init();
	LineRenderer.init();
	Obstacle.init();
	Coins.init();
	Powerups.init();
	Characters.init();
	Explosions.init();
	Zombies.init();
	MiddleGroundVariants.init();
	StructureVariants.init();
	MapNodes.init();
	HUD.init();
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
	ScreenHandler.open(new ScreenLobby());
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