function Explosion(_location) {
	this.location = _location ? _location : new Vector2(0, 0);
	this.anim = 0;
	this.sprite = new Sprite(Explosions.image, new Vector2(0, this.location.y), new Vector2(0, 0), 32, 32, -19);
}

Explosion.prototype.update = function() {
	this.anim += Time.delta*15;
	if(this.anim > 9) this.dead = true;
	
	this.sprite.yOffset -= Time.delta*10;
}

Explosion.prototype.step = function(_amount) {
	this.location.x -= _amount;
	if(this.location.x < -30) this.dead = true;
}

Explosion.prototype.draw = function(_stage) {
	this.sprite.location.x = this.location.x-16;
	this.sprite.textureCoords.x = Math.floor(this.anim)*32;
	_stage.addSprite(this.sprite);
}

Explosions = {};
Explosions.init = function() {
	this.image = Resources.images['res/img/world/explosion.png'];
}