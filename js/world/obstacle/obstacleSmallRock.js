function ObstacleSmallRock() {
    ObstacleBase.call(this);
    this.location.y = 10+Math.floor(Math.random()*-(World.roadHeight-20));
	this.sprite = new Sprite(Obstacle.image, null, new Vector2(77,0), 21, 17, -15);
	this.collisionBounds = new Bounds(-6, -8, 6, 2);
}
ObstacleSmallRock.prototype = Object.create(ObstacleBase.prototype);
Obstacle.register(ObstacleSmallRock);

ObstacleSmallRock.prototype.draw = function(_stage) {
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    /*ctx.fillStyle = "red";
    ctx.fillRect(this.collisionBounds.minX, this.collisionBounds.minY, this.collisionBounds.maxX-this.collisionBounds.minX, this.collisionBounds.maxY-this.collisionBounds.minY);*/
	
	this.sprite.moveTo(this.location.addVec(new Vector2(-10)));
	_stage.addSprite(this.sprite);
	
    ctx.restore();
}

ObstacleBase.prototype.collidesWith = function(bounds) {
    if(this.getOffsetCollisionBounds().overlaps(bounds)) {
		return Obstacle.COLLISION_TRIP;
	}
	return 0;
}