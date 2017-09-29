function ScreenGame() {
    
}

ScreenGame.prototype.init = function() {
    Player.player = new Player();
    World.init();
}

ScreenGame.prototype.update = function() {
    World.update();
}

ScreenGame.prototype.draw = function() {
    ctx.fillStyle = "#ffae3f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    World.draw();
}

ScreenGame.prototype.keyDown = function(e) {
    Player.player.keyDown(e);
}

ScreenGame.prototype.keyUp = function(e) {
    Player.player.keyUp(e);
}