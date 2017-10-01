function middleGround() {
	this.offset = 0;
	
	this.segments = [];
	this.segments.push(new middleGroundSegment());
	this.segments.push(new middleGroundSegment());
	this.segments.push(new middleGroundSegment());
	this.segments.push(new middleGroundSegment());
	this.segments.push(new middleGroundSegment());
	this.segments.push(new middleGroundSegment());
}

middleGround.prototype.update = function() {
	this.offset += Time.delta*World.getDriveSpeed()*0.4;
	if(this.offset >= this.segments[0].textureWidth) {
		this.offset -= this.segments[0].textureWidth;
		this.segments.splice(0, 1);
	}
    var width = 0;
    for (var i=0;i<this.segments.length;i++) width += this.segments[i].textureWidth;
    while (width<=canvas.width*2){
		this.segments.push(new StructureSegment());
		width = 0;
    	for (var i=0;i<this.segments.length;i++) width += this.segments[i].textureWidth;
	}
}

middleGround.prototype.draw = function() {
	ctx.save();
	ctx.translate(-Math.floor(this.offset), -20);
	for(var i = 0; i < this.segments.length; i++) {
		this.segments[i].draw();
		ctx.translate(this.segments[i].textureWidth, 0);
	}
	ctx.restore();
}

function middleGroundSegment() {
    this.variant = Math.round(Math.random()*(this.variants.length-1));
    this.image = Resources.images[this.variants[this.variant]];
    this.textureWidth = this.image.width;
	this.textureHeight = 256;
	this.texturePos = new Vector2();
}

middleGroundSegment.prototype.variants = [
    'res/img/SecondLayer.png',
];

middleGroundSegment.prototype.draw = function() {
	ctx.drawImage(this.image, 0, 0, this.textureWidth, this.textureHeight, 0, -this.textureHeight, this.textureWidth, this.textureHeight);
}