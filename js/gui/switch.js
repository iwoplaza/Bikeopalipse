function optionSwitch(_label, _value) {
	this.parentSelect = null;
	this.label = _label;
    this.value = _value;
}

Switch.prototype.draw = function() {
	var selected = this.parentSelect.selectedIndex == this.index;
	var textColor = "#fff";
	
	var width = 200;
	//ctx.fillRect(-width/2, 0, width, 40);
	
	ctx.fillStyle = textColor;
	ctx.textAlign = "center";
	//ctx.fillText(this.label, 0, 30);
	Fonts.regular.setAlignment("center");
	Fonts.regular.drawText(this.label, 0, 15);
	
	ctx.translate(0, 40);
}

Option.prototype.confirm = function() {
	this.value = !this.value;
}