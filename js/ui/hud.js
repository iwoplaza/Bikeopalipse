var HUD = {
	barHeight: 20,
	
	specialBarShake: 0,
	specialBarFlash: 0,
	
	scoreTimer: 0,
	scoreAdd: 0,
};

HUD.init = function() {
	this.image = Resources.images['res/img/ui/icons.png'];
	
	this.meshBar = Draw.rectangle_solid(0, -this.barHeight, 0, ScreenHandler.getWidth(), this.barHeight, [0, 0, 0, 1]);
	this.meshCoin = Draw.rectangle(0, -17, 0, 16, 16);
	this.meshSpecialBar = Draw.rectangle(ScreenHandler.getWidth()-103, -17, 0, 100, 14);
	this.meshSpecialBarFill = Draw.bar_horizontal(94, 10);
};

HUD.update = function() {
	if(this.scoreTimer > 0)
		this.scoreTimer -= Time.delta;
};

HUD.onScore = function(_score, source) {
	if(source == ScoreSource.DISTANCE) return;
	this.scoreAdd = _score;
	this.scoreTimer = 1;
}

HUD.draw = function() {
	Fonts.regular.resetStyle();
	Fonts.slim.resetStyle();
	
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	this.specialBarShake = (this.specialBarShake+7*Time.delta)%1;
	this.specialBarFlash = (this.specialBarShake+4*Time.delta)%1;
	
	var screenWidth = ScreenHandler.getWidth();
	
	ctx.save();
		ctx.translate(0, canvas.height);
		ctx.scale(Camera.scale, Camera.scale);
		ctx.drawRect(this.meshBar);
		
		let offset = 4;
		Fonts.regular.setAlignment("left");
		let scoreText = "score: "+GameModes.current.getScore();
		Fonts.regular.drawText(scoreText, offset, -14);
		offset += 2+Fonts.regular.getTextWidth(scoreText);
	
		if(this.scoreTimer > 0) {
			var alpha = this.scoreTimer;
			var add = this.scoreTimer*this.scoreTimer*this.scoreTimer;
			Fonts.slim.setColor([0.4+add*0.6, 0.6+add*0.6, 1, alpha*2]);
			Fonts.slim.drawText("+"+this.scoreAdd, offset, -11-((1-this.scoreTimer*this.scoreTimer)*5));
		}
		offset += 10;
		
		ctx.save();
			ctx.translate(offset+10, 0);
			ctx.drawImage(this.meshCoin, Coins.image, 0, 0, 16, 16);
		ctx.restore();
		Fonts.regular.drawText(""+Stats.coins, offset+30, -14);
	
		ctx.save();
			ctx.translate(screenWidth-Powerups.registry.length*16-107, 0);
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
		let shakeX = 0;
		let shakeY = 0;
		if(Player.player.usingAbility) {
			shakeX = Math.sin(this.specialBarShake*Math.PI*2);
			shakeY = Math.cos(this.specialBarShake*Math.PI*4);
		}

		ctx.translate(shakeX, shakeY);
		ctx.drawImage(this.meshSpecialBar, this.image, 0, 36, 100, 14);
		var abilityFillup = Player.player.abilityFillup;
		
	
		if(Player.player.abilityFillup >= 1) {
			if(this.specialBarFlash < 0.5) {
				Fonts.regular.setAlignment("center");
				Fonts.regular.setColor([1, 1, 1, 1]);
				Fonts.regular.drawText("press space", screenWidth-52, -15);
			}
		}else{
			ctx.save();
				ctx.translate(ScreenHandler.getWidth()-101, -15);
				ctx.drawBarHorizontal(this.meshSpecialBarFill, this.image, 0, 50, 94, 10, abilityFillup);
			ctx.restore();
		}
	ctx.restore();
};