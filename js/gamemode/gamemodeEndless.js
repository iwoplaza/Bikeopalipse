function GameModeEndless(_character) {
    GameMode.call(this);
	this.character = _character ? _character :
					(Characters.registry[Stats.currentCharacter] ? Characters.registry[Stats.currentCharacter] :
					 CharacterVance );
}
GameModeEndless.prototype = Object.create(GameMode.prototype);

GameModeEndless.prototype.onStart = function() {
	
};