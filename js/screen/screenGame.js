function ScreenGame(_gamemode) {
	GameModes.start(_gamemode);
}

ScreenGame.prototype.init = function() {
	GameModes.current.start();
}

ScreenGame.prototype.update = function() {
	GameModes.current.update();
}

ScreenGame.prototype.draw = function() {
    gl.clearColor(0.171875, 0.171875, 0.171875, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	ctx.resetToWorldMatrix();
	
	GameModes.current.draw();
}

ScreenGame.prototype.keyDown = function(e) {
	GameModes.current.keyDown(e);
}

ScreenGame.prototype.keyUp = function(e) {
    GameModes.current.keyUp(e);
}