function PowerupItem(_location) {
	this.powerupIndex = Math.round(Math.random()*(Powerups.registry.length-1));
	this.location = _location ? _location : new Vector2(0, 0);
	this.dead = false;
	this.collected = false;

	this.sprite = new Sprite(Powerups.image, null, Powerups.registry[this.powerupIndex].hudTextureCoords.add(0, 16), 16, 16, 0);
	this.animCollection = 0;
	this.animBob = 0;
}

PowerupItem.prototype.collisionBounds = new Bounds(-10, -10, 10, 10);

PowerupItem.prototype.update = function() {
	this.animBob = (this.animBob+2*Time.delta)%1;
	
	if(this.collected) {
		if(this.animCollection < 5) {
			this.animCollection += (Time.delta*15);
		}

		if(this.animCollection >= 5) {
			this.dead = true;
			return;
		}
	}
	
	this.location.x -= World.getDriveSpeed()*Time.delta;
	if(this.location.x < -50) this.dead = true;
}

PowerupItem.prototype.draw = function(_stage) {
	this.sprite.moveTo(this.location.add(-8, 0));
	this.sprite.yOffset = -8;
	
	if(this.collected) {
		this.sprite.textureCoords = new Vector2(Math.floor(this.animCollection)*16, 16);
	}
	else{
		this.sprite.yOffset = -8 - Math.abs(Math.sin(this.animBob*Math.PI)*2);
	}
	
	_stage.addSprite(this.sprite);
}

PowerupItem.prototype.collect = function() {
	if(this.collected) return 0;
	this.collected = true;
	this.animCollection = 0;
	this.sprite.image = Coins.image;
	AudioManager.playSFX('res/sfx/Coin.ogg');
	return this.powerupIndex;
}

PowerupItem.prototype.collidesWith = function(bounds) {
	return this.collisionBounds.offset(this.location).overlaps(bounds);
}