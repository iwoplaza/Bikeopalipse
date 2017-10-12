function ParticleFire(_location) {
	Particle.call(this, _location);
}
ParticleFire.prototype = Object.create(Particle.prototype);