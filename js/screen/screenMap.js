function ScreenMap() {
	this.select = new Select(new Vector2(67.5, 2.5), 2.5);
	this.select.addOption(new Option('back', new Vector2(130,20)));
	this.select.addOption(new Option('show', new Vector2(130,20)));
	this.select.addOption(new Option('select', new Vector2(130,20)));
    
    this.select.draw = function() {
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        for(let i = 0; i < this.options.length; i++) {
            this.options[i].drawH();
            ctx.translate(this.spacing, 0);
        }
        ctx.restore();
    }
}

ScreenMap.prototype.init = function() {
    this.keyQueue = new Array(10);
    this.image = Resources.images['res/img/ui/map.png'];
    this.map = new Map(this.image, new Vector2(0,0));
}

ScreenMap.prototype.update = function() {
    var secret = [65,66,39,37,39,37,40,40,38,38];
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
	this.map.draw();
    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(0, 0, canvas.width/2, 25);
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
        switch(option.index){
            case 0:
                ScreenHandler.open(new ScreenMode());
                break;
        }
    }
	
	if(keyCode == 87 || keyCode == 38) {
	}
	
	if(keyCode == 83 || keyCode == 40) {
	}
	
	if(keyCode == 65 || keyCode == 37)
		this.select.goUp();
	if(keyCode == 68 || keyCode == 39)
		this.select.goDown();
}

ScreenMap.prototype.keyUp = function(e) {
    
}