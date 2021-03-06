function GameModeEndless(_character) {
    GameMode.call(this);
}
GameModeEndless.prototype = Object.create(GameMode.prototype);

GameModeEndless.prototype.start = function() {
	GameMode.prototype.start.call(this);
	
    this.obstacleDelay = 260;
	this.coinSpawnCooldown = 260;
	this.powerupSpawnCooldown = 600;
	World.spawnZombies(10);
	this.score = 0;
    this.scoreInterval = 0;
	this.distance = 0;
	
	var screenWidth = ScreenHandler.getWidth();
	var screenHeight = ScreenHandler.getHeight();
	this.imageGameOver = Resources.images['res/img/ui/gameover.png'];
    this.imageCount = Resources.images['res/img/ui/321go.png'];
	this.imageExtra = Resources.images['res/img/ui/extra_salary.png'];
	this.meshCount = Draw.rectangle(screenWidth/2-40, 50, 0, 80, 47);
	this.meshExtra = Draw.rectangle((screenWidth-174)/2, 60, 0, 175, 43);
	this.meshDarkenOverlay = Draw.rectangle_solid(0, 0, 0, screenWidth, ScreenHandler.getHeight(), [0, 0, 0, 0.8]);
	this.meshGameOver = Draw.rectangle(screenWidth/2-256, 60, 0, 512, 128);
	this.continueBlink = 0;
	this.extraShake = 0;
	this.readyTimer = 3;
};

GameModeEndless.prototype.update = function() {
	GameMode.prototype.update.call(this);
	
	if(!this.isGameOver()) {
		World.update();
		
		this.distance += World.getDriveSpeed()*Time.delta;
        this.handleDistanceScoring();
		this.extraShake = (this.extraShake+7*Time.delta)%1;
		
		if (this.readyTimer > -1) this.readyTimer -= Time.delta;
	
		this.obstacleDelay -= World.getDriveSpeed()*Time.delta;
		if(this.obstacleDelay <= 0) this.spawnObstacle();

		this.coinSpawnCooldown -= World.getDriveSpeed()*Time.delta;
		if(this.coinSpawnCooldown <= 0) this.spawnCoin();

		this.powerupSpawnCooldown -= World.getDriveSpeed()*Time.delta;
		if(this.powerupSpawnCooldown <= 0) this.spawnPowerup();
	}else{
		this.continueBlink = (this.continueBlink+1*Time.delta)%1;
	}
	
	HUD.update();
}

GameModeEndless.prototype.draw = function() {
	GameMode.prototype.draw.call(this);
	
	var screenWidth = ScreenHandler.getWidth();
	var screenHeight = ScreenHandler.getHeight();
	
	ctx.save();
		ctx.translate(0, -HUD.barHeight*Camera.scale);
		World.draw();
	ctx.restore();
	
	if(!this.isGameOver()) {
		ctx.save();
			ctx.scale(Camera.scale, Camera.scale);
			if(Player.player.usingAbility) {
				let shakeX = Math.sin(this.extraShake*Math.PI*2);
				let shakeY = Math.cos(this.extraShake*Math.PI*4);
				ctx.translate(shakeX, shakeY);
				ctx.drawImage(this.meshExtra, this.imageExtra, 0, 0, 175, 43);
			}
		
			if (this.readyTimer>-1)
				ctx.drawImage(this.meshCount, this.imageCount, 0, Math.floor(Math.min(3,3-this.readyTimer))*47, 80, 47);
		ctx.restore();
	}else{
		ctx.save();
			ctx.scale(Camera.scale, Camera.scale);
			ctx.drawSolid(this.meshDarkenOverlay);
			ctx.drawImage(this.meshGameOver, this.imageGameOver);
			Fonts.regular.setAlignment("left");
			Fonts.regular.drawText("better luck next time", screenWidth/2-4, screenHeight/2);

			Fonts.regular.setAlignment("right");
			Fonts.regular.drawText("highscore: ", screenWidth/2, screenHeight/2+20);
			Fonts.regular.drawText("score: ", screenWidth/2, screenHeight/2+35);
			Fonts.regular.setAlignment("left");
			Fonts.regular.drawText(""+Stats.highScore, screenWidth/2, screenHeight/2+20);
			Fonts.regular.drawText(""+this.score, screenWidth/2, screenHeight/2+35);
			Fonts.regular.setAlignment("center");
			if(this.continueBlink < 0.5)
				Fonts.regular.drawText("space to continue", screenWidth/2, screenHeight/2+70);
		ctx.restore();
	}
	
	HUD.draw();
}

GameModeEndless.prototype.spawnObstacle = function() {
	var obstacle = Obstacle.generate();
	obstacle.location.x += Math.floor(this.obstacleDelay);
	obstacle.location.x = Math.floor(obstacle.location.x)+World.interReminder;
	World.obstacles.push(obstacle);
	this.obstacleDelay += obstacle.getGap();
}

GameModeEndless.prototype.handleDistanceScoring = function(){
    this.scoreInterval += World.getDriveSpeed()*Time.delta;
    while (this.scoreInterval>100){
        this.addScore(1, ScoreSource.DISTANCE);
        this.scoreInterval-=100;
    }
}

GameModeEndless.prototype.spawnCoin = function() {
	World.spawnCoin(400+this.coinSpawnCooldown);
	if(Player.player.usingAbility && Player.player.name == CharacterVance.prototype.name) {
		this.coinSpawnCooldown += 10;
	}else{
		this.coinSpawnCooldown += 85;
	}
}

GameModeEndless.prototype.spawnPowerup = function() {
	World.spawnPowerup(400+this.powerupSpawnCooldown);
	this.powerupSpawnCooldown += 1500;
}

GameModeEndless.prototype.getDriveSpeed = function() {
	return Math.floor(Math.min(250,100+this.distance*0.008)*Player.player.getSpeedMultiplier());
};