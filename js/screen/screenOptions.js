function ScreenOptions() {
	this.select = new Select(new Vector2(ScreenHandler.getWidth()/2, 80));
	this.select.addOption(new OptionToggle('music'));
	this.select.addOption(new OptionToggle('sfx'));
	this.select.addOption(new Option('back'));
	
	this.select.options[0].value = Stats.music;
	this.select.options[1].value = Stats.sfx;
}

ScreenOptions.prototype.init = function() {
}

ScreenOptions.prototype.update = function() {
}

ScreenOptions.prototype.draw = function() {
    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.save();
	ctx.scale(Camera.scale, Camera.scale);
	this.select.draw();
	
	ctx.restore();
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
		
		if(option.index == 2) { //Back
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
}

ScreenOptions.prototype.keyUp = function(e) {
    
}