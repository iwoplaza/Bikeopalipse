function ScreenControls() {
}

ScreenControls.prototype.init = function() {
    this.image = Resources.images['res/img/ui/controls.png'];
	this.continueBlink = 0;
	this.mesh = Draw.rectangle(ScreenHandler.getWidth()/2-128, 90, 0, 256, 128);
}

ScreenControls.prototype.update = function() {
    this.continueBlink = (this.continueBlink+1*Time.delta)%1;
}

ScreenControls.prototype.draw = function() {
	gl.clearColor(0.03515625, 0.10546875, 0.21875, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	ctx.resetToWorldMatrix();
	ctx.scale(Camera.scale, Camera.scale);
	ctx.drawImage(this.mesh, this.image);
	
	if(this.continueBlink < 0.5) {
		Fonts.regular.setAlignment("center");
		Fonts.regular.drawText("confirm to continue", ScreenHandler.getWidth()/2, ScreenHandler.getHeight()-40);
	}
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