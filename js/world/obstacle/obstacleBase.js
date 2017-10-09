function ObstacleBase() {
    this.location = new Vector2(500, 0);
    this.collisionBounds = new Bounds(-5, -5, 5, 5);
    this.dead = false;
} 

ObstacleBase.prototype.update = function() {
    
}
ObstacleBase.prototype.step = function(_amount) {
	this.location.x-=_amount;
    if(this.location.x < -300) {
        this.dead = true;
    }
}

ObstacleBase.prototype.draw = function() {}
ObstacleBase.prototype.drawSorted = function() {}

ObstacleBase.prototype.getSpeed = function() {
    return World.getDriveSpeed();
};
ObstacleBase.prototype.getGap = function() {
    return 75;
};
ObstacleBase.prototype.getOffsetCollisionBounds = function() {
    return this.collisionBounds.offset(this.location);
};
ObstacleBase.prototype.getDeathCause = function() {
	return 0;
}

ObstacleBase.prototype.collidesWith = function(bounds) {
    if(this.getOffsetCollisionBounds().overlaps(bounds)) {
		return Obstacle.COLLISION_FATAL;
	}
	return 0;
}