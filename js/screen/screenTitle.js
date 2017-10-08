function ScreenTitle() {
	this.select = new Select(new Vector2(ScreenHandler.getWidth()/2, ScreenHandler.getHeight()/2-20));
	this.select.addOption(new Option('start'));
	this.select.addOption(new Option('controls'));
	this.select.addOption(new Option('options'));
}

ScreenTitle.prototype.init = function() {
    this.image = Resources.images['res/img/title.png'];
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
    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    /*ctx.font = "80px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Bikeopalipse", canvas.width/2, 150);
    */
	
	ctx.save();
	ctx.scale(Camera.scale, Camera.scale);
	ctx.drawImage(this.image, ScreenHandler.getWidth()/2-128, 0, 256, 150);
	this.select.draw();
	
	ctx.drawImage(Fonts.regular.image, 0, 44, 96, 20, 0, ScreenHandler.getHeight()-20, 96, 20);
	
	ctx.restore();
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