ParticleFire = {};
Particle.register(ParticleFire);

ParticleFire.init = function() {
	this.image = Resources.images['res/img/world/particle/fire.png'];
	this.mesh = Draw.rectangle(-8, -8, 0, 16, 16);
};
ParticleFire.spawn = function(_location) {
	let data = new ParticleData(_location);
	data.life = 2;
	return data;
};
ParticleFire.update = function(_data) {
	
};
ParticleFire.preDraw = function() {
	Textures.bind(this.image);
};
ParticleFire.draw = function(_data) {
	ctx.drawImage(this.mesh, this.image, 0, 0, 16, 16);
};