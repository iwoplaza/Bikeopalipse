function StagePlane(_location) {
	this.location = _location ? _location : new Vector2();
}
StagePlane.prototype.moveTo = function(_vec) {
	this.location = _vec;
}
StagePlane.prototype.draw = function(_stage) {}