var ScoreSource = {
	DISTANCE: 1,
	COIN: 2,
	EXPLOSION: 3,
};

var GameModes = {
	current: null,
};

GameModes.start = function(_gamemode) {
	this.current = _gamemode;
};

function GameMode() {
}

GameMode.prototype.start = function() {
	AudioManager.playMusic('res/sfx/Apoca.ogg', 0.3);
	AudioManager.playSFX('res/sfx/Go.ogg', 0.7);
	
	Player.player = new (this.getCharacterClass());
	World.init();
	Powerups.reset();
	this.gameOver = false;
	this.score = 0;
	this.distance = 0;
};
GameMode.prototype.destroy = function() {
	Player.player.destroy();
	World.destroy();
};
GameMode.prototype.update = function() {};
GameMode.prototype.draw = function() {};
GameMode.prototype.keyDown = function(e) {
	if(this.isGameOver()) {
		if(e.keyCode == 32) {
			ScreenHandler.open(new ScreenLobby());
		}
	}else{
		Player.player.keyDown(e);
	}
};
GameMode.prototype.keyUp = function(e) {
    Player.player.keyUp(e);
};
GameMode.prototype.addScore = function(_score, _source) {
	_source = _source ? _source : ScoreSource.DISTANCE;
	this.score += _score;
	HUD.onScore(_score, _source);
};
GameMode.prototype.onCoinCollected = function(_player, _value) {
	this.addScore(1, ScoreSource.COIN);
};
GameMode.prototype.onGameOver = function() {
	this.gameOver = true;
	AudioManager.playSFX('res/sfx/Hurt.ogg');
	Stats.setHighscore(this.score);
	Stats.updateCoins();
};
GameMode.prototype.onDeath = function(_cause) {
	if(_cause == undefined) return;
	this.onGameOver();
};
GameMode.prototype.getScore = function() {
	return this.score;
};
GameMode.prototype.getCharacterClass = function() {
	return (Characters.registry[Stats.currentCharacter] ? Characters.registry[Stats.currentCharacter] : CharacterVance );
};
GameMode.prototype.getDriveSpeed = function() {
	return 100;
};
GameMode.prototype.isGameOver = function() {
	return this.gameOver;
};