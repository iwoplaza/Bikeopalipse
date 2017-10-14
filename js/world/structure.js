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

Structure.prototype.step = function(_amount) {
	this.offset += _amount;
	if(this.offset >= this.segments[0].width) {
		this.offset -= this.segments[0].width;
		this.segments.splice(0, 1);
	}
    var width = 0;
    for (var i = 0; i < this.segments.length; i++) width += this.segments[i].width;
    while (width <= canvas.width*2){
		this.segments.push(new StructureSegment());
		width = 0;
    	for (var i = 0; i < this.segments.length; i++) width += this.segments[i].width;
	}
}

Structure.prototype.draw = function() {
	ctx.save();
	ctx.translate(-Math.floor(this.offset), -105);
	for(var i = 0; i < this.segments.length; i++) {
		this.segments[i].draw();
		ctx.translate(this.segments[i].width, 0);
	}
	ctx.restore();
}

function StructureSegment() {
    this.variant = StructureVariants.getRandom();
	this.width = this.variant.width;
}

/*StructureSegment.prototype.variants = [
    'res/img/world/building01.png',
    'res/img/world/building02.png',
    'res/img/world/building03.png',
    'res/img/world/building04.png',
    'res/img/world/building05.png',
    'res/img/world/house01.png',
    'res/img/world/house02.png',
    'res/img/world/house03.png'
];*/

StructureSegment.prototype.draw = function() {
	ctx.drawImage(this.variant.mesh, this.variant.image, this.variant.x, this.variant.y, this.variant.width, this.variant.height);
}

function StructureVariant(_path, _x, _y, _width, _height) {
	this.path = _path;
	this.image = Resources.images[_path];
	this.x = _x ? _x : 0;
	this.y = _y ? _y : 0;
	this.width = _width ? _width : this.image.width;
	this.height = _height ? _height : this.image.height;
	this.mesh = Draw.rectangle(0, -this.height, 0, this.width, this.height);
}

StructureVariants = {
	registry: []
};
StructureVariants.init = function() {
	this.register('res/img/world/building01.png', 0, 0, 358, 256);
	this.register('res/img/world/building02.png', 0, 0, 309, 256);
	this.register('res/img/world/building03.png', 0, 0, 374, 256);
	this.register('res/img/world/building04.png', 0, 0, 315, 256);
	this.register('res/img/world/building05.png', 0, 0, 386, 256);
	this.register('res/img/world/house01.png', 0, 0, 360, 256);
	this.register('res/img/world/house02.png', 0, 0, 374, 256);
	this.register('res/img/world/house03.png', 0, 0, 360, 256);
}
StructureVariants.register = function(_path, _x, _y, _width, _height) {
	this.registry.push(new StructureVariant(_path, _x, _y, _width, _height));
}
StructureVariants.getRandom = function() {
	return this.registry[Math.round(Math.random()*(this.registry.length-1))];
}