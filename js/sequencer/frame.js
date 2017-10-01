function Frame(_path, _duration) {
	this.image = Resources.images[_path];
	this.duration = _duration ? _duration : 1;
}

Frame.prototype.draw = function() {
	ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
}