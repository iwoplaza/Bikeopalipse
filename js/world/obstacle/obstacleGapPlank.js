function ObstacleGapPlank() {
    ObstacleBase.call(this);
    this.location.y = -World.roadHeight;
    this.gapWidth = 60;
    this.plankWidth = 24;
    this.plankY = Math.floor(Math.random()*(World.roadHeight-this.plankWidth));
    this.collisionBoundsTop = new Bounds(10, 0, this.gapWidth-10, this.plankY);
    this.collisionBoundsBottom = new Bounds(10, this.plankY+this.plankWidth, this.gapWidth-10, World.roadHeight);
}
ObstacleGapPlank.prototype = Object.create(ObstacleBase.prototype);
Obstacle.register(ObstacleGapPlank);

//This function is called by the Obstacles object on init.
ObstacleGapPlank.prototype.init = function() {
	this.meshGap = Draw.rectangle(0, 0, 0, 77, 107);
	this.meshPlank = Draw.rectangle(0, 0, 0, 82, 19);
}
ObstacleGapPlank.prototype.draw = function() {
    ctx.save();
    ctx.translate(Math.floor(this.location.x), this.location.y);
	
	ctx.drawImage(this.meshGap, Obstacle.image, 0, 0, 77, 107);
	ctx.translate(0, this.plankY+3);
	ctx.drawImage(this.meshPlank, Obstacle.image, 0, 118, 82, 19);
	
    ctx.restore();
}

ObstacleGapPlank.prototype.getGap = function() {
    return 200;
}
ObstacleGapPlank.prototype.getDeathCause = function() {
	return DeathCause.HOLE;
}

ObstacleGapPlank.prototype.collidesWith = function(bounds) {
    return (this.collisionBoundsTop.offset(this.location).overlaps(bounds) ||
            this.collisionBoundsBottom.offset(this.location).overlaps(bounds)) ? Obstacle.COLLISION_FATAL : 0;
}