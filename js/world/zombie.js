function Zombie(_location) {
	this.location = _location ? _location : new Vector2(-10+Math.random()*10, -(20+Math.random()*(World.roadHeight-40)));
	this.animSpeed = 10+Math.random()*6;
	this.animForward = Math.random()*3;
	this.appearance = 1;
	this.sprite = new Sprite(Zombies.image, new Vector2(this.location.x-50, this.location.y), null, 32, 32, -32);
	this.jumpTimer = 0;
	this.jumpStartTime = 0;
	this.collisionBounds = new Bounds(10, -3, 28, 3);
}
Zombie.prototype.update = function() {
	this.animForward = (this.animForward+this.animSpeed*1.1*Time.delta)%8;
	if(this.jumpTimer > 0) this.jumpTimer -= Time.delta;
	//else this.jump();
	if(this.appearance > 0)
		this.appearance -= Time.delta;
	
	for(var i in World.obstacles) {
		var obstacle = World.obstacles[i];
		var collision = obstacle.collidesWith(this.getOffsetCollisionBounds());
		
		if(collision == Obstacle.COLLISION_FATAL) {
			this.jump();
		}
	}
	
	this.sprite.location.x = this.location.x-this.appearance*50;
	if(this.jumpTimer > 0) {
		var a = (this.jumpStartTime-this.jumpTimer)/this.jumpStartTime;
		this.sprite.yOffset = -32-Math.sin(a*Math.PI)*20;
	}else{
		this.sprite.yOffset = -32;
	}
};
Zombie.prototype.draw = function(_stage) {
	ctx.save();
	
	if(this.jumpTimer > 0) {
		var jumpAnimFrame = 8;
		jumpAnimFrame += Math.max(0, Math.min((this.jumpStartTime - this.jumpTimer)*8-1, 3));
		this.sprite.textureCoords.x = Math.floor(jumpAnimFrame)*32;
	}else
		this.sprite.textureCoords.x = Math.floor(this.animForward)*32;
	
	_stage.addSprite(this.sprite);
	
	ctx.restore();
};
Zombie.prototype.jump = function(_strength) {
	if(this.jumpTimer > 0) return;
	this.jumpTimer = _strength ? _strength : 1;
	this.jumpStartTime = _strength ? _strength : 1;
};
Zombie.prototype.shoveOff = function() {
	this.appearance += 2*Time.delta;
	if(this.appearance > 20) this.appearance = 20;
};
Zombie.prototype.getOffsetCollisionBounds = function() {
    return this.collisionBounds.offset(this.location);
};

Zombies = {};
Zombies.init = function() {
	this.image = Resources.images['res/img/zombies.png'];
}