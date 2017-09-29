function Bounds(_minX,_minY,_maxX,_maxY) {
    this.minX = _minX ? _minX : 0;
    this.minY = _minY ? _minY : 0;
    this.maxX = _maxX ? _maxX : 0;
    this.maxY = _maxY ? _maxY : 0;
}

Bounds.prototype.pointInside = function(vec) {
    return (vec.x >= this.minX && vec.x <= this.maxX && vec.y >= this.minY && vec.y <= this.maxY);
}

Bounds.prototype.overlaps = function(b) {
    return (this.maxX >= b.minX && b.maxX >= this.minX && this.maxY >= b.minY && b.maxY >= this.minY);
}

Bounds.prototype.offset = function(vec) {
    return new Bounds(this.minX+vec.x, this.minY+vec.y, this.maxX+vec.x, this.maxY+vec.y);
}