function PowerupShield() {
	Powerup.call(this);
	this.animSpin = 0;
    this.name = "Shield";
}
PowerupShield.prototype = Object.create(Powerup.prototype);
Powerups.register(PowerupShield);

PowerupShield.prototype.init = function() {
	this.meshEffect = Draw.rectangle(-32, -48, 0, 64, 64);
};
PowerupShield.prototype.drawPlayerOverlay = function(_stage) {
	this.animSpin = (this.animSpin+0.35)%4;
	if(this.lifetime > 1 || this.blink <= 0.5)
		ctx.drawImage(this.meshEffect, Resources.images['res/img/world/shield.png'], Math.floor(this.animSpin)*64, 0, 64, 64);
}

PowerupShield.prototype.onTrip = function(_obstacle) {
	_obstacle.dead = true;
	World.spawnExplosion(_obstacle.location.add(0, 0));
	GameModes.current.addScore(5, ScoreSource.EXPLOSION);
	return true;
}