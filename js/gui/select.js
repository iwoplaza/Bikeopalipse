function Select(_location) {
	this.location = _location ? _location : new Vector2(0, 0);
	this.options = [];
	this.spacing = 5;
	this.selectedIndex = 0;
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
}

Select.prototype.goDown = function() {
	this.selectedIndex++;
	if(this.selectedIndex >= this.options.length)
		this.selectedIndex = this.options.length-1;
}

function Option(_label) {
	this.parentSelect = null;
	this.label = _label;
}

Option.prototype.draw = function() {
	var selected = this.parentSelect.selectedIndex == this.index;
	
	if(selected) {
	  	ctx.fillStyle = "#ff8a01";
	}else {
		ctx.fillStyle = "#343448";
	}
	
	var width = 200;
	ctx.fillRect(-width/2, 0, width, 40);
	
	ctx.fillStyle = "#fff";
	ctx.textAlign = "center";
	ctx.fillText(this.label, 0, 30);
	
	ctx.translate(0, 40);
}