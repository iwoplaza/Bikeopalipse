function ObstacleGapPlank() {
    ObstacleBase.call(this);
    this.location.y = -World.roadHeight;
    this.gapWidth = 60;
    this.plankWidth = 21;
    this.plankY = Math.floor(Math.random()*(World.roadHeight-this.plankWidth));
    this.collisionBoundsTop = new Bounds(10, 0, this.gapWidth-10, this.plankY);
    this.collisionBoundsBottom = new Bounds(10, this.plankY+this.plankWidth, this.gapWidth-10, World.roadHeight);
}
ObstacleGapPlank.prototype = Object.create(ObstacleBase.prototype);

ObstacleGapPlank.prototype.draw = function() {
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
	
	ctx.drawImage(Obstacle.image, 0, 0, 77, 105, 0, 0, 77, 107);
	ctx.drawImage(Obstacle.image, 0, 118, 82, 19, 0, this.plankY+2, 82, 19);
	
    ctx.restore();
}

ObstacleGapPlank.prototype.getGap = function() {
    return 200;
}

ObstacleGapPlank.prototype.collidesWith = function(bounds) {
    return (this.collisionBoundsTop.offset(this.location).overlaps(bounds) ||
            this.collisionBoundsBottom.offset(this.location).overlaps(bounds)) ? Obstacle.COLLISION_FATAL : 0;
}

Obstacle.register(ObstacleGapPlank);