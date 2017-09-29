function Coin(_location) {
	this.location = _location ? _location : new Vector2(0, 0);
	this.dead = false;
}

Coin.prototype.collisionBounds = new Bounds(-10, -10, 10, 10);

Coin.prototype.update = function() {
	this.location.x -= World.getDriveSpeed()*Time.delta;
	if(this.location.x < -50) this.dead = true;
}

Coin.prototype.draw = function(_stage) {
	ctx.save();
	ctx.translate(this.location.x, this.location.y);
	
	ctx.fillStyle = "yellow";
	ctx.fillRect(-10, -10, 20, 20);
	
	ctx.restore();
}

Coin.prototype.collidesWith = function(bounds) {
	return this.collisionBounds.offset(this.location).overlaps(bounds);
}