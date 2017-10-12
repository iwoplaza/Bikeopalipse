function OptionToggle(_label, _value) {
	this.parentSelect = null;
	this.label = _label;
    this.value = _value;
}

OptionToggle.prototype.draw = function() {
	var selected = this.parentSelect.selectedIndex == this.index;
	
	var textColor = "#fff";
	var bodyColor = "#343448";
	
	if(selected) {
	  	bodyColor = "#ff8a01";
	}
	ctx.fillStyle = bodyColor;
	
	var width = 100;
	ctx.fillRect(-100, 0, 200, 40);
	
	ctx.fillStyle = textColor;
	ctx.textAlign = "center";
	Fonts.regular.setAlignment("right");
	Fonts.regular.drawText(this.label, 0, 15);
	
	ctx.fillRect(width/2-48+6, 11, 18, 18);
	
	ctx.fillStyle = bodyColor;
	ctx.fillRect(width/2-48+7, 12, 16, 16);
	
	if(this.value) {
		ctx.fillStyle = textColor;
		ctx.fillRect(width/2-48+8, 13, 14, 14);
	}
	
	ctx.translate(0, 40);
}

OptionToggle.prototype.confirm = function() {
	this.value = !this.value;
}