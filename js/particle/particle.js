function Particle(_location) {
	this.location = _location ? _location : new Vector2();
}
Particle.prototype.update = function() {};
Particle.prototype.draw = function(_stage) {};