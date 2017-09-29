Obstacle = {
    registry: [],
};

Obstacle.init = function() {
	this.image = Resources.images['res/img/obstacles.png'];
}

Obstacle.generate = function() {
    var index = Math.round(Math.random()*(Obstacle.registry.length-1));
    return new this.registry[index]();
}

Obstacle.register = function(_obstacle) {
    this.registry.push(_obstacle);
}