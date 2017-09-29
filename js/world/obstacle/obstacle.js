Obstacle = {
    registry: [],
};

Obstacle.generate = function() {
    var index = Math.round(Math.random()*(Obstacle.registry.length-1));
    return new this.registry[index]();
}

Obstacle.register = function(_obstacle) {
    this.registry.push(_obstacle);
}