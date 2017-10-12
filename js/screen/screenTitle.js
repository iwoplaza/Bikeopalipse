function ScreenTitle() {
	this.select = new Select(new Vector2(ScreenHandler.getWidth()/2, ScreenHandler.getHeight()/2-20));
	this.select.addOption(new Option('start'));
	this.select.addOption(new Option('controls'));
	this.select.addOption(new Option('options'));
}

ScreenTitle.prototype.init = function() {
    this.imageTitle = Resources.images['res/img/ui/title.png'];
	this.meshTitle = Draw.rectangle(ScreenHandler.getWidth()/2-128, 0, 0, 256, 128);
	this.meshCredits = Draw.rectangle(0, ScreenHandler.getHeight()-20, 0, 96, 20);
	AudioManager.playMusic('res/sfx/Apoca.ogg', 0.3);
}

ScreenTitle.prototype.update = function() {
    if(this.flashing) {
		if(this.flashProgress < 1) {
			this.flashProgress += Time.delta;
		}else{
			ScreenHandler.open(new ScreenMode());
		}
	}
}

ScreenTitle.prototype.draw = function() {
    gl.clearColor(0.171875, 0.171875, 0.171875, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	ctx.resetToWorldMatrix();
	ctx.scale(Camera.scale, Camera.scale);
	
	ctx.drawImage(this.meshTitle, this.imageTitle);
	this.select.draw();
	
	ctx.drawImage(this.meshCredits, Fonts.regular.image, 0, 44, 96, 20);
}

ScreenTitle.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
	
	if(!this.flashing){
		if(keyCode == 32) {
			var option = this.select.confirm();
			if(option.index == 0) { //Start
				option.flash();
				this.flash();
			}
			if(option.index == 1) { //Controls
				ScreenHandler.open(new ScreenControls());
			}
			if(option.index == 2) { //Settings
				ScreenHandler.open(new ScreenOptions());
			}
		}

		if(keyCode == 87 || keyCode == 38) {
		   this.select.goUp();
		}

		if(keyCode == 83 || keyCode == 40) {
		   this.select.goDown();
		}
	}
}

ScreenTitle.prototype.flash = function() {
	this.flashing = true;
	this.flashProgress = 0;
	AudioManager.playSFX('res/sfx/Start.ogg');
}

ScreenTitle.prototype.keyUp = function(e) {
    
}