/*
This class is a variation of the Plane class,
which then can be displayed on a stage.
*/

function PlaneParticles(_particle, _location) {
	StagePlane.call(this, _location);
	this.particles = [];
	this.particle = _particle;
}
PlaneParticles.prototype = Object.create(StagePlane.prototype);
PlaneParticles.prototype.addParticle = function(_particle) {
	this.particles.push(_particle);
};
PlaneParticles.prototype.draw = function() {
	//ctx.drawImage(this.image, this.textureCoords.x, this.textureCoords.y, this.width, this.height, Math.floor(this.location.x), Math.floor(this.location.y+this.yOffset), this.width, this.height);
	this.particle.preDraw();
	for(let i = 0; i < this.particles.length; i++) {
		let data = this.particles[i];
		ctx.save();
			ctx.translate(Math.floor(data.location.x), Math.floor(data.location.y));
			this.particle.draw(data);
		ctx.restore();
	}
}