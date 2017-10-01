function ScreenGame(_character) {
    this.isGameOver = false;
	this.score = 0;
	this.distance = 0;
	this.imageGameOver = Resources.images['res/img/gameover.png'];
	this.continueBlink = 0;
	this.character = _character ? _character :
					(Characters.registry[Stats.currentCharacter] ? Characters.registry[Stats.currentCharacter] :
					 CharacterVance );
}

ScreenGame.prototype.init = function() {
	Stats.fetch();
    this.startGame();
	AudioManager.playMusic('res/sfx/Apoca.ogg', 0.3);
}

ScreenGame.prototype.update = function() {
    World.update();
	if(!this.isGameOver) {
		this.distance += World.getDriveSpeed()*Time.delta;
		this.score = Math.floor(this.distance/200);
	}else{
		this.continueBlink = (this.continueBlink+1*Time.delta)%1;
	}
}

ScreenGame.prototype.draw = function() {
    ctx.fillStyle = "#ffae3f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
	ctx.save();
	ctx.translate(0, -HUD.barHeight*Camera.scale);
    World.draw();
	ctx.restore();
	
	if(!this.isGameOver) {
	}else{
		ctx.save();
			ctx.scale(Camera.scale, Camera.scale);
			ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
			ctx.fillRect(0, 0, ScreenHandler.getWidth(), ScreenHandler.getHeight());
			ctx.drawImage(this.imageGameOver, ScreenHandler.getWidth()/2-256, 60);
			Fonts.regular.setAlignment("left");
			Fonts.regular.drawText("better luck next time", ScreenHandler.getWidth()/2-4, ScreenHandler.getHeight()/2);
			ctx.fillStyle = "#fff";
			ctx.fillRect(ScreenHandler.getWidth()/2-152, ScreenHandler.getHeight()/2+4, 144, 2);

			Fonts.regular.setAlignment("right");
			Fonts.regular.drawText("highscore: ", ScreenHandler.getWidth()/2, ScreenHandler.getHeight()/2+20);
			Fonts.regular.drawText("score: ", ScreenHandler.getWidth()/2, ScreenHandler.getHeight()/2+35);
			Fonts.regular.setAlignment("left");
			Fonts.regular.drawText(""+Stats.highScore, ScreenHandler.getWidth()/2, ScreenHandler.getHeight()/2+20);
			Fonts.regular.drawText(""+this.score, ScreenHandler.getWidth()/2, ScreenHandler.getHeight()/2+35);
			Fonts.regular.setAlignment("center");
			if(this.continueBlink < 0.5)
				Fonts.regular.drawText("space to continue", ScreenHandler.getWidth()/2, ScreenHandler.getHeight()/2+70);
		ctx.restore();
	}
	
	HUD.draw();
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
	AudioManager.playSFX('res/sfx/ReadyGo.ogg', 0.7);
}

ScreenGame.prototype.gameOver = function(e) {
	this.isGameOver = true;
	AudioManager.playSFX('res/sfx/Hurt.ogg');
	Stats.setHighscore(this.score);
	Stats.updateCoins();
}