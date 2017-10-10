function ConvUI() {
    this.conversation = null;
	this.currentNode = 0;
	this.textProgress = 0;
}

ConvUI.prototype.start = function(_conversation) {
	this.conversation = _conversation;
};

ConvUI.prototype.keyDown = function(e) {
	if(!this.conversation) return;
	
	if(e.keyCode == 32) {
		this.currentNode++;
		this.textProgress=0;
		if(this.currentNode >= this.conversation.nodes.length)
			this.conversation = null;
	}
};

ConvUI.prototype.update = function() {
	if(!this.conversation) return;
	
	if(this.textProgress < this.conversation.nodes[this.currentNode].text.length)
		this.textProgress += Time.delta*25;
	else
		this.textProgress = this.conversation.nodes[this.currentNode].text.length;
}

ConvUI.prototype.draw = function() {
	ctx.save();
	ctx.scale(Camera.scale, Camera.scale);
    if(this.conversation != null) {
        this.drawBox(false);
    }
	ctx.restore();
};

ConvUI.prototype.drawBox = function(_side) {
	let screenWidth = ScreenHandler.getWidth();
    let screenHeight = ScreenHandler.getHeight();
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, screenWidth, 52);
	
	var node = this.conversation.nodes[this.currentNode];
	/*ctx.fillStyle = "#111";
    ctx.fillRect(2, 2, 48, 48);
	ctx.fillStyle = "#000";
    ctx.fillRect(3, 3, 46, 46);*/
	ctx.drawImage(node.talker.image, node.expression*46, 0, 46, 46, 3, 3, 46, 46);
	Fonts.slim.drawText(node.text.substr(0, Math.floor(this.textProgress)), 56, 7);
};