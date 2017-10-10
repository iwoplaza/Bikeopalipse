var Characters = {};
Characters.registry = [];
Characters.register = function(_character) {
	Characters.registry[_character.prototype.name] = _character;
}

Characters.init = function() {
	this.image = Resources.images['res/img/character/characters.png'];
}