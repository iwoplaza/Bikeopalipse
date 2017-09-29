var HUD = {
	barHeight: 45
};

HUD.draw = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	ctx.fillStyle = "#000";
	ctx.fillRect(0, canvas.height-this.barHeight, canvas.width, this.barHeight);
}