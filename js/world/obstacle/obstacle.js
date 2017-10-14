Obstacle = {
    registry: [],
	COLLISION_FATAL: 1,
	COLLISION_TRIP: 2
};

Obstacle.init = function() {
	this.image = Resources.images['res/img/world/obstacles.png'];
	for(let i = 0; i < this.registry.length; i++) {
		if(this.registry[i].prototype.init)
			this.registry[i].prototype.init();
	}
}

Obstacle.generate = function() {
    var index = Math.round(Math.random()*(Obstacle.registry.length-1));
    return new this.registry[index]();
}

Obstacle.register = function(_obstacle) {
    this.registry.push(_obstacle);
}