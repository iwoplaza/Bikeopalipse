function ObstacleSmallRock() {
    ObstacleBase.call(this);
    this.location.y = Math.floor(Math.random()*-World.roadHeight);
}
ObstacleSmallRock.prototype = Object.create(ObstacleBase.prototype);

ObstacleSmallRock.prototype.draw = function() {
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.fillStyle = "orange";
    ctx.fillRect(-5, -10, 10, 10);
    ctx.fillStyle = "red";
    ctx.fillRect(this.collisionBounds.minX, this.collisionBounds.minY, this.collisionBounds.maxX-this.collisionBounds.minX, this.collisionBounds.maxY-this.collisionBounds.minY);
    ctx.restore();
}

Obstacle.register(ObstacleSmallRock);