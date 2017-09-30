function PowerupShield() {
	Powerup.call(this);
}
PowerupShield.prototype = Object.create(Powerup.prototype);
Powerups.register(PowerupShield);