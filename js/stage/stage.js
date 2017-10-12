function Stage() {
	this.planes = [];
}

Stage.prototype.clear = function() {
	this.planes = [];
}

Stage.prototype.addPlane = function(_sprite) {
	//Example: [5, 4, 3, 2, 0]
	
	var i = 0;
	for(;i < this.planes.length; i++) {
		if(this.planes[i].location.y < _sprite.location.y)
			break;
	}
	this.planes.splice(i, 0, _sprite);
}

Stage.prototype.draw = function() {
	for(var i = this.planes.length-1; i >= 0; i--) {
		this.planes[i].draw();
	}
}