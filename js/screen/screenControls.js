function ScreenControls() {
}

ScreenControls.prototype.init = function() {
    this.image = Resources.images['res/img/ui/controls.png'];
	this.continueBlink = 0;
}

ScreenControls.prototype.update = function() {
    this.continueBlink = (this.continueBlink+1*Time.delta)%1;
}

ScreenControls.prototype.draw = function() {
	ctx.save();
	ctx.scale(Camera.scale, Camera.scale);
	ctx.fillStyle = "#091b38";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.drawImage(this.image, ScreenHandler.getWidth()/2-128, 90, 256, 128);
	
	if(this.continueBlink < 0.5) {
		Fonts.regular.setAlignment("center");
		Fonts.regular.drawText("confirm to continue", ScreenHandler.getWidth()/2, ScreenHandler.getHeight()-40);
	}
	ctx.restore();
}

ScreenControls.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
	
	if(keyCode == 32) {
		AudioManager.playSFX('res/sfx/Click.ogg');
		ScreenHandler.open(new ScreenTitle());
	}
}

ScreenControls.prototype.keyUp = function(e) {
    
}