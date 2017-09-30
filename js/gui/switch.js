function Switch(_label) {
	this.parentSelect = null;
	this.label = _label;
}

Switch.prototype.draw = function() {
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
	this.flash = 0;
	this.flashing = true;
}