function Coin(_location) {
	this.location = _location ? _location : new Vector2(0, 0);
	this.dead = false;
	this.collected = false;
	
	this.animSpin = 0;
	this.animSpinSpeed = 15;
	this.animCollection = 0;
	this.animBob = 0;
	this.sprite = new Sprite(Coins.image, null, null, 16, 16, 0);
}

Coin.prototype.collisionBounds = new Bounds(-10, -10, 10, 10);

Coin.prototype.update = function() {
	this.animSpin = (this.animSpin+this.animSpinSpeed*Time.delta)%6;
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

Coin.prototype.draw = function(_stage) {
	this.sprite.moveTo(this.location.add(-8, 0));
	this.sprite.yOffset = -8;
	
	if(this.collected) {
		this.sprite.textureCoords = new Vector2(Math.floor(this.animCollection)*16, 16);
	}
	else{
		this.sprite.yOffset = -8 - Math.abs(Math.sin(this.animBob*Math.PI)*2);
		this.sprite.textureCoords = new Vector2(Math.floor(this.animSpin)*16, 0);
	}
	
	_stage.addSprite(this.sprite);
}

Coin.prototype.collect = function() {
	if(this.collected) return 0;
	this.collected = true;
	this.animCollection = 0;
	AudioManager.playSFX('res/sfx/Coin.ogg');
	
	Player.player.fillUpAbility(0.01);
	
	return 1;
}

Coin.prototype.collidesWith = function(bounds) {
	return this.collisionBounds.offset(this.location).overlaps(bounds);
}

Coins = {};
Coins.init = function() {
	this.image = Resources.images['res/img/coin.png'];
}