function Zombie(_location) {
	this.location = _location ? _location : new Vector2(0, -(20+Math.random()*(World.roadHeight-40)));
	this.animForward = 0;
	this.sprite = new Sprite(Zombies.image, new Vector2(this.location.x, this.location.y), null, -16);
}

Zombie.prototype.update = function() {
	this.location.x -= World.getDriveSpeed()*Time.delta;
}

Zombie.prototype.draw = function(_stage) {
	ctx.save();
	
	this.sprite.location.x = this.location.x;
	_stage.addSprite(this.sprite);
	
	ctx.restore();
}

Zombies = {};
Zombies.init = function() {
	this.image = Resources.images['res/img/zombies.png'];
}