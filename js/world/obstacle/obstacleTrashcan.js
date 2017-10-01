function ObstacleTrashcan() {
    ObstacleBase.call(this);
    this.location.y = 10+Math.floor(Math.random()*-(World.roadHeight-20));
	this.sprite = new Sprite(Obstacle.image, null, new Vector2(0,137), 30, 24, -12);
	this.collisionBounds = new Bounds(-4, -8, 8, 5);
}
ObstacleTrashcan.prototype = Object.create(ObstacleBase.prototype);
Obstacle.register(ObstacleTrashcan);

ObstacleTrashcan.prototype.draw = function(_stage) {
	this.sprite.moveTo(this.location.addVec(new Vector2(-15)));
    //ctx.fillStyle = "#ff1c1c";
    //ctx.fillRect(this.location.x+this.collisionBounds.minX, this.location.y+this.collisionBounds.minY, this.collisionBounds.maxX-this.collisionBounds.minX, this.collisionBounds.maxY-this.collisionBounds.minY);
    _stage.addSprite(this.sprite);
}

ObstacleBase.prototype.collidesWith = function(bounds) {
    if(this.getOffsetCollisionBounds().overlaps(bounds)) {
		return Obstacle.COLLISION_TRIP;
	}
	return 0;
}