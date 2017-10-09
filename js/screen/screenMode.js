function ScreenMode() {
	this.bodyColor = "#2c2c2c";
	
	this.select = new Select(new Vector2(ScreenHandler.getWidth()/2, 3));
	this.select.addOption(new Option('story mode'));
	this.select.addOption(new Option('endless mode'));
	this.select.addOption(new Option('tutorial'));
	this.select.addOption(new Option('back'));
	this.gameMode = 0;
}

ScreenMode.prototype.init = function() {
}

ScreenMode.prototype.update = function() {
	if(this.flashing) {
		if(this.flashProgress < 1) {
			this.flashProgress += Time.delta;
		}else{
			switch(this.gameMode) {
				case 0:
					ScreenHandler.open(new ScreenMap());
					break;
				case 1:
					ScreenHandler.open(new ScreenLobby());
					break;
				case 2:
					ScreenHandler.open(new ScreenGame(new GameModeTutorial()));
					break;
			}
		}
	}
}

ScreenMode.prototype.draw = function() {
    ctx.fillStyle = this.bodyColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	var screenWidth = ScreenHandler.getWidth();
	var screenHeight = ScreenHandler.getHeight();
	
	ctx.save();
	ctx.scale(Camera.scale, Camera.scale);
	this.select.draw();
	
	Fonts.regular.setAlignment("center");
	Fonts.regular.drawText("select a mode", screenWidth/2, 15);
	
	ctx.restore();
}

ScreenMode.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
    if(keyCode == 32 && !this.flashing) {
		var option = this.select.confirm();

		if(option.index >= 0 && option.index <= 2) { //Modes
			this.gameMode = option.index;
			option.flash();
			this.flash();
		}

		if(option.index == 3) { //Back
			ScreenHandler.open(new ScreenTitle());
			ScreenHandler.current.select.selectedIndex = 0;
		}
    }
	if(this.select.selectedIndex == 0) {
		if(keyCode == 65 || keyCode == 37)
			this.characterSelect.goLeft();
		if(keyCode == 68 || keyCode == 39)
			this.characterSelect.goRight();
	}
	
	if(keyCode == 87 || keyCode == 38)
		this.select.goUp();
	if(keyCode == 83 || keyCode == 40)
	   this.select.goDown();
}

ScreenMode.prototype.flash = function() {
	this.flashing = true;
	this.flashProgress = 0;
	AudioManager.playSFX('res/sfx/Start.ogg');
}

ScreenMode.prototype.chooseCharacter = function(_option) {
	var name = _option.label;
	
	var character = Characters.registry[name];
	
	if(!character) return;
	
	if(Stats.hasObtainedCharacter(name)) {
		Stats.currentCharacter = name;
		_option.flash();
		this.flash();
        return true;
	}else if(Stats.consumeCoins(character.prototype.price)){
		Stats.obtainCharacter(name);
		_option.state = true;
		AudioManager.playSFX('res/sfx/Explosion.ogg');
	}else{
		AudioManager.playSFX('res/sfx/Error.ogg');
        return false;
	}
}

ScreenMode.prototype.keyUp = function(e) {
    
}