function ObstacleBase() {
    this.location = new Vector2(canvas.width, 0);
    this.collisionBounds = new Bounds(-10, -10, 10, 10);
    this.dead = false;
} 

ObstacleBase.prototype.update = function() {
    this.location.x -= this.getSpeed()*Time.delta;
    if(this.location.x < -300) {
        this.dead = true;
    }
}

ObstacleBase.prototype.getSpeed = function() {
    return World.getDriveSpeed();
}

ObstacleBase.prototype.getGap = function() {
    return 150;
}

ObstacleBase.prototype.getOffsetCollisionBounds = function() {
    return this.collisionBounds.offset(this.location);
}

ObstacleBase.prototype.collidesWith = function(bounds) {
    return this.getOffsetCollisionBounds().overlaps(bounds);
}