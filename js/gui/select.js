function Select(_location) {
	this.location = _location ? _location : new Vector2(0, 0);
	this.options = [];
	this.spacing = 5;
	this.selectedIndex = 0;
	this.selectDelay = 0.5;
	this.flashFrequency = 4;
	this.flash = 0;
}

Select.prototype.addOption = function(_option) {
	_option.parentSelect = this;
	_option.index = this.options.length;
	this.options.push(_option);
}

Select.prototype.draw = function() {
	ctx.save();
	ctx.translate(this.location.x, this.location.y);
	for(let i = 0; i < this.options.length; i++) {
		this.options[i].draw();
		ctx.translate(0, this.spacing);
	}
	ctx.restore();
}

Select.prototype.goUp = function() {
	this.selectedIndex--;
	if(this.selectedIndex < 0)
		this.selectedIndex = 0;
	else{
		AudioManager.playSFX('res/sfx/Click.ogg');
	}
}

Select.prototype.goDown = function() {
	this.selectedIndex++;
	if(this.selectedIndex >= this.options.length)
		this.selectedIndex = this.options.length-1;
	else{
		AudioManager.playSFX('res/sfx/Click.ogg');
	}
}

Select.prototype.goLeft = function() {
	var option = this.options[this.selectedIndex];
	if(option.goLeft)
		option.goLeft();
}

Select.prototype.goRight = function() {
	var option = this.options[this.selectedIndex];
	if(option.goRight)
		option.goRight();
}

Select.prototype.confirm = function() {
	var option = this.options[this.selectedIndex];
	if(!option) return;
	option.confirm();
	return option;
}

function Option(_label) {
	this.parentSelect = null;
	this.label = _label;
	this.flashProgress = 0;
}

Option.prototype.draw = function() {
	var selected = this.parentSelect.selectedIndex == this.index;
	
	var textColor = "#fff";
	
	if(this.flashing) {
		this.flashProgress = (this.flashProgress+6*Time.delta)%1;
		if(this.flashProgress < 0.5) {
			ctx.fillStyle = "#343448";
		}else{
			textColor = "#343448";
			ctx.fillStyle = "#9494d6";
		}
	}else if(selected) {
	  	ctx.fillStyle = "#ff8a01";
	}else {
		ctx.fillStyle = "#343448";
	}
	
	var width = 200;
	ctx.fillRect(-width/2, 0, width, 40);
	
	ctx.fillStyle = textColor;
	ctx.textAlign = "center";
	//ctx.fillText(this.label, 0, 30);
	Fonts.regular.setAlignment("center");
	Fonts.regular.drawText(this.label, 0, 15);
	
	ctx.translate(0, 40);
}

Option.prototype.confirm = function() {
	this.confirmed = true;
}

Option.prototype.flash = function() {
	this.flashProgress = 0;
	this.flashing = true;
}