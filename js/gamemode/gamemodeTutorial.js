function GameModeTutorial() {
    GameMode.call(this);
}
GameModeTutorial.prototype = Object.create(GameMode.prototype);

GameModeTutorial.prototype.start = function() {
	GameMode.prototype.start.call(this);
};
GameModeTutorial.prototype.update = function() {
	GameMode.prototype.update.call(this);
};
GameModeTutorial.prototype.draw = function() {
	GameMode.prototype.draw.call(this);
};
GameModeTutorial.prototype.getCharacterClass = function() {
	return CharacterVance;
};