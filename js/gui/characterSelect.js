function CharacterSelect(_location, _bgColor) {
	this.location = _location ? _location : new Vector2(0, 0);
	this.options = [];
	this.spacing = 5;
	this.selectedIndex = 0;
	this.bgColor = _bgColor;
	this.smoothOffset = 0;
	this.anim = 0;
}

CharacterSelect.prototype.addOption = function(_option) {
	_option.parentSelect = this;
	_option.index = this.options.length;
	this.options.push(_option);
}

CharacterSelect.prototype.draw = function() {
	var selected = this.parentSelect.selectedIndex == this.index;
	
	var offset = this.selectedIndex*85;
	if(this.smoothOffset < offset) {
		this.smoothOffset += 580*Time.delta;
		if(this.smoothOffset > offset)
			this.smoothOffset = offset;
	}
	
	if(this.smoothOffset > offset) {
		this.smoothOffset -= 580*Time.delta;
		if(this.smoothOffset < offset)
			this.smoothOffset = offset;
	}
	this.anim = (this.anim+5*Time.delta)%2;
	
	ctx.save();
	ctx.translate(this.location.x, this.location.y);
	
	var width = 200;
	ctx.fillStyle = selected ? "#ff8a01" : "#343448";
	ctx.fillRect(-width/2, 32, width, 150);
	ctx.fillStyle = "#343448";
	ctx.fillRect(-width/2+1, 33, width-2, 148);
	ctx.fillStyle = "#fff";
	ctx.fillRect(-width/2+4, 104, width-8, 1);
	
	ctx.save();
	ctx.translate(-this.smoothOffset, 0);
	for(let i = 0; i < this.options.length; i++) {
		this.options[i].draw();
		ctx.translate(80+this.spacing, 0);
	}
	ctx.restore();
	var option = this.options[this.selectedIndex];
	ctx.save();
	Fonts.regular.setAlignment("center");
	if(option.state) {
		Fonts.regular.drawText(option.label, 0, 108);
		for(let i in option.description) {
			ctx.translate(0, 12);
			Fonts.regular.drawText(option.description[i], 0, 118);
		}
	}else{
		Fonts.regular.setAlignment("center");
		var priceText = "buy for "+option.price;
		Fonts.regular.drawText(priceText, 0, 137);
		var textWidth = Fonts.regular.getTextWidth(priceText);
		ctx.drawImage(Coins.image, 100, 3, 8, 11, 6+textWidth/2, 136, 8, 11);
	}
	ctx.restore();
	
	ctx.fillStyle = this.bgColor;
	ctx.fillRect(-ScreenHandler.getWidth()/2, 32, (ScreenHandler.getWidth()-width)/2, 90);
	ctx.fillRect(width/2, 32, (ScreenHandler.getWidth()-width)/2, 90);
	ctx.fillStyle = selected ? "#ff8a01" : "#343448";
	ctx.fillRect(-width/2, 32, 1, 90);
	ctx.fillRect(width/2-1, 32, 1, 90);
	
	ctx.restore();
	
	ctx.translate(0, 182);
}

CharacterSelect.prototype.goLeft = function() {
	this.selectedIndex--;
	if(this.selectedIndex < 0)
		this.selectedIndex = 0;
	else{
		AudioManager.playSFX('res/sfx/Click.ogg');
	}
}

CharacterSelect.prototype.goRight = function() {
	this.selectedIndex++;
	if(this.selectedIndex >= this.options.length)
		this.selectedIndex = this.options.length-1;
	else{
		AudioManager.playSFX('res/sfx/Click.ogg');
	}
}

CharacterSelect.prototype.confirm = function() {
	var option = this.options[this.selectedIndex];
	if(!option) return;
	option.confirm();
	return option;
}

function CharacterOption(_label, _description, _tx, _state, _price) {
	this.parentSelect = null;
	this.label = _label;
	this.description = _description ? _description : [];
	this.flashProgress = 0;
	this.frameX = _tx;
	this.frameY = 0;
	this.state = _state;
	this.price = _price;
}

CharacterOption.prototype.draw = function() {
	var selected = this.parentSelect.selectedIndex == this.index;
	
	var textColor = "#fff";
	
	if(this.flashing) {
		this.flashProgress = (this.flashProgress+6*Time.delta)%1;
		if(this.flashProgress < 0.5) {
			ctx.fillStyle = "#343448";
		}else{
			ctx.fillStyle = "#9494d6";
		}
		ctx.fillRect(-33, 37, 66, 66);
	}
	
	ctx.fillStyle = "#4f4f6f";
	ctx.fillRect(-32, 38, 64, 64);
	
	if(this.state) {
		if(selected) {
			this.frameY = Math.floor(1+this.parentSelect.anim);
		}else {
			this.frameY = 0;
		}
		ctx.drawImage(Characters.image, this.frameX*64, this.frameY*64, 64, 64, -32, 38, 64, 64);
	}else{
		this.frameY = 0;
		ctx.drawImage(Characters.image, this.frameX*64, this.frameY*64, 64, 64, -32, 38, 64, 64);
		ctx.drawImage(Resources.images['res/img/guiicons.png'], 0, 0, 22, 28, -11, 52, 22, 28);
	}
}

CharacterOption.prototype.confirm = function() {
	this.confirmed = true;
}

CharacterOption.prototype.flash = function() {
	this.flashProgress = 0;
	this.flashing = true;
}