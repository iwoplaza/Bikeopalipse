function GameModeTutorial() {
    GameMode.call(this);
}
GameModeTutorial.prototype = Object.create(GameMode.prototype);

GameModeTutorial.prototype.start = function() {
	AudioManager.playMusic('res/sfx/Apoca.ogg', 0.3);
	
	Player.player = new (this.getCharacterClass());
	World.init();
	Powerups.reset();
	this.gameOver = false;
	this.score = 0;
	this.distance = 0;
	
	this.convUI = new ConvUI();
	this.convUI.start(new Conversation().
		addNode(new ConvNode(Talkers.registry.vance, "...", 4)).
		addNode(new ConvNode(Talkers.registry.miro, "bzzt", 0)).
		addNode(new ConvNode(Talkers.registry.vance, "what?", 0)).
		addNode(new ConvNode(Talkers.registry.vance, "hello?!", 1))
	);
};
GameModeTutorial.prototype.update = function() {
	GameMode.prototype.update.call(this);
	
	World.update();
	
	HUD.update();
	this.convUI.update();
};
GameModeTutorial.prototype.draw = function() {
	GameMode.prototype.draw.call(this);
	
	ctx.save();
		ctx.translate(0, -HUD.barHeight*Camera.scale);
		World.draw();
	ctx.restore();
	
	HUD.draw();
    this.convUI.draw();
};
GameModeTutorial.prototype.keyDown = function(e) {
	GameMode.prototype.keyDown.call(this, e);
	this.convUI.keyDown(e);
};
GameModeTutorial.prototype.keyUp = function(e) {
    GameMode.prototype.keyUp.call(this, e);
};
GameModeTutorial.prototype.getCharacterClass = function() {
	return CharacterVance;
};