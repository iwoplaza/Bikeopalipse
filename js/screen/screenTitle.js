function ScreenTitle() {
}

ScreenTitle.prototype.update = function() {
    
}

ScreenTitle.prototype.draw = function() {
    ctx.fillStyle = "#2c2c2c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = "80px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Bikeopalipse", canvas.width/2, 150);
    
    ctx.font = "30px Arial";
    ctx.fillStyle = "#a2a2a2";
    ctx.textAlign = "center";
    ctx.fillText("Press SPACE to start", canvas.width/2, canvas.height-80);
}

ScreenTitle.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
    if(keyCode == 32) {
        ScreenHandler.open(new ScreenGame());
    }
}

ScreenTitle.prototype.keyUp = function(e) {
    
}