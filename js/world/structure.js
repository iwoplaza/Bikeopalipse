function Structure() {
	this.offset = 0;
	
	this.segments = [];
	this.segments.push(new StructureSegment());
	this.segments.push(new StructureSegment());
	this.segments.push(new StructureSegment());
	this.segments.push(new StructureSegment());
	this.segments.push(new StructureSegment());
	this.segments.push(new StructureSegment());
}

Structure.prototype.update = function() {
	this.offset += World.getDriveSpeed();
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

Structure.prototype.draw = function() {
	ctx.save();
	ctx.translate(-Math.floor(this.offset), -105);
	for(var i = 0; i < this.segments.length; i++) {
		this.segments[i].draw();
		ctx.translate(this.segments[i].textureWidth, 0);
	}
	ctx.restore();
}

function StructureSegment() {
    this.variant = Math.round(Math.random()*(this.variants.length-1));
    this.image = Resources.images[this.variants[this.variant]];
    this.textureWidth = this.image.width;
	this.textureHeight = 495;
	this.texturePos = new Vector2();
}

StructureSegment.prototype.variants = [
    'res/img/building01.png',
    'res/img/building02.png',
    'res/img/building03.png',
    'res/img/building04.png',
    'res/img/building05.png',
    'res/img/house01.png',
    'res/img/house02.png',
    'res/img/house03.png'
];

StructureSegment.prototype.draw = function() {
	ctx.drawImage(this.image, 0, 0, this.textureWidth, this.textureHeight, 0, -this.textureHeight, this.textureWidth, this.textureHeight);
}