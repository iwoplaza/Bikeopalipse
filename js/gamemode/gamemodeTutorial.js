function GameModeTutorial() {
    GameMode.call(this);
}
GameModeTutorial.prototype = Object.create(GameMode.prototype);

GameModeTutorial.prototype.start = function() {
	GameMode.prototype.start.call(this);
};
GameModeTutorial.prototype.update = function() {
	GameMode.prototype.update.call(this);
	
	World.update();
};
GameModeTutorial.prototype.draw = function() {
	GameMode.prototype.draw.call(this);
	
	ctx.save();
		ctx.translate(0, -HUD.barHeight*Camera.scale);
		World.draw();
	ctx.restore();
	
	HUD.draw();
};
GameModeTutorial.prototype.getCharacterClass = function() {
	return CharacterVance;
};