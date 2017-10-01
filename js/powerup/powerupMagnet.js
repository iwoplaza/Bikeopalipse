function PowerupMagnet() {
	Powerup.call(this);
	this.animSpin = 0;
    this.name = "Magnet";
    this.hudTextureCoords = new Vector2(16, 0);
}
PowerupMagnet.prototype = Object.create(Powerup.prototype);
Powerups.register(PowerupMagnet);

PowerupMagnet.prototype.drawPlayerOverlay = function(_stage) {
	this.animSpin = (this.animSpin+0.35)%4;
	if(this.lifetime > 1 || this.blink <= 0.5)
		ctx.drawImage(Resources.images['res/img/magnet.png'], Math.floor(this.animSpin)*64, 0, 64, 64, -32, -48, 64, 64);
}

PowerupMagnet.prototype.update = function() {
	Powerup.prototype.update.call(this);
    
    for (var i=0;i<World.coins.length;i++){
        var dist = Math.sqrt(Math.pow((Player.player.location.x-World.coins[i].location.x),2)+Math.pow((Player.player.location.y-World.coins[i].location.y),2))
		if(dist < 60 && dist != 0) {
			World.coins[i].location.x += ((Player.player.location.x-World.coins[i].location.x)/dist)*3;
			World.coins[i].location.y += ((Player.player.location.y-World.coins[i].location.y)/dist)*3;
		}
    }
	
	return true;
}