var World = {
    roadHeight: 105,
};

World.init = function() {
    this.obstacles = [];
    this.obstacleDelay = 10;
	this.coins = [];
	this.coinSpawnCooldown = 5;
	this.powerups = [];
	this.powerupSpawnCooldown = 100;
	this.explosions = [];
	this.backgroundImage = Resources.images['res/img/background_dawn.png'];
	this.road = new Road();
	this.stage = new Stage();
    //this.middleGround = new middleGround();
    this.structure = new Structure();
	this.skyline = new Skyline(Resources.images['res/img/skyline_dawn.png']);
}

World.update = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
    Player.player.update();
	
	if(!gameScreen.isGameOver) {
		if(this.obstacleDelay > 0) {
			this.obstacleDelay -= this.getDriveSpeed()*Time.delta;
		} else {
			var obstacle = Obstacle.generate();
			this.obstacles.push(obstacle);
			this.obstacleDelay = obstacle.getGap();
		}

		if(this.coinSpawnCooldown > 0) {
			this.coinSpawnCooldown -= this.getDriveSpeed()*Time.delta;
		} else {
			this.spawnCoin();
		}
		
		if(this.powerupSpawnCooldown > 0) {
			this.powerupSpawnCooldown -= this.getDriveSpeed()*Time.delta;
		} else {
			this.spawnPowerup();
		}
		
		for(var i = this.obstacles.length-1; i >= 0; i--) {
			this.obstacles[i].update();
			if(this.obstacles[i].dead)
				this.obstacles.splice(i, 1);
		}
		
		for(var i = this.coins.length-1; i >= 0; i--) {
			this.coins[i].update();
			if(this.coins[i].dead)
				this.coins.splice(i, 1);
		}
		
		for(var i = this.powerups.length-1; i >= 0; i--) {
			this.powerups[i].update();
			if(this.powerups[i].dead)
				this.powerups.splice(i, 1);
		}
		
		for(var i = this.explosions.length-1; i >= 0; i--) {
			this.explosions[i].update();
			if(this.explosions[i].dead)
				this.explosions.splice(i, 1);
		}
		
		this.skyline.update();
		this.road.update();
        this.structure.update();
	}
}

World.draw = function() {
    ctx.save();
    ctx.translate(0, canvas.height);
	ctx.scale(Camera.scale, Camera.scale);
	ctx.drawImage(this.backgroundImage, -56, -300, 512, 512);
	
	this.skyline.draw();
    //this.middleGround.draw();
    this.structure.draw();
	this.road.draw();
	
	this.stage.clear();
    
    for(var key in this.obstacles) {
        this.obstacles[key].draw(this.stage);
    }
	for(var key in this.coins) {
        this.coins[key].draw(this.stage);
    }
	for(var key in this.powerups) {
        this.powerups[key].draw(this.stage);
    }
	for(var key in this.explosions) {
        this.explosions[key].draw(this.stage);
    }
	Player.player.draw(this.stage);
	
	this.stage.draw();
    
    ctx.restore();
}

World.spawnCoin = function() {
	this.coins.push(new Coin(new Vector2(400, -20+Math.floor(Math.random()*-(this.roadHeight-60)))));
	this.coinSpawnCooldown = 85;
}

World.spawnPowerup = function() {
	this.powerups.push(new PowerupItem(new Vector2(400, -20+Math.floor(Math.random()*-(this.roadHeight-60)))));
	this.powerupSpawnCooldown = 500;
}

World.spawnExplosion = function(_location) {
	this.explosions.push(new Explosion(_location));
	AudioManager.playSFX('res/sfx/Explosion.ogg');
}

World.getDriveSpeed = function() {
    return 100*Player.player.getSpeedMultiplier();
}