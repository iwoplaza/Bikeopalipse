function Road() {
	this.textureWidth = 92;
	this.textureHeight = 105;
	this.image = Resources.images['res/img/roads.png'];
	this.offset = 0;
	
	this.segments = [];
	this.segments.push(new RoadSegment(this));
	this.segments.push(new RoadSegment(this));
	this.segments.push(new RoadSegment(this));
	this.segments.push(new RoadSegment(this));
	this.segments.push(new RoadSegment(this));
	this.segments.push(new RoadSegment(this));
}

Road.prototype.update = function() {
	this.offset += World.getDriveSpeed()*Time.delta;
	if(this.offset >= this.textureWidth) {
		this.segments.splice(0, 1);
		this.segments.push(new RoadSegment(this));
		this.offset -= this.textureWidth;
	}
}

Road.prototype.draw = function() {
	ctx.save();
	ctx.translate(-Math.floor(this.offset), 0);
	for(var i = 0; i < this.segments.length; i++) {
		this.segments[i].draw();
		ctx.translate(this.textureWidth, 0);
	}
	ctx.restore();
}

function RoadSegment(_road) {
	this.road = _road;
	this.texturePos = new Vector2();
	this.variant = Math.round(Math.random()*(this.variants.length-1));
}

RoadSegment.prototype.variants = [
	[0, 0],
	[92, 0],
	[184, 0]
];

RoadSegment.prototype.draw = function() {
	var coords = this.variants[this.variant];
	ctx.drawImage(this.road.image, coords[0], coords[1], this.road.textureWidth, this.road.textureHeight, 0, -105, this.road.textureWidth, this.road.textureHeight);
}