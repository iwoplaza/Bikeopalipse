function ScreenGame(_gamemode) {
    this.isGameOver = false;
	this.score = 0;
    this.scoreInterval = 0;
	this.distance = 0;
	this.imageGameOver = Resources.images['res/img/gameover.png'];
    this.countImage = Resources.images['res/img/321go.png'];
	this.continueBlink = 0;
	this.extraShake = 0;
	this.gamemode = _gamemode;
}

ScreenGame.prototype.addScore = function(e){
    this.score+=e;
}

ScreenGame.prototype.init = function() {
    this.startGame();
	AudioManager.playMusic('res/sfx/Apoca.ogg', 0.3);
    this.readyTimer = 3;
}

ScreenGame.prototype.update = function() {
    if (this.readyTimer<=0) World.update();
    if (this.readyTimer>-1) this.readyTimer-=Time.delta;
	if(!this.isGameOver) {
		this.distance += World.getDriveSpeed()*Time.delta;
        this.distanceToScore();
		this.extraShake = (this.extraShake+7*Time.delta)%1;
	}else{
		this.continueBlink = (this.continueBlink+1*Time.delta)%1;
	}
}

ScreenGame.prototype.distanceToScore = function(){
    this.scoreInterval += World.getDriveSpeed()*Time.delta;
    while (this.scoreInterval>200){
        this.addScore(1);
        this.scoreInterval-=200;
    }
}

ScreenGame.prototype.draw = function() {
    ctx.fillStyle = "#ffae3f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
	ctx.save();
	ctx.translate(0, -HUD.barHeight*Camera.scale);
    World.draw();
	ctx.restore();
	
	var screenWidth = ScreenHandler.getWidth();
	var screenHeight = ScreenHandler.getHeight()
	
	if(!this.isGameOver) {
		ctx.save();
			ctx.scale(Camera.scale, Camera.scale);
			if(Player.player.usingAbility) {
				shakeX = Math.sin(this.extraShake*Math.PI*2);
				shakeY = Math.cos(this.extraShake*Math.PI*4);
				ctx.drawImage(Resources.images['res/img/extra_salary.png'], 0, 0, 175, 43, screenWidth/2-174/2+shakeX, 60+shakeY, 175, 43);
			}
		ctx.restore();
	}else{
		ctx.save();
			ctx.scale(Camera.scale, Camera.scale);
			ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
			ctx.fillRect(0, 0, screenWidth, screenHeight);
			ctx.drawImage(this.imageGameOver, screenWidth/2-256, 60);
			Fonts.regular.setAlignment("left");
			Fonts.regular.drawText("better luck next time", screenWidth/2-4, screenHeight/2);
			ctx.fillStyle = "#fff";
			ctx.fillRect(screenWidth/2-152, screenHeight/2+4, 144, 2);

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
    ctx.save();
    ctx.scale(2,2);
    if (this.readyTimer>-1) ctx.drawImage(this.countImage, 0, Math.floor(Math.min(3,3-this.readyTimer))*47, 80, 47, canvas.width/4-40, 50, 80, 47);
    ctx.restore();
}

ScreenGame.prototype.keyDown = function(e) {
	if(this.isGameOver) {
		if(e.keyCode == 32) {
			ScreenHandler.open(new ScreenLobby());
		}
	}else{
		Player.player.keyDown(e);
	}
}

ScreenGame.prototype.keyUp = function(e) {
    Player.player.keyUp(e);
}

ScreenGame.prototype.startGame = function(e) {
	Player.player = new this.character();
	World.init();
	Powerups.reset();
	this.isGameOver = false;
	this.score = 0;
	this.distance = 0;
	AudioManager.playSFX('res/sfx/Go.ogg', 0.7);
}

ScreenGame.prototype.gameOver = function(e) {
	this.isGameOver = true;
	AudioManager.playSFX('res/sfx/Hurt.ogg');
	Stats.setHighscore(this.score);
	Stats.updateCoins();
}