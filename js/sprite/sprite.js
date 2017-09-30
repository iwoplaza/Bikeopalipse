function Sprite(_image, _loc, _tex, _w, _h, _yo) {
	this.image = _image;
	this.location = _loc ? _loc : new Vector2();
	this.textureCoords  = _tex ? _tex : new Vector2();
	this.width = _w ? _w : 0;
	this.height = _h ? _h : 0;
	this.yOffset = _yo;
}

Sprite.prototype.moveTo = function(_vec) {
	this.location = _vec;
}

Sprite.prototype.draw = function() {
	ctx.drawImage(this.image, this.textureCoords.x, this.textureCoords.y, this.width, this.height, Math.floor(this.location.x), Math.floor(this.location.y+this.yOffset), this.width, this.height);
}