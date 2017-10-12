function Skyline(_image) {
	this.image = _image;
	this.mesh = Draw.rectangle(0, -300, 0, 512, 256);
	this.offset = 0;
}

Skyline.prototype.step = function(_amount) {
	this.offset += _amount*0.05;
	
	if(this.offset >= 512) {
		this.offset -= 512;
	}
}

Skyline.prototype.draw = function() {
	ctx.save();
	ctx.translate(-Math.floor(this.offset), 0);
	ctx.drawImage(this.mesh, this.image);
	ctx.translate(512, 0);
	ctx.drawImage(this.mesh, this.image);
	ctx.restore();
}

Skyline.prototype.destroy = function() {
	this.mesh.cleanUp();
}