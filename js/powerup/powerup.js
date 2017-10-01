function Powerup() {
	this.name = "Powerup";
	this.hudTextureCoords = new Vector2(0, 0);
	this.enabled = false;
	this.blink = 0;
}

Powerup.prototype.drawHUD = function(_stage) {
	ctx.drawImage(Powerups.image, this.hudTextureCoords.x, this.hudTextureCoords.y + (this.enabled ? 16 : 0), 16, 16, this.index*16, -17, 16, 16);
}

Powerup.prototype.drawPlayerOverlay = function() {}
Powerup.prototype.update = function() {
	this.lifetime -= Time.delta;
	
	if(this.lifetime <= 1) {
		this.blink = (this.blink+5*Time.delta)%1;
	}
	
	if(this.lifetime <= 0)
		this.dead = true;
}
Powerup.prototype.onObtained = function() {
	this.lifetime = 5;
	this.dead = false;
}
Powerup.prototype.onTrip = function(_obstacle) {
	return false;
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
		this.registry[i].enabled = false;
	}
	this.registry[_index].enabled = true;
}