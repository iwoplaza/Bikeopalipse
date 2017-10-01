function PowerupEDrink() {
	Powerup.call(this);
	this.animSpin = 0;
    this.name = "EDrink";
    this.hudTextureCoords = new Vector2(32, 0);
}
PowerupEDrink.prototype = Object.create(Powerup.prototype);
Powerups.register(PowerupEDrink);

PowerupEDrink.prototype.drawPlayerOverlay = function(_stage) {
	this.animSpin = (this.animSpin+15*Time.delta)%4;
	if(this.lifetime > 1 || this.blink <= 0.5)
		ctx.drawImage(Resources.images['res/img/shield.png'], Math.floor(this.animSpin)*64, 0, 64, 64, -32, -48, 64, 64);
		ctx.drawImage(Resources.images['res/img/magnet.png'], Math.floor(this.animSpin)*64, 0, 64, 64, -32, -48, 64, 64);
}

PowerupEDrink.prototype.update = function(){
    Powerup.prototype.update.call(this);
    if(this.lifetime <= 1) {
		World.getDriveSpeed = function(){
            return 100;
        }
	}
}

PowerupEDrink.prototype.onTrip = function(_obstacle) {
	_obstacle.dead = true;
	World.spawnExplosion(_obstacle.location.add(0, 0));
	return true;
}
PowerupEDrink.prototype.onObtained = function() {
	Powerup.prototype.onObtained.call(this);
    World.getDriveSpeed = function(){
        return 200;
    }
}