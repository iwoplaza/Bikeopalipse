function ObstacleMeteor() {
    ObstacleBase.call(this);
    this.location.y = 10+Math.floor(Math.random()*-(World.roadHeight-20));
	this.sprite = new Sprite(Resources.images['res/img/meteor.png'], null, new Vector2(0, 32), 32, 32, -18);
	this.collisionBounds = new Bounds(-6, -8, 6, 2);
	this.animComet = 0;
	this.animFall = 1;
	this.distance = 200;
}
ObstacleMeteor.prototype = Object.create(ObstacleBase.prototype);
Obstacle.register(ObstacleMeteor);

ObstacleMeteor.prototype.update = function() {
	ObstacleBase.prototype.update.call(this);
	
	this.animComet = (this.animComet+0.30)%4;
	if(this.animFall > 0) {
		this.animFall -= 0.014;
		if(this.animFall <= 0) {
			this.animFall = 0;
			World.spawnExplosion(Object.create(this.location));
		}
	}
}

ObstacleMeteor.prototype.draw = function(_stage) {
	ctx.save();
	ctx.translate(Math.floor(this.location.x), Math.floor(this.location.y));
	this.sprite.moveTo(this.location.add(-16, -1));
	
	/*ctx.fillStyle = "#ff1c1c";
    ctx.fillRect(this.collisionBounds.minX, this.collisionBounds.minY, this.collisionBounds.maxX-this.collisionBounds.minX, this.collisionBounds.maxY-this.collisionBounds.minY);*/
	if(this.animFall > 0)
		ctx.drawImage(Resources.images['res/img/meteor.png'], Math.floor(this.animComet)*32, 0, 32, 32, -8+this.distance*this.animFall, -27-this.distance*this.animFall, 32, 32);
	else
		_stage.addSprite(this.sprite);
	ctx.restore();
}

ObstacleMeteor.prototype.collidesWith = function(bounds) {
    if(this.getOffsetCollisionBounds().overlaps(bounds)) {
		return Obstacle.COLLISION_FATAL;
	}
	return 0;
}