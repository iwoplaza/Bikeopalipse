function ScreenMap() {
	this.select = new Select(new Vector2(67.5, 2.5), 2.5);
	this.select.addOption(new Option('back', new Vector2(130,20)));
	this.select.addOption(new Option('show', new Vector2(130,20)));
	this.select.addOption(new Option('select', new Vector2(130,20)));
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
    ctx.fillStyle = "#0c284f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.save();
	ctx.scale(Camera.scale+1, Camera.scale+1);
	this.map.draw();
    ctx.restore();
    
    ctx.save();
	ctx.scale(Camera.scale, Camera.scale);
    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(0, 0, canvas.width/Camera.scale, 25);
    this.select.drawH();
	ctx.restore();
}

ScreenMap.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
    console.log("Key code: "+e.keyCode);
    this.keyQueue.unshift(e.keyCode);
    this.keyQueue.pop();
    if(keyCode == 32) {
        if (!this.mode){
            var option = this.select.confirm();
            switch(option.index){
                case 0:
                    ScreenHandler.open(new ScreenMode());
                    break;
                case 1:

                    break;
                case 2:
                    this.mode = true;
                    break;
            }
        }
    }
	
	if(keyCode == 87 || keyCode == 38) {
	}
	
	if(keyCode == 83 || keyCode == 40) {
	}
	
	if(keyCode == 65 || keyCode == 37){
        if (!this.mode) this.select.goUp();
        else{
            
        }   
    }
	if(keyCode == 68 || keyCode == 39){
		if (!this.mode) this.select.goDown();
        else{
            
        }
    }
}

ScreenMap.prototype.keyUp = function(e) {
    
}