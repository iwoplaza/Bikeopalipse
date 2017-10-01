function Explosion(_location) {
	this.location = _location ? _location : new Vector2(0, 0);
	this.anim = 0;
	this.sprite = new Sprite(Explosions.image, new Vector2(0, this.location.y), new Vector2(0, 0), 32, 32, -19);
}

Explosion.prototype.update = function() {
	this.location.x -= World.getDriveSpeed();
	this.anim += Time.delta*15;
	if(this.location.x < -30 || this.anim > 9) this.dead = true;
}

Explosion.prototype.draw = function(_stage) {
	this.sprite.location.x = this.location.x-16;
	this.sprite.textureCoords.x = Math.floor(this.anim)*32;
	this.sprite.yOffset -= Time.delta*10;
	_stage.addSprite(this.sprite);
}

Explosions = {};
Explosions.init = function() {
	this.image = Resources.images['res/img/explosion.png'];
}