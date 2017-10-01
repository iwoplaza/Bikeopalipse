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
	
	this.sprite = new Sprite(Resources.images['res/img/player.png'], null, new Vector2(0, 0), 32, 32, -32);
	this.animForward = 0;
}

Player.prototype.update = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	this.velocity.x = 0;
	if(this.tripCooldown > 0) {
		this.tripCooldown-=Time.delta;
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
                if (this.powerup!=undefined){
                    if (this.powerup.name!="EDrink") gameScreen.gameOver();
                }else gameScreen.gameOver();
            }else if(collision == Obstacle.COLLISION_TRIP)
                this.trip(obstacle);
        }
		
		for(var i in World.coins) {
			var coin = World.coins[i];
			var collision = coin.collidesWith(this.collisionBounds.offset(this.location));

			if(collision) {
                let value = coin.collect();
				Stats.coins+=value;
                ScreenHandler.current.addScore(value);
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
	
	this.location = this.location.addVec(this.velocity.multiply(Time.delta));
	
    if(this.location.x < 20)
        gameScreen.gameOver();
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
    
	this.sprite.moveTo(this.location.addVec(new Vector2(-16, 0)));
	this.sprite.textureCoords.x = Math.floor(this.animForward)*32;
	_stage.addSprite(this.sprite);
	
	if(this.powerup != null)
		this.powerup.drawPlayerOverlay();
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
    this.velocity.x = 110;
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

Player.prototype.getPowerup = function(_index) {
	var powerup = Powerups.registry[_index];
	this.powerup = powerup;
	this.powerup.onObtained();
	Powerups.selectPowerup(powerup.index);
	AudioManager.playSFX('res/sfx/Powerup.ogg', 0.5);
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