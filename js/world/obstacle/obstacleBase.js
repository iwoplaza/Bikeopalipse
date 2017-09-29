function ObstacleBase() {
    this.location = new Vector2(canvas.width, 0);
    this.collisionBounds = new Bounds(-5, -5, 5, 5);
    this.dead = false;
} 

ObstacleBase.prototype.update = function() {
    this.location.x -= this.getSpeed()*Time.delta;
    if(this.location.x < -300) {
        this.dead = true;
    }
}

ObstacleBase.prototype.draw = function() {}
ObstacleBase.prototype.drawSorted = function() {}

ObstacleBase.prototype.getSpeed = function() {
    return World.getDriveSpeed();
}

ObstacleBase.prototype.getGap = function() {
    return 75;
}

ObstacleBase.prototype.getOffsetCollisionBounds = function() {
    return this.collisionBounds.offset(this.location);
}

ObstacleBase.prototype.collidesWith = function(bounds) {
    return this.getOffsetCollisionBounds().overlaps(bounds);
}