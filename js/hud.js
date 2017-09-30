var HUD = {
	barHeight: 20,
	
	coinSpinAnim: 0
};

HUD.update = function() {
	this.coinSpinAnim = (this.coinSpinAnim+15*Time.delta)%6;
}

HUD.draw = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	ctx.save();
	ctx.translate(0, canvas.height);
	ctx.scale(Camera.scale, Camera.scale);
	ctx.fillStyle = "#000";
	ctx.fillRect(0, -this.barHeight, canvas.width, this.barHeight);
	
	ctx.fillStyle = "#fff";
	ctx.textAlign = "left";
	ctx.font = "20px Arial";
	//ctx.fillText("Coins"+Stats.coins, 0, this.barHeight-5);
	
	Fonts.regular.setAlignment("left");
	Fonts.regular.drawText("score: "+gameScreen.score, 4, -14);
	ctx.drawImage(Coins.image, 16*7, 0, 16, 16, 70, -17, 16, 16)
	Fonts.regular.drawText(""+Stats.coins, 85, -14);
	
	ctx.save();
	ctx.translate(120, 0);
	for(var i = 0; i < Powerups.registry.length; i++) {
		Powerups.registry[i].drawHUD();
	}
	ctx.restore();
	
	ctx.restore();
}