function Zombie(_location) {
	this.location = _location ? _location : new Vector2(-10+Math.random()*10, -(20+Math.random()*(World.roadHeight-40)));
	this.animSpeed = 10+Math.random()*6;
	this.animForward = Math.random()*3;
	this.sprite = new Sprite(Zombies.image, new Vector2(this.location.x, this.location.y), null, 32, 32, -32);
}

Zombie.prototype.update = function() {
	this.animForward = (this.animForward+this.animSpeed*0.015)%8;
}

Zombie.prototype.draw = function(_stage) {
	ctx.save();
	
	this.sprite.textureCoords.x = Math.floor(this.animForward)*32;
	_stage.addSprite(this.sprite);
	
	ctx.restore();
}

Zombies = {};
Zombies.init = function() {
	this.image = Resources.images['res/img/zombies.png'];
}