function CharacterStewart() {
	Player.call(this);
	this.sprite = new Sprite(Resources.images['res/img/vance.png'], null, new Vector2(0, 0), 32, 32, -32);
}

CharacterStewart.prototype = Object.create(Player.prototype);