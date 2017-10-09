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
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	GameModes.current.draw();
}

ScreenGame.prototype.keyDown = function(e) {
	GameModes.current.keyDown(e);
}

ScreenGame.prototype.keyUp = function(e) {
    GameModes.current.keyUp(e);
}