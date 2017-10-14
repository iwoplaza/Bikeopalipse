function Player() {
    this.location = new Vector2(60, -World.roadHeight/2);
    console.log("Init");
	this.velocity = new Vector2(0, 0);
	this.dragY = 700000;
	this.maxVelocityY = 120;
    this.up = this.down = this.left = this.right = false;
    this.collisionBounds = new Bounds(-15, -3, 15, 0);
	this.tripCooldown = 0;
	this.powerup = null;
	this.usingAbility = false;
	this.abilityFillup = 0;
	
	this.stunnedBlink = 0;
	this.animForward = 0;
	
	this.meshStunned = Draw.rectangle(-19, -42, 0, 38, 7);
}

Player.prototype.update = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	this.velocity.x = 0;
	if(this.tripCooldown > 0) {
		this.tripCooldown-=Time.delta;
		this.stunnedBlink = (this.stunnedBlink+5*Time.delta)%1;
	}
	
	if(!gameScreen.isGameOver) {
		if(this.tripCooldown <= 0) {
			if(this.left) this.goLeft();
			if(this.right) this.goRight();
		}else{
			this.velocity.x = -60;
		}
		if(this.up) this.goUp();
		else if(this.down) this.goDown();
		else this.applyDrag();
		
        for(var i in World.obstacles) {
            var obstacle = World.obstacles[i];
            var collision = obstacle.collidesWith(this.collisionBounds.offset(this.location));

            if(collision == Obstacle.COLLISION_FATAL){
                this.dieFromObstacle(obstacle);
            }else if(collision == Obstacle.COLLISION_TRIP)
                this.trip(obstacle);
        }
		
		for(var i in World.coins) {
			var coin = World.coins[i];
			var collision = coin.collidesWith(this.collisionBounds.offset(this.location));

			if(collision) {
                let value = coin.collect();
				Stats.coins+=value;
                GameModes.current.onCoinCollected(this, value);
			}
		}
		
		for(var i in World.powerups) {
			var powerupItem = World.powerups[i];
			var collision = powerupItem.collidesWith(this.collisionBounds.offset(this.location));

			if(collision && !powerupItem.collected) {
				this.getPowerup(powerupItem.collect());
			}
		}
	}else{
		this.velocity = new Vector2();
	}
    
	if(this.powerup != null) {
		this.powerup.update();
		if(this.powerup.dead) {
			this.powerup.enabled = false;
			this.powerup = null;
		}
	}
	
	if(this.usingAbility) {
		if(this.abilityFillup > 0) {
			this.performAbility();
			this.abilityFillup -= 0.008;
		}else{
			this.disableAbility();
		}
	}
	
	this.location = this.location.addVec(this.velocity.multiply(0.015));
	
    if(this.location.x < 20)
		GameModes.current.onDeath(DeathCause.CHASERS);
    if(this.location.y < -World.roadHeight)
        this.location.y = -World.roadHeight;
    if(this.location.y > 0)
        this.location.y = 0;
}

Player.prototype.draw = function(_stage) {
	ctx.save();
	ctx.translate(Math.floor(this.location.x), Math.floor(this.location.y));
    /*ctx.fillStyle = "#ff1c1c";
    ctx.fillRect(this.collisionBounds.minX, this.collisionBounds.minY, this.collisionBounds.maxX-this.collisionBounds.minX, this.collisionBounds.maxY-this.collisionBounds.minY);*/
    
	
	if(this.powerup != null)
		this.powerup.drawPlayerOverlay();
	
	if(this.tripCooldown > 0 && this.stunnedBlink < 0.5)
		ctx.drawImage(this.meshStunned, Resources.images['res/img/ui/icons.png'], 0, 28, 38, 7);
	
	ctx.restore();
}

Player.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
    if(keyCode == 65 || keyCode == 37)
        this.left = true;
    if(keyCode == 68 || keyCode == 39)
        this.right = true;
    if(keyCode == 87 || keyCode == 38)
        this.up = true;
    if(keyCode == 83 || keyCode == 40)
        this.down = true;
	
	if(keyCode == 32 && this.canUseAbility()) {
		this.useAbility();
		console.log("ABILITY");
	}
 }

Player.prototype.keyUp = function(e) {
    var keyCode = e.keyCode;
    if(keyCode == 65 || keyCode == 37)
        this.left = false;
    if(keyCode == 68 || keyCode == 39)
        this.right = false;
    if(keyCode == 87 || keyCode == 38)
        this.up = false;
    if(keyCode == 83 || keyCode == 40)
        this.down = false;
}

Player.prototype.goLeft = function() {
    this.velocity.x = -150;
}

Player.prototype.goRight = function() {
    this.velocity.x = 90;
}

Player.prototype.goUp = function() {
    this.velocity.y = Math.max(this.velocity.y-25, -this.maxVelocityY);
}

Player.prototype.goDown = function() {
    this.velocity.y = Math.min(this.velocity.y+25, this.maxVelocityY);
}

Player.prototype.trip = function(_obstacle) {
	if(this.tripCooldown > 0) return;
	var flag = false;
	if(this.powerup != null)
		flag = this.powerup.onTrip(_obstacle);
	
	if(flag) return;
	this.tripCooldown = 0.6;
	AudioManager.playSFX('res/sfx/Hurt.ogg');
}


Player.prototype.dieFromObstacle = function(_obstacle) {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	var flag = false;
	if(this.powerup != null)
		flag = this.powerup.onDieFromObstacle(_obstacle);
	
	if(flag) return;
	GameModes.current.onDeath(_obstacle.getDeathCause());
}

Player.prototype.getPowerup = function(_index) {
	var powerup = Powerups.registry[_index];
	this.powerup = powerup;
	this.powerup.onObtained();
	Powerups.selectPowerup(powerup.index);
	AudioManager.playSFX('res/sfx/Powerup.ogg', 0.5);
}

Player.prototype.useAbility = function() {
	this.usingAbility = true;
	AudioManager.playSFX('res/sfx/Powerup.ogg', 0.5);
}

Player.prototype.canUseAbility = function() {
	return this.abilityFillup >= 1 && !this.usingAbility;
}

Player.prototype.fillUpAbility = function(a) {
	if(this.usingAbility) return;
	
	this.abilityFillup += a;
	if(this.abilityFillup > 1)
		this.abilityFillup = 1;
}

Player.prototype.performAbility = function() {
	
}

Player.prototype.disableAbility = function() {
	this.usingAbility = false;
}

Player.prototype.applyDrag = function() {
	if(this.velocity.y > 0) {
		this.velocity.y -= this.dragY*Time.delta;
		if(this.velocity.y < 0) this.velocity.y = 0;
	}else if(this.velocity.y < 0) {
		this.velocity.y += this.dragY*Time.delta;
		if(this.velocity.y > 0) this.velocity.y = 0;
	}
}

Player.prototype.getSpeedMultiplier = function() {
	if(this.powerup != null)
		return this.powerup.getSpeedMultiplier();
	return 1;
}

Player.prototype.getOffsetCollisionBounds = function() {
    return this.collisionBounds.offset(this.location);
}