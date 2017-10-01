function Clip(_sequence) {
	this.sequence = null;
	this.frames = [];
	this.currentFrame = 0;
	this.frameTime = 0;
	this.done = false;
	this.startScale = 1;
	this.endScale = 1;
	
	this.totalTime = 0;
	this.timeElapsed = 0;
}

Clip.prototype.addFrame = function(_frame) {
	this.frames.push(_frame);
	
	this.totalTime = 0;
	for(let i = 0; i < this.frames.length; i++) {
		this.totalTime += this.frames[i].duration;
	}
	return this;
}

Clip.prototype.update = function() {
	var frame = this.frames[this.currentFrame];
	
	this.timeElapsed += Time.delta;
	this.frameTime += Time.delta;
	if(this.frameTime >= frame.duration)
		this.step();
}

Clip.prototype.step = function() {
	this.nextFrame();
	this.frameTime = 0;
}

Clip.prototype.nextFrame = function() {
	this.currentFrame++;
	if(this.currentFrame >= this.frames.length) {
		this.sequence.nextClip();
	}
}

Clip.prototype.draw = function() {
	ctx.save();
	
	var frame = this.frames[this.currentFrame];
	var width = frame.image.width;
	var height = frame.image.height;
	
	var progress = this.timeElapsed/this.totalTime;
	var scale = this.startScale+progress*(this.endScale-this.startScale);
	
	ctx.scale(scale, scale);
	ctx.translate(-Math.floor(width/2), -Math.floor(height/2));
	frame.draw();
	
	ctx.restore();
}