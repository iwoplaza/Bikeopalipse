function ScreenMap() {
	this.select = new Select(new Vector2(ScreenHandler.getWidth()/2, 80));
	this.select.addOption(new Option('back'));
	this.select.addOption(new Option('show'));
	this.select.addOption(new Option('select'));
}

ScreenMap.prototype.init = function() {
    this.keyQueue = new Array(10);
}

ScreenMap.prototype.update = function() {
    var secret = [65,66,39,37,39,37,40,40,38,38];
    if (this.keyQueue == secret) console.log("LOL");
    for (var i=0;i<10;i++){
        if (this.keyQueue[i] != secret[i]) return;
    }
    console.log("Secret code detected!");
    this.keyQueue = new Array(10);
}

ScreenMap.prototype.draw = function() {
    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.save();
	ctx.scale(Camera.scale, Camera.scale);
	this.select.draw();
	
	ctx.restore();
}

ScreenMap.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
    console.log("Key code: "+e.keyCode);
    this.keyQueue.unshift(e.keyCode);
    this.keyQueue.pop();
    if(keyCode == 32) {
        var option = this.select.confirm();
        
		if(option.index == 3) { //Back
			ScreenHandler.open(new ScreenTitle());
			ScreenHandler.current.select.selectedIndex = 2;
		}
    }
	
	if(keyCode == 87 || keyCode == 38) {
	   this.select.goUp();
	}
	
	if(keyCode == 83 || keyCode == 40) {
	   this.select.goDown();
	}
	
	if(keyCode == 65 || keyCode == 37)
		this.select.goLeft();
	if(keyCode == 68 || keyCode == 39)
		this.select.goRight();
}

ScreenMap.prototype.keyUp = function(e) {
    
}