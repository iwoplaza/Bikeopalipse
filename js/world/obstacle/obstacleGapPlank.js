function ObstacleGapPlank() {
    ObstacleBase.call(this);
    this.location.y = -World.roadHeight;
    this.gapWidth = 180;
    this.plankWidth = 40;
    this.plankY = Math.floor(Math.random()*(World.roadHeight-this.plankWidth));
    this.collisionBoundsTop = new Bounds(0, 0, this.gapWidth, this.plankY);
    this.collisionBoundsBottom = new Bounds(0, this.plankY+this.gapWidth, this.gapWidth, World.roadHeight);
}
ObstacleGapPlank.prototype = Object.create(ObstacleBase.prototype);

ObstacleGapPlank.prototype.draw = function() {
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 0, this.gapWidth, World.roadHeight);
    ctx.fillStyle = "red";
    ctx.fillRect(-10, this.plankY, this.gapWidth+20, this.plankWidth);
    ctx.restore();
}

ObstacleGapPlank.prototype.getGap = function() {
    return 400;
}

ObstacleGapPlank.prototype.collidesWith = function(bounds) {
    return this.collisionBoundsTop.offset(this.location).overlaps(bounds) ||
            this.collisionBoundsBottom.offset(this.location).overlaps(bounds);
}

Obstacle.register(ObstacleGapPlank);