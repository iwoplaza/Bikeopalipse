function ObstacleTrashcan() {
    ObstacleBase.call(this);
    this.location.y = 10+Math.floor(Math.random()*-(World.roadHeight-20));
	this.sprite = new Sprite(Obstacle.image, null, new Vector2(0,137), 53, 42, -30);
	this.collisionBounds = new Bounds(-9, -16, 43, 12);
}
ObstacleTrashcan.prototype = Object.create(ObstacleBase.prototype);
Obstacle.register(ObstacleTrashcan);

ObstacleTrashcan.prototype.draw = function(_stage) {
	this.sprite.moveTo(this.location.addVec(new Vector2(-10)));
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