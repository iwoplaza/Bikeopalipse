function ScreenLobby() {
	this.bodyColor = "#2c2c2c";
	
	this.characterSelect = new CharacterSelect(new Vector2(0, 0), this.bodyColor);
	this.characterSelect.addOption(new CharacterOption("vance spark", 0, 0));
	this.characterSelect.addOption(new CharacterOption("christopher", 0, 0));
	
	this.select = new Select(new Vector2(ScreenHandler.getWidth()/2, 40));
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
	
	ctx.restore();
}

ScreenLobby.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
    if(keyCode == 32) {
		if(this.select.selectedIndex == 0) {
			var option = this.characterSelect.confirm();
			option.flash();
			this.flash();
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
	AudioManager.stopAndPlay('res/sfx/Start.ogg');
}

ScreenLobby.prototype.keyUp = function(e) {
    
}