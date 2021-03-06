function ScreenOptions() {
	this.select = new Select(new Vector2(ScreenHandler.getWidth()/2, 30));
	this.select.addOption(new OptionToggle('music'));
	this.select.addOption(new OptionToggle('sfx'));
	this.select.addOption(new OptionSlider('volume'));
	this.select.addOption(new Option('reset game'));
	this.select.addOption(new Option('back'));
	
	this.select.options[0].value = Stats.music;
	this.select.options[1].value = Stats.sfx;
	this.select.options[2].value = Stats.globalVolume;
}

ScreenOptions.prototype.init = function() {
}

ScreenOptions.prototype.update = function() {
}

ScreenOptions.prototype.draw = function() {
    gl.clearColor(0.171875, 0.171875, 0.171875, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	ctx.resetToWorldMatrix();
	ctx.scale(Camera.scale, Camera.scale);
	
	this.select.draw();
}

ScreenOptions.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
    if(keyCode == 32) {
        var option = this.select.confirm();
		
		if(option.index == 0)
			if(option.value) AudioManager.enableMusic();
			else AudioManager.disableMusic();
		if(option.index == 1)
			Stats.setSFX(option.value);
		if(option.index == 3) { //Reset Game
            Stats.resetGame();
        }
        
		if(option.index == 4) { //Back
			ScreenHandler.open(new ScreenTitle());
			ScreenHandler.current.select.selectedIndex = 2;
		}
    }
	
	if(keyCode == 87 || keyCode == 38) {
	   this.select.goUp();
	}
	
	if(keyCode == 83 || keyCode == 40) {
	   this.select.goDown();
	}
	
	if(keyCode == 65 || keyCode == 37)
		this.select.goLeft();
	if(keyCode == 68 || keyCode == 39)
		this.select.goRight();
	
	Stats.setGlobalVolume(this.select.options[2].value);
}

ScreenOptions.prototype.keyUp = function(e) {
    
}