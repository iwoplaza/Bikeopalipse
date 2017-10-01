function CharacterVance() {
	Player.call(this);
	this.sprite = new Sprite(Resources.images['res/img/vance.png'], null, new Vector2(0, 0), 32, 32, -32);
}
CharacterVance.prototype = Object.create(Player.prototype);
CharacterVance.prototype.name = "vance spark";
CharacterVance.prototype.description = ["a struggling businessman"];
CharacterVance.prototype.textureIndex = 0;
Characters.register(CharacterVance);

CharacterVance.prototype.update = function() {
	Player.prototype.update.call(this);
	this.animForward = (this.animForward+Time.delta*15)%4;
}