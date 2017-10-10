function CharacterVance() {
	Player.call(this);
	this.sprite = new Sprite(Resources.images['res/img/character/vance.png'], null, new Vector2(0, 0), 32, 32, -32);
}
CharacterVance.prototype = Object.create(Player.prototype);
CharacterVance.prototype.name = "vance";
CharacterVance.prototype.description = ["a struggling businessman"];
CharacterVance.prototype.textureIndex = 0;
Characters.register(CharacterVance);

CharacterVance.prototype.update = function() {
	Player.prototype.update.call(this);
	this.animForward = (this.animForward+15*Time.delta)%4;
}

CharacterVance.prototype.draw = function(_stage) {
    Player.prototype.draw.call(this, _stage);
    
    this.sprite.moveTo(this.location.addVec(new Vector2(-16, 0)));
	this.sprite.textureCoords.x = Math.floor(this.animForward)*32;
    this.sprite.textureCoords.y = this.up ? 32 : this.down ? 64 : 0;
	_stage.addSprite(this.sprite);
}

CharacterVance.prototype.performAbility = function() {
	
}

CharacterVance.prototype.getSpeedMultiplier = function() {
	if(this.powerup != null)
		return this.powerup.getSpeedMultiplier();
	return 1;
}