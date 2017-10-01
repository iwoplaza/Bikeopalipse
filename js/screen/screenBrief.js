function ScreenBrief() {
}

ScreenBrief.prototype.init = function() {
	this.continueBlink = 0;
}

ScreenBrief.prototype.update = function() {
    this.continueBlink = (this.continueBlink+1*Time.delta)%1;
}

ScreenBrief.prototype.draw = function() {
	ctx.save();
	ctx.scale(Camera.scale, Camera.scale);
	ctx.fillStyle = "#091b38";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
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
	ctx.restore();
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