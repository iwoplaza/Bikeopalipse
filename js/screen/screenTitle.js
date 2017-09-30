function ScreenTitle() {
	this.select = new Select(new Vector2(ScreenHandler.getWidth()/2, ScreenHandler.getHeight()/2-20));
	this.select.addOption(new Option('start'));
	this.select.addOption(new Option('controls'));
}

ScreenTitle.prototype.init = function() {
    this.image = Resources.images['res/img/title.png'];
}

ScreenTitle.prototype.update = function() {
    if(this.flashing) {
		if(this.flashProgress < 1) {
			this.flashProgress += Time.delta;
		}else{
			ScreenHandler.open(new ScreenGame());
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
    if(keyCode == 32) {
        var option = this.select.confirm();
		if(option.index == 0) { //Start
			option.flash();
			this.flash();
		}
    }
	
	if(keyCode == 87 || keyCode == 38) {
	   this.select.goUp();
	}
	
	if(keyCode == 83 || keyCode == 40) {
	   this.select.goDown();
	}
}

ScreenTitle.prototype.flash = function() {
	this.flashing = true;
	this.flashProgress = 0;
	AudioManager.stopAndPlay('res/sfx/Start.ogg');
}

ScreenTitle.prototype.keyUp = function(e) {
    
}