function ParticleEmitter(_particle, _location) {
	this.particle = _particle;
	this.origin = _location ? _location : new Vector2();
	this.plane = new PlaneParticles(this.particle, this.origin);
}
ParticleEmitter.prototype.emit = function(_offset) {
	this.plane.addParticle(this.particle.spawn(_offset));
};
ParticleEmitter.prototype.update = function() {
	for(let i = this.plane.particles.length-1; i >= 0; i--) {
		var data = this.plane.particles[i];
		this.particle.update(data);
		data.life-=Time.delta;
		if(data.life <= 0)
			this.plane.particles.splice(i, 1);
	}
};
ParticleEmitter.prototype.draw = function(_stage) {
	_stage.addPlane(this.plane);
};