function ObstacleGapPlank() {
    ObstacleBase.call(this);
    this.location.y = -World.roadHeight;
    this.gapWidth = 80;
    this.plankWidth = 13;
    this.plankY = Math.floor(Math.random()*(World.roadHeight-this.plankWidth));
    this.collisionBoundsTop = new Bounds(10, 0, this.gapWidth-10, this.plankY);
    this.collisionBoundsBottom = new Bounds(10, this.plankY+this.plankWidth, this.gapWidth-10, World.roadHeight);
}
ObstacleGapPlank.prototype = Object.create(ObstacleBase.prototype);

ObstacleGapPlank.prototype.draw = function() {
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
	
	ctx.drawImage(Obstacle.image, 0, 0, 75, 105, 0, 0, 75, 105);
	ctx.drawImage(Obstacle.image, 0, 105, 77, 11, 0, this.plankY+1, 77, 11);
	
    ctx.restore();
}

ObstacleGapPlank.prototype.getGap = function() {
    return 200;
}

ObstacleGapPlank.prototype.collidesWith = function(bounds) {
    return this.collisionBoundsTop.offset(this.location).overlaps(bounds) ||
            this.collisionBoundsBottom.offset(this.location).overlaps(bounds);
}

Obstacle.register(ObstacleGapPlank);