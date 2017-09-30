function PowerupShield() {
	Powerup.call(this);
	this.animSpin = 0;
}
PowerupShield.prototype = Object.create(Powerup.prototype);
Powerups.register(PowerupShield);

PowerupShield.prototype.drawPlayerOverlay = function(_stage) {
	this.animSpin = (this.animSpin+15*Time.delta)%4;
	if(this.lifetime > 1 || this.blink <= 0.5)
		ctx.drawImage(Resources.images['res/img/shield.png'], Math.floor(this.animSpin)*64, 0, 64, 64, -32, -48, 64, 64);
}