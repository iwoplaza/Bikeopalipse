function Powerup() {
	this.name = "Powerup";
	this.hudTextureCoords = new Vector2(0, 0);
	this.enabled = false;
}

Powerup.prototype.drawHUD = function() {
	ctx.drawImage(Powerups.image, this.hudTextureCoords.x, this.hudTextureCoords.y + (this.enabled ? 16 : 0), 16, 16, this.index*16, -17, 16, 16);
}

Powerups = {
	registry: [],
};

Powerups.init = function() {
	this.image = Resources.images['res/img/powerups.png'];
}

Powerups.register = function(_powerup) {
	var powerup = new _powerup();
	powerup.index = this.registry.length;
	this.registry.push(powerup);
}

Powerups.selectPowerup = function(_index) {
	for(let i = 0; i < this.registry.length; i++) {
		this.registry[_index].enabled = false;
	}
	this.registry[_index].enabled = true;
}