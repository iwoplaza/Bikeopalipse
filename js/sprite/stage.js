function Stage() {
	this.sprites = [];
}

Stage.prototype.clear = function() {
	this.sprites = [];
}

Stage.prototype.addSprite = function(_sprite) {
	//Example: [5, 4, 3, 2, 0]
	
	var i = 0;
	for(;i < this.sprites.length; i++) {
		if(this.sprites[i].distance < _sprite.distance)
			break;
	}
	this.sprites.splice(i, 0, _sprite);
}

Stage.prototype.draw = function() {
	for(var i = 0; i < this.sprites.length; i++) {
		this.sprites[i];
	}
}