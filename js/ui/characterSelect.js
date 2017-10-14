function CharacterSelect(_location, _bgColor) {
	this.location = _location ? _location : new Vector2(0, 0);
	this.options = [];
	this.spacing = 5;
	this.selectedIndex = 0;
	this.bgColor = _bgColor;
	this.smoothOffset = 0;
	this.anim = 0;
	this.width = 200;
	
	this.imageIcons = Resources.images['res/img/ui/icons.png'];
	this.meshOutline = Draw.rectangle_stroke_solid(-this.width/2, 32, 0, this.width, 150, 1, [1, 0.5390625, 0.003, 1]);
	this.meshBase = Draw.rectangle_solid(-this.width/2+1, 33, 0, this.width-2, 148, [0.203125, 0.203125, 0.28125, 1]);
	this.meshUnderline = Draw.rectangle_solid(-this.width/2+4, 104, 0, this.width-8, 1, [1, 1, 1, 1]);
	this.meshCoverLeft = Draw.rectangle_solid(-ScreenHandler.getWidth()/2+1, 32, 0, (ScreenHandler.getWidth()-this.width)/2, 90, [0.171875, 0.171875, 0.171875, 1]);
	this.meshCoverRight = Draw.rectangle_solid(this.width/2-1, 32, 0, (ScreenHandler.getWidth()-this.width)/2, 90, [0.171875, 0.171875, 0.171875, 1]);

	this.meshOptionOutline = Draw.rectangle_solid(-33, 37, 0, 66, 66, [0.578125, 0.578125, 0.8359375, 1]);
	this.meshOptionBase = Draw.rectangle_solid(-32, 38, 0, 64, 64, [0.30859375, 0.30859375, 0.43359375, 1]);
	this.meshAvatar = Draw.rectangle(-32, 38, 0, 64, 64);
	this.meshLocked = Draw.rectangle(-11, 52, 0, 22, 28);
	
	this.meshCoin = Draw.rectangle(6, 136, 0, 8, 11);
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

		ctx.drawSolid(this.meshBase);
		ctx.drawSolid(this.meshUnderline);

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
					Fonts.slim.setAlignment("center");
					Fonts.slim.drawText(option.description[i], 0, 114);
				}
			}else{
				Fonts.regular.setAlignment("center");
				var priceText = "buy for "+option.price;
				Fonts.regular.drawText(priceText, 0, 137);
				var textWidth = Fonts.regular.getTextWidth(priceText);
				//ctx.drawImage(Coins.image, 100, 3, 8, 11, 6+textWidth/2, 136, 8, 11);
				ctx.save();
					ctx.translate(textWidth/2, 0);
					ctx.drawImage(this.meshCoin, Coins.image, 100, 3, 8, 11);
				ctx.restore();
			}
		ctx.restore();
		ctx.drawSolid(this.meshCoverLeft);
		ctx.drawSolid(this.meshCoverRight);

		if(selected)
			ctx.drawSolid(this.meshOutline);

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
		if(this.flashProgress > 0.5)
			ctx.drawSolid(this.parentSelect.meshOptionOutline);
	}
	
	ctx.drawSolid(this.parentSelect.meshOptionBase);
	
	if(this.state) {
		if(selected) {
			this.frameY = 1+Math.floor(this.parentSelect.anim);
		}else {
			this.frameY = 0;
		}
		//ctx.drawImage(Characters.image, this.frameX*64, this.frameY*64, 64, 64, -32, 38, 64, 64);
		ctx.drawImage(this.parentSelect.meshAvatar, Characters.image, this.frameX*64, this.frameY*64, 64, 64);
	}else{
		this.frameY = 0;
		//ctx.drawImage(Characters.image, this.frameX*64, this.frameY*64, 64, 64, -32, 38, 64, 64);
		//ctx.drawImage(Resources.images['res/img/ui/icons.png'], 0, 0, 22, 28, -11, 52, 22, 28);
		ctx.drawImage(this.parentSelect.meshAvatar, Characters.image, this.frameX*64, this.frameY*64, 64, 64);
		ctx.drawImage(this.parentSelect.meshLocked, this.parentSelect.imageIcons, 0, 0, 22, 28);
	}
}

CharacterOption.prototype.confirm = function() {
	this.confirmed = true;
}

CharacterOption.prototype.flash = function() {
	this.flashProgress = 0;
	this.flashing = true;
}