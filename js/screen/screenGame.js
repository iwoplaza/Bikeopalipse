function ScreenGame() {
    this.isGameOver = false;
	this.score = 0;
	this.distance = 0;
}

ScreenGame.prototype.init = function() {
	Stats.fetch();
    this.startGame();
}

ScreenGame.prototype.update = function() {
    World.update();
	if(!this.isGameOver) {
		this.distance += World.getDriveSpeed()*Time.delta;
		this.score = Math.floor(this.distance/200);
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
		ctx.fillStyle = "#fff";
		ctx.font = "60px Arial";
		ctx.textAlign = "center";
		ctx.fillText("Game Over", canvas.width/2, 160);
		
		ctx.fillText("Score: " + this.score, canvas.width/2, 100);
		ctx.fillText("HighScore: " + Stats.highScore, canvas.width/2, 200);
	}
	
	HUD.draw();
}

ScreenGame.prototype.keyDown = function(e) {
    Player.player.keyDown(e);
	
	if(this.gameOver) {
		if(e.keyCode == 32) {
			this.startGame();
		}
	}
}

ScreenGame.prototype.keyUp = function(e) {
    Player.player.keyUp(e);
}

ScreenGame.prototype.startGame = function(e) {
	Player.player = new Player();
	World.init();
	this.isGameOver = false;
	this.score = 0;
	this.distance = 0;
	AudioManager.play('res/sfx/ReadyGo.ogg', 0.7);
	AudioManager.playLoop('res/sfx/Apoca.ogg', 0.1);
}

ScreenGame.prototype.gameOver = function(e) {
	this.isGameOver = true;
	AudioManager.play('res/sfx/Hurt.ogg');
	Stats.setHighscore(this.score);
	Stats.updateCoins();
}