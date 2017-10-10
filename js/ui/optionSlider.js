function OptionSlider(_label, _value) {
	this.parentSelect = null;
	this.label = _label;
    this.value = _value;
}

OptionSlider.prototype.draw = function() {
	var selected = this.parentSelect.selectedIndex == this.index;
	
	var textColor = "#fff";
	var bodyColor = "#343448";
	
	if(this.flashing) {
		this.flashProgress = (this.flashProgress+6*Time.delta)%1;
		if(this.flashProgress > 0.5) {
			textColor = "#343448";
			bodyColor = "#9494d6";
		}
	}else if(selected) {
	  	bodyColor = "#ff8a01";
	}
	ctx.fillStyle = bodyColor;
	
	var width = 200;
	var barWidth = 100;
	ctx.fillRect(-100, 0, 200, 40);
	
	ctx.fillStyle = textColor;
	ctx.textAlign = "center";
	Fonts.regular.setAlignment("right");
	Fonts.regular.drawText(this.label, 0, 15);
	var knobWidth = 20;
	Fonts.regular.setAlignment("left");
	Fonts.regular.drawText(""+Math.floor(this.value*100)+"%", 16, 15);
	
	ctx.translate(0, 40);
}

OptionSlider.prototype.goLeft = function() {
	this.value -= 0.1;
	if(this.value < 0)
		this.value = 0;
	else{
		AudioManager.playSFX('res/sfx/Click.ogg');
	}
}

OptionSlider.prototype.goRight = function() {
	this.value += 0.1;
	if(this.value > 1)
		this.value = 1;
	else{
		AudioManager.playSFX('res/sfx/Click.ogg');
	}
}

OptionSlider.prototype.confirm = function() {
	this.value = !this.value;
}