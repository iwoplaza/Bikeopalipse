function PowerupEDrink() {
	Powerup.call(this);
	this.animSpin = 0;
    this.name = "EDrink";
    this.hudTextureCoords = new Vector2(32, 0);
}
PowerupEDrink.prototype = Object.create(Powerup.prototype);
Powerups.register(PowerupEDrink);

PowerupEDrink.prototype.init = function() {
	this.meshEffect = Draw.rectangle(-32, -48, 0, 64, 64);
};
PowerupEDrink.prototype.drawPlayerOverlay = function(_stage) {
	this.animSpin = (this.animSpin+0.35)%4;
	if(this.lifetime > 1 || this.blink <= 0.5) {
		ctx.drawImage(this.meshEffect, Resources.images['res/img/world/shield.png'], Math.floor(this.animSpin)*64, 0, 64, 64);
		ctx.drawImage(this.meshEffect, Resources.images['res/img/world/magnet.png'], Math.floor(this.animSpin)*64, 0, 64, 64);
	}
};
PowerupEDrink.prototype.update = function(){
    Powerup.prototype.update.call(this);
	World.shoveOffZombies();
};
PowerupEDrink.prototype.onTrip = function(_obstacle) {
	_obstacle.dead = true;
	World.spawnExplosion(_obstacle.location.add(0, 0));
    GameModes.current.addScore(2);
	return true;
};
PowerupEDrink.prototype.onDieFromObstacle = function(_obstacle) {
	return true;
};
PowerupEDrink.prototype.onObtained = function() {
	Powerup.prototype.onObtained.call(this);
};
PowerupEDrink.prototype.getSpeedMultiplier = function() {
	if(this.lifetime < 1) {
		return 1+this.lifetime;
	}
	return 2;
};