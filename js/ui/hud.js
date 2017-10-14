var HUD = {
	barHeight: 20,
	
	specialBarShake: 0,
	specialBarFlash: 0,
};

HUD.init = function() {
	this.image = Resources.images['res/img/ui/icons.png'];
	
	this.meshBar = Draw.rectangle_solid(0, -this.barHeight, 0, ScreenHandler.getWidth(), this.barHeight, [0, 0, 0, 1]);
	this.meshCoin = Draw.rectangle(70, -17, 0, 16, 16);
	this.meshSpecialBar = Draw.rectangle(ScreenHandler.getWidth()-103, -17, 0, 100, 14);
};

HUD.update = function() {
};

HUD.draw = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	this.specialBarShake = (this.specialBarShake+7*Time.delta)%1;
	this.specialBarFlash = (this.specialBarShake+4*Time.delta)%1;
	
	var screenWidth = ScreenHandler.getWidth();
	
	ctx.save();
		ctx.translate(0, canvas.height);
		ctx.scale(Camera.scale, Camera.scale);
		ctx.drawRect(this.meshBar);

		Fonts.regular.setAlignment("left");
		Fonts.regular.drawText("score: "+GameModes.current.getScore(), 4, -14);
		ctx.drawImage(this.meshCoin, Coins.image, 16*7, 0, 16, 16)
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
};

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
	
	ctx.translate(shakeX, shakeY);
	ctx.drawImage(this.meshSpecialBar, this.image, 0, 36, 100, 14);
	/*ctx.fillStyle = "#000";
	ctx.fillRect(1, 1, barWidth-2, barHeight-2);
	ctx.fillStyle = segmentColor;
	var abilityFillup = Player.player.abilityFillup*segments;
	for(let i = 0; i < segments; i++) {
		if(i > abilityFillup) ctx.fillStyle = "#2a2a2a";
		ctx.fillRect(padding+1+i*(padding+segmentWidth), padding+1, segmentWidth, segmentHeight);
	}*/
	ctx.restore();
};