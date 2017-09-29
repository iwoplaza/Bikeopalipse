function Vector2(_x, _y) {
    this.x = _x ? _x : 0;
    this.y = _y ? _y : 0;
}

Vector2.prototype.addVec = function(_vec) {
    return new Vector2(this.x + _vec.x, this.y + _vec.y);
}

Vector2.prototype.multiply = function(val) {
    return new Vector2(this.x * val, this.y * val);
}