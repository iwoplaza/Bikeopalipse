/*
This class is a variation of the Plane class,
which then can be displayed on a stage.
*/

function PlaneParticles(_location) {
	Plane.call(this, _location);
	this.particles = [];
}
PlaneParticles.prototype = Object.create(Plane.prototype);
PlaneParticles.prototype.addParticle = function(_particle) {
	this.particles.push(_particle);
};