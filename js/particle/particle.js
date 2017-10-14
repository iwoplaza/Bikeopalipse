Particle = {};
Particle.registry = [];
Particle.register = function(_particle) {
	this.registry.push(_particle);
};
Particle.init = function() {
	for(let i = 0; i < this.registry.length; i++)
		this.registry[i].init();
};