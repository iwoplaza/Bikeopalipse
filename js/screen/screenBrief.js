function ScreenBrief() {
}

ScreenBrief.prototype.init = function() {
	this.continueBlink = 0;
	this.mesh = Draw.rectangle(ScreenHandler.getWidth()/2-128, 90, 0, 256, 128);
}

ScreenBrief.prototype.update = function() {
    this.continueBlink = (this.continueBlink+1*Time.delta)%1;
}

ScreenBrief.prototype.draw = function() {
	gl.clearColor(0.03515625, 0.10546875, 0.21875, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	ctx.resetToWorldMatrix();
	ctx.scale(Camera.scale, Camera.scale);
	
	var screenWidth = ScreenHandler.getWidth();
	var screenHeight = ScreenHandler.getHeight();
	
	Fonts.slim.setAlignment("left");
	var brief = [
		'   the world was taken over by',
		'mindless aliens looking for knowledge.',
		'',
		'    you, a sad businessman are',
		' the only hope that humanity has, to...',
		'',
		'          s u r v i v e',
	];
	for(let i = 0; i < brief.length; i++)
		Fonts.slim.drawText(brief[i], screenWidth/2-110, i*10 + 110);
	
	if(this.continueBlink < 0.5) {
		Fonts.regular.setAlignment("center");
		Fonts.regular.drawText("confirm to continue", ScreenHandler.getWidth()/2, ScreenHandler.getHeight()-40);
	}
}

ScreenBrief.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
	
	if(keyCode == 32) {
		AudioManager.playSFX('res/sfx/Click.ogg');
		ScreenHandler.open(new ScreenTitle());
	}
}

ScreenBrief.prototype.keyUp = function(e) {
    
}