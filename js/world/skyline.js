function Skyline(_image) {
	this.image = _image;
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
	ctx.drawImage(this.image, 0, -300, 512, 256);
	ctx.drawImage(this.image, 512, -300, 512, 256);
	ctx.restore();
}