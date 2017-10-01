function ObstacleMeteor() {
    ObstacleBase.call(this);
    this.location.y = 10+Math.floor(Math.random()*-(World.roadHeight-20));
	//this.sprite = new Sprite(Obstacle.image, null, new Vector2(77,0), 21, 17, -15);
	this.collisionBounds = new Bounds(-6, -8, 6, 2);
	this.animComet = 0;
}
ObstacleMeteor.prototype = Object.create(ObstacleBase.prototype);
Obstacle.register(ObstacleMeteor);

ObstacleMeteor.prototype.update = function() {
	ObstacleBase.prototype.update.call(this);
	
	this.animComet = (this.animComet+15*Time.delta)%4;
}

ObstacleMeteor.prototype.draw = function(_stage) {
	ctx.save();
	ctx.translate(Math.floor(this.location.x), Math.floor(this.location.y));
	/*this.sprite.moveTo(this.location.addVec(new Vector2(-10)));
	_stage.addSprite(this.sprite);*/
	ctx.fillStyle = "#ff1c1c";
    ctx.fillRect(this.collisionBounds.minX, this.collisionBounds.minY, this.collisionBounds.maxX-this.collisionBounds.minX, this.collisionBounds.maxY-this.collisionBounds.minY);
	
	ctx.drawImage(Resources.images['res/img/meteor.png'], Math.floor(this.animComet)*32, 0, 32, 32, -8, -27, 32, 32);
	ctx.restore();
}

ObstacleMeteor.prototype.collidesWith = function(bounds) {
    if(this.getOffsetCollisionBounds().overlaps(bounds)) {
		return Obstacle.COLLISION_FATAL;
	}
	return 0;
}