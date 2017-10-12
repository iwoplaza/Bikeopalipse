function Plane(_location) {
	this.location = _location ? _location : new Vector2();
}
Plane.prototype.moveTo = function(_vec) {
	this.location = _vec;
}
Plane.prototype.draw = function(_stage) {}