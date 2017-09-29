function ScreenGame() {
    this.isGameOver = false;
	this.score = 0;
	this.distance = 0;
}

ScreenGame.prototype.init = function() {
    this.startGame();
}

ScreenGame.prototype.update = function() {
    World.update();
	this.distance += World.getDriveSpeed()*Time.delta;
	this.score = Math.floor(this.distance/200);
}

ScreenGame.prototype.draw = function() {
    ctx.fillStyle = "#ffae3f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
	ctx.save();
	ctx.translate(0, -HUD.barHeight);
    World.draw();
	ctx.restore();
	
	if(!this.isGameOver) {
		ctx.fillStyle = "#fff";
		ctx.font = "60px Arial";
		ctx.textAlign = "center";
		ctx.fillText("Score: " + this.score, canvas.width/2, 100);
	}else{
		ctx.fillStyle = "#fff";
		ctx.font = "60px Arial";
		ctx.textAlign = "center";
		ctx.fillText("Game Over", canvas.width/2, 160);
	}
	
	HUD.draw();
}

ScreenGame.prototype.keyDown = function(e) {
    Player.player.keyDown(e);
}

ScreenGame.prototype.keyUp = function(e) {
    Player.player.keyUp(e);
}

ScreenGame.prototype.startGame = function(e) {
	Player.player = new Player();
	World.init();
	this.score = 0;
	this.distance = 0;
}

ScreenGame.prototype.gameOver = function(e) {
	this.isGameOver = true;
}