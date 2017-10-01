function CharacterVance() {
	Player.call(this);
	this.sprite = new Sprite(Resources.images['res/img/vance.png'], null, new Vector2(0, 0), 32, 32, -32);
}

CharacterVance.prototype = Object.create(Player.prototype);