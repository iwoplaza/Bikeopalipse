function Zombie(_location) {
	this.location = _location ? _location : new Vector2(-10+Math.random()*10, -(20+Math.random()*(World.roadHeight-40)));
	this.animSpeed = 10+Math.random()*6;
	this.animForward = Math.random()*3;
	this.appearance = 1;
	this.sprite = new Sprite(Zombies.image, new Vector2(this.location.x-50, this.location.y), null, 32, 32, -32);
}

Zombie.prototype.update = function() {
	this.animForward = (this.animForward+this.animSpeed*0.015)%8;
	if(this.appearance > 0)
		this.appearance -= 0.01;
	
	this.sprite.location.x = this.location.x-this.appearance*50;
}

Zombie.prototype.draw = function(_stage) {
	ctx.save();
	
	this.sprite.textureCoords.x = Math.floor(this.animForward)*32;
	_stage.addSprite(this.sprite);
	
	ctx.restore();
}

Zombie.prototype.shoveOff = function() {
	this.appearance += 0.02;
	if(this.appearance > 50) this.appearance = 50;
}

Zombies = {};
Zombies.init = function() {
	this.image = Resources.images['res/img/zombies.png'];
}