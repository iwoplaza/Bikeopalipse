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
		if(this.sprites[i].location.y < _sprite.location.y)
			break;
	}
	this.sprites.splice(i, 0, _sprite);
}

Stage.prototype.draw = function() {
	for(var i = this.sprites.length-1; i >= 0; i--) {
		this.sprites[i].draw();
	}
}