function Sequence() {
	this.clips = [];
	this.currentClip = 0;
	this.done = false;
}

Sequence.prototype.update = function() {
	if(this.done) return;
	
	var clip = this.clips[this.currentClip];
	clip.update();
}

Sequence.prototype.draw = function() {
	if(this.done) return;
	
	var clip = this.clips[this.currentClip];
	clip.draw();
}

Sequence.prototype.addClip = function(_clip) {
	_clip.sequence = this;
	this.clips.push(_clip);
}

Sequence.prototype.nextClip = function() {
	this.currentClip++;
	if(this.currentClip >= this.clips.length) {
		this.onDone();
	}
}

Sequence.prototype.onDone = function() {
	this.done = true;
}