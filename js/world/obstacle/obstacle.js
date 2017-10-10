Obstacle = {
    registry: [],
	COLLISION_FATAL: 1,
	COLLISION_TRIP: 2
};

Obstacle.init = function() {
	this.image = Resources.images['res/img/world/obstacles.png'];
}

Obstacle.generate = function() {
    var index = Math.round(Math.random()*(Obstacle.registry.length-1));
    return new this.registry[index]();
}

Obstacle.register = function(_obstacle) {
    this.registry.push(_obstacle);
}