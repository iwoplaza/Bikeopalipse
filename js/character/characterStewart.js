function CharacterStewart() {
	Player.call(this);
	this.sprite = new Sprite(Resources.images['res/img/character/stewart.png'], null, new Vector2(0, 0), 64, 64, -43);
}
CharacterStewart.prototype = Object.create(Player.prototype);
CharacterStewart.prototype.name = "stewart";
CharacterStewart.prototype.description = ["a makeshift runner"];
CharacterStewart.prototype.price = 1500;
CharacterStewart.prototype.textureIndex = 1;
Characters.register(CharacterStewart);

CharacterStewart.prototype.draw = function(_stage) {
    Player.prototype.draw.call(this, _stage);
    
    this.sprite.moveTo(this.location.addVec(new Vector2(-32, 0)));
	this.sprite.textureCoords.x = Math.floor(this.animForward)*64;
	_stage.addPlane(this.sprite);
}

CharacterStewart.prototype.update = function() {
	Player.prototype.update.call(this);
	this.animForward = (this.animForward+Time.delta*10)%6;
}

CharacterStewart.prototype.useAbility = function() {
	this.getPowerup(2);
	Player.prototype.useAbility.call(this);
}

CharacterStewart.prototype.getPowerup = function(_index) {
	if(this.usingAbility) return;
	
	Player.prototype.getPowerup.call(this, _index);
}

CharacterStewart.prototype.performAbility = function() {
}