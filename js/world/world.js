var World = {
    roadHeight: 105,
};

World.init = function() {
	this.distance = 0;
	
    this.obstacles = [];
    this.obstacleDelay = 0;
	this.coins = [];
	this.coinSpawnCooldown = 5;
	this.powerups = [];
	this.powerupSpawnCooldown = 600;
	this.explosions = [];
	this.spawnZombies(10);
	this.backgroundImage = Resources.images['res/img/background_dawn.png'];
	this.road = new Road();
	this.stage = new Stage();
    this.middleGround = new middleGround();
    this.structure = new Structure();
	this.skyline = new Skyline(Resources.images['res/img/skyline_dawn.png']);
	
	this.stepProgress = 0;
	this.stepFrequency = 0.015;
}

World.step = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	if(!gameScreen.isGameOver && gameScreen.readyTimer <= 0) {
		Player.player.update();
		
		this.obstacleDelay -= this.getDriveSpeed();
		if(this.obstacleDelay <= 0) {
			var obstacle = Obstacle.generate();
			obstacle.location.x += this.obstacleDelay;
			this.obstacles.push(obstacle);
			this.obstacleDelay += obstacle.getGap();
		}

		this.coinSpawnCooldown -= this.getDriveSpeed();
		if(this.coinSpawnCooldown <= 0) this.spawnCoin();
		
		this.powerupSpawnCooldown -= this.getDriveSpeed();
		if(this.powerupSpawnCooldown <= 0) this.spawnPowerup();
		
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
		
		for(let i = 0; i < this.zombies.length; i++)
			this.zombies[i].update();
		
		this.skyline.update();
		this.road.update();
        this.structure.update();
        this.middleGround.update();
		
		this.distance += this.getDriveSpeed();
	}
}

World.update = function() {
	this.stepProgress += Time.delta;
	while(this.stepProgress > this.stepFrequency) {
		this.stepProgress -= this.stepFrequency;
		this.step();
	}
}

World.draw = function() {
    ctx.save();
    ctx.translate(0, canvas.height);
	ctx.scale(Camera.scale, Camera.scale);
	ctx.drawImage(this.backgroundImage, -56, -300, 512, 512);
	
	this.skyline.draw();
    this.middleGround.draw();
    this.structure.draw();
	this.road.draw();
	
	this.stage.clear();
    
    for(var key in this.obstacles)
        this.obstacles[key].draw(this.stage);
	for(var key in this.coins)
        this.coins[key].draw(this.stage);
	for(var key in this.powerups)
        this.powerups[key].draw(this.stage);
	for(var key in this.explosions)
        this.explosions[key].draw(this.stage);
	for(let i = 0; i < this.zombies.length; i++)
		this.zombies[i].draw(this.stage);
	
	Player.player.draw(this.stage);
	
	this.stage.draw();
    
    ctx.restore();
}

World.spawnCoin = function() {
	this.coins.push(new Coin(new Vector2(400+this.coinSpawnCooldown, -20+Math.floor(Math.random()*-(this.roadHeight-60)))));
	if(Player.player.usingAbility && Player.player.name == CharacterVance.prototype.name) {
		this.coinSpawnCooldown += 10;
	}else{
		this.coinSpawnCooldown += 85;
	}
}

World.spawnPowerup = function() {
	this.powerups.push(new PowerupItem(new Vector2(400+this.powerupSpawnCooldown, -20+Math.floor(Math.random()*-(this.roadHeight-60)))));
	this.powerupSpawnCooldown += 1500;
}

World.spawnExplosion = function(_location) {
	this.explosions.push(new Explosion(_location));
	AudioManager.playSFX('res/sfx/Explosion.ogg');
}

World.spawnZombies = function(_amount) {
	this.zombies = [];
	var min = 10;
	var max = this.roadHeight-10;
	for(let i = 0; i < _amount; i++) {
		var percent = i/(_amount-1);
		this.zombies.push(new Zombie(new Vector2(-20+Math.random()*30, -(min+percent*(max-min)))));
	}
}

World.getDriveSpeed = function() {
    return Math.min(3.5,1.5+this.distance*0.00008)*Player.player.getSpeedMultiplier();
}

World.shoveOffZombies = function() {
	for(let i = 0; i < this.zombies.length; i++)
		this.zombies[i].shoveOff();
}