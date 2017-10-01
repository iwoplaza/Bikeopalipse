function ScreenLobby() {
	this.bodyColor = "#2c2c2c";
	
	this.characterSelect = new CharacterSelect(new Vector2(0, 0), this.bodyColor);
	for(var key in Characters.registry) {
		var character = Characters.registry[key];
		var option = new CharacterOption(key, character.prototype.description, character.prototype.textureIndex, true);
		this.characterSelect.addOption(option);
		if(key == Stats.currentCharacter) {
			this.characterSelect.selectedIndex = this.characterSelect.options.length-1;
			this.characterSelect.smoothOffset = this.characterSelect.selectedIndex*85;
		}
	}
	
	this.select = new Select(new Vector2(ScreenHandler.getWidth()/2, 3));
	this.select.addOption(this.characterSelect);
	this.select.addOption(new Option('go'));
	this.select.addOption(new Option('back'));
}

ScreenLobby.prototype.init = function() {
}

ScreenLobby.prototype.update = function() {
	if(this.flashing) {
		if(this.flashProgress < 1) {
			this.flashProgress += Time.delta;
		}else{
			ScreenHandler.open(new ScreenGame());
		}
	}
}

ScreenLobby.prototype.draw = function() {
    ctx.fillStyle = this.bodyColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.save();
	ctx.scale(Camera.scale, Camera.scale);
	this.select.draw();
	
	Fonts.regular.setAlignment("center");
	Fonts.regular.drawText("select your hero", ScreenHandler.getWidth()/2, 15);
	
	Fonts.regular.setAlignment("center");
	Fonts.regular.drawText("highscore: "+Stats.highScore, ScreenHandler.getWidth()/2, ScreenHandler.getHeight()/2+135);
	
	ctx.restore();
}

ScreenLobby.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
    if(keyCode == 32 && !this.flashing) {
		if(this.select.selectedIndex == 0) {
			var option = this.characterSelect.confirm();
			option.flash();
			this.flash();
			Stats.currentCharacter = this.characterSelect.options[this.characterSelect.selectedIndex].label;
		}else{
			var option = this.select.confirm();
			
			if(option.index == 1) { //Back
				option.flash();
				this.flash();
			}
			
			if(option.index == 2) { //Back
				ScreenHandler.open(new ScreenTitle());
				ScreenHandler.current.select.selectedIndex = 0;
			}
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

ScreenLobby.prototype.flash = function() {
	this.flashing = true;
	this.flashProgress = 0;
	AudioManager.playSFX('res/sfx/Start.ogg');
}

ScreenLobby.prototype.chooseCharacter = function() {
	
}

ScreenLobby.prototype.keyUp = function(e) {
    
}