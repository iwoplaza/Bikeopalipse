function ScreenOptions() {
	this.select = new Select(new Vector2(ScreenHandler.getWidth()/2, 80));
	this.select.addOption(new OptionToggle('back'));
	this.select.addOption(new OptionToggle('sfx'));
	this.select.addOption(new Option('back'));
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
        
		if(option.index == 3) { //Back
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
}

ScreenOptions.prototype.keyUp = function(e) {
    
}