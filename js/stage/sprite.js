function Sprite(_image, _loc, _tex, _w, _h, _yo) {
	this.image = _image;
	this.location = _loc ? _loc : new Vector2();
	this.textureCoords  = _tex ? _tex : new Vector2();
	this.width = _w ? _w : 0;
	this.height = _h ? _h : 0;
	this.yOffset = _yo;
	this.mesh = Draw.rectangle(0, 0, 0, this.width, this.height);
}
Sprite.prototype = Object.create(Plane.prototype);

Sprite.prototype.draw = function() {
	//ctx.drawImage(this.image, this.textureCoords.x, this.textureCoords.y, this.width, this.height, Math.floor(this.location.x), Math.floor(this.location.y+this.yOffset), this.width, this.height);
	ctx.save();
	ctx.translate(Math.floor(this.location.x), Math.floor(this.location.y+this.yOffset));
	ctx.drawImage(this.mesh, this.image, this.textureCoords.x, this.textureCoords.y, this.width, this.height);
	ctx.restore();
}