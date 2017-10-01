var HUD = {
	barHeight: 20,
	
	specialBarShake: 0,
	specialBarFlash: 0,
};

HUD.update = function() {
}

HUD.draw = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	this.specialBarShake = (this.specialBarShake+7*Time.delta)%1;
	this.specialBarFlash = (this.specialBarShake+4*Time.delta)%1;
	
	var screenWidth = ScreenHandler.getWidth();
	
	ctx.save();
	ctx.translate(0, canvas.height);
	ctx.scale(Camera.scale, Camera.scale);
	ctx.fillStyle = "#000";
	ctx.fillRect(0, -this.barHeight, screenWidth, this.barHeight);
	
	ctx.fillStyle = "#fff";
	ctx.textAlign = "left";
	ctx.font = "20px Arial";
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
	
	if(!gameScreen.isGameOver)
		HUD.drawSpecialBar();
	
	ctx.restore();
}

HUD.drawSpecialBar = function() {
	var screenWidth = ScreenHandler.getWidth();
	
	ctx.save();
	var segments = 16;
	var segmentWidth = 4;
	var segmentHeight = 8;
	var padding = 2;
	var barWidth = (segments)*(padding+segmentWidth)+2+padding;
	var barHeight = segmentHeight+padding*2+2;
	var shakeX = 0;
	var shakeY = 0;
	var segmentColor = "#a36603";
	
	if(Player.player.abilityFillup >= 1 && this.specialBarFlash < 0.5) {
		segmentColor = "#fff";
		
		Fonts.regular.setAlignment("right");
		Fonts.regular.drawText("press space", screenWidth-barWidth-5, -14);
	}
	
	if(Player.player.usingAbility) {
		shakeX = Math.sin(this.specialBarShake*Math.PI*2);
		shakeY = Math.cos(this.specialBarShake*Math.PI*4);
		segmentColor = "#fff";
	}
	
	ctx.translate(screenWidth-barWidth-3+shakeX, -barHeight-3+shakeY);
	ctx.fillStyle = "#654600";
	ctx.fillRect(0, 0, barWidth, barHeight);
	ctx.fillStyle = "#000";
	ctx.fillRect(1, 1, barWidth-2, barHeight-2);
	ctx.fillStyle = segmentColor;
	var abilityFillup = Player.player.abilityFillup*segments;
	for(let i = 0; i < segments; i++) {
		if(i > abilityFillup) ctx.fillStyle = "#2a2a2a";
		ctx.fillRect(padding+1+i*(padding+segmentWidth), padding+1, segmentWidth, segmentHeight);
	}
	ctx.restore();
}