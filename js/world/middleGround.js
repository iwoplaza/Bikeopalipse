function MiddleGround() {
	this.offset = 0;
	
	this.segments = [];
	this.segments.push(new MiddleGroundSegment());
	this.segments.push(new MiddleGroundSegment());
	this.segments.push(new MiddleGroundSegment());
	this.segments.push(new MiddleGroundSegment());
	this.segments.push(new MiddleGroundSegment());
	this.segments.push(new MiddleGroundSegment());
}

MiddleGround.prototype.step = function(_amount) {
	this.offset += _amount*0.4;
	if(this.offset >= this.segments[0].width) {
		this.offset -= this.segments[0].width;
		this.segments.splice(0, 1);
	}
    var width = 0;
    for (var i = 0; i < this.segments.length;i++) width += this.segments[i].width;
    while (width <= canvas.width*2){
		this.segments.push(new MiddleGroundSegment());
		width = 0;
    	for (var i=0;i<this.segments.length;i++) width += this.segments[i].width;
	}
}

MiddleGround.prototype.draw = function() {
	ctx.save();
	ctx.translate(-Math.floor(this.offset), -10);
	for(var i = 0; i < this.segments.length; i++) {
		this.segments[i].draw();
		ctx.translate(this.segments[i].width, 0);
	}
	ctx.restore();
}

function MiddleGroundSegment() {
    this.variant = MiddleGroundVariants.getRandom();
	this.width = this.variant.width;
}

MiddleGroundSegment.prototype.draw = function() {
	ctx.drawImage(this.variant.mesh, this.variant.image, this.variant.x, this.variant.y, this.variant.width, this.variant.height);
}

function MiddleGroundVariant(_path, _x, _y, _width, _height) {
	this.path = _path;
	this.image = Resources.images[_path];
	this.x = _x ? _x : 0;
	this.y = _y ? _y : 0;
	this.width = _width ? _width : this.image.width;
	this.height = _height ? _height : this.image.height;
	this.mesh = Draw.rectangle(0, -this.height, 0, this.width, this.height);
}

MiddleGroundVariants = {
	registry: []
};
MiddleGroundVariants.init = function() {
	this.register('res/img/world/middleground_dawn.png', 0, 0, 824, 256);
	this.register('res/img/world/middleground_dawn.png', 0, 256, 824, 256);
}
MiddleGroundVariants.register = function(_path, _x, _y, _width, _height) {
	this.registry.push(new MiddleGroundVariant(_path, _x, _y, _width, _height));
}
MiddleGroundVariants.getRandom = function() {
	return this.registry[Math.round(Math.random()*(this.registry.length-1))];
}