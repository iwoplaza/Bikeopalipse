function ScreenIntro() {
	this.confirm = false;
}

ScreenIntro.prototype.init = function() {
	ScreenHandler.open(new ScreenTitle());
	
	this.sequence = new Sequence();
	var clip = new Clip();
	clip.addFrame(new Frame('res/img/intro/0/px0000.png', 0.3));
	clip.addFrame(new Frame('res/img/intro/0/px0001.png', 0.3));
	clip.addFrame(new Frame('res/img/intro/0/px0000.png', 0.3));
	clip.addFrame(new Frame('res/img/intro/0/px0001.png', 0.3));
	clip.addFrame(new Frame('res/img/intro/0/px0000.png', 0.3));
	clip.addFrame(new Frame('res/img/intro/0/px0001.png', 0.3));
	clip.addFrame(new Frame('res/img/intro/0/px0000.png', 0.3));
	clip.addFrame(new Frame('res/img/intro/0/px0001.png', 0.3));
	clip.addFrame(new Frame('res/img/intro/0/px0000.png', 0.3));
	clip.startScale = 1.4;
	clip.endScale = 1.2;
	
	var clip1 = new Clip();
	clip1.addFrame(new Frame('res/img/intro/1/px0000.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0001.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0002.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0000.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0001.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0002.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0000.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0001.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0002.png', 0.2));
	
	var clip2 = new Clip();
	clip2.addFrame(new Frame('res/img/intro/0/px0000.png', 0.3)).
		addFrame(new Frame('res/img/intro/0/px0001.png', 0.3)).
		addFrame(new Frame('res/img/intro/0/px0000.png', 0.3)).
		addFrame(new Frame('res/img/intro/0/px0001.png', 0.3)).
		addFrame(new Frame('res/img/intro/0/px0000.png', 0.3)).
		addFrame(new Frame('res/img/intro/0/px0001.png', 0.3)).
		addFrame(new Frame('res/img/intro/0/px0000.png', 0.3)).
		addFrame(new Frame('res/img/intro/0/px0001.png', 0.3)).
		addFrame(new Frame('res/img/intro/0/px0000.png', 0.3));
	clip2.startScale = 1.2;
	clip2.endScale = 1.0;
	
	var clip3 = new Clip();
	clip3.addFrame(new Frame('res/img/intro/1/px0000.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0001.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0002.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0000.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0001.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0002.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0000.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0001.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0002.png', 0.2));
	clip3.startScale = 1;
	clip3.endScale = 1.1;
	
	var clip3 = new Clip();
	clip3.addFrame(new Frame('res/img/intro/1/px0000.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0001.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0002.png', 0.2)).
		  addFrame(new Frame('res/img/intro/1/px0000.png', 0.2)).
		  addFrame(new Frame('res/img/intro/3/px0000.png', 0.05)).
		  addFrame(new Frame('res/img/intro/3/px0001.png', 0.05)).
		  addFrame(new Frame('res/img/intro/2/px0000.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0001.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0002.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0003.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0000.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0001.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0002.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0003.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0000.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0001.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0002.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0003.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0000.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0001.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0002.png', 0.1)).
		  addFrame(new Frame('res/img/intro/2/px0003.png', 0.1));
	clip3.startScale = 1;
	clip3.endScale = 1.05;
	
	this.sequence.addClip(clip);
	this.sequence.addClip(clip1);
	this.sequence.addClip(clip2);
	this.sequence.addClip(clip3);
}

ScreenIntro.prototype.update = function() {
	this.sequence.update();
}

ScreenIntro.prototype.draw = function() {
	ctx.save();
	ctx.scale(Camera.scale, Camera.scale);
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	var screenWidth = ScreenHandler.getWidth();
	var screenHeight = ScreenHandler.getHeight();
	
	ctx.translate(screenWidth/2, screenHeight/2);
	this.sequence.draw();
	
	if(this.confirm) {
		Fonts.regular.setAlignment("center");
		Fonts.regular.drawText("confirm to skip", ScreenHandler.getWidth()/2, ScreenHandler.getHeight()-40);
	}
	ctx.restore();
}

ScreenIntro.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
	
	if(keyCode == 32) {
		if(!this.confirm) this.confirm = true;
		else {
			ScreenHandler.open(new ScreenTitle());
		}
	}
}

ScreenIntro.prototype.keyUp = function(e) {
    
}