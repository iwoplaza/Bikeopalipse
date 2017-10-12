function ParticleEmitter(_location) {
	this.origin = _location ? _location : new Vector2();
	this.plane = new PlaneParticles(this.origin);
}
ParticleEmitter.prototype.emit = function(_offset) {
	this.plane.addParticle(new ParticleData(_offset));
};