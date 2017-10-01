function CharacterStewart() {
	Player.call(this);
	this.sprite = new Sprite(Resources.images['res/img/stewart.png'], null, new Vector2(0, 0), 64, 64, -43);
}
CharacterStewart.prototype = Object.create(Player.prototype);
CharacterStewart.prototype.name = "stewart";
CharacterStewart.prototype.description = ["a makeshift runner"];
CharacterStewart.prototype.textureIndex = 1;
Characters.register(CharacterStewart);

CharacterStewart.prototype.draw = function(_stage) {
	ctx.save();
	ctx.translate(Math.floor(this.location.x), Math.floor(this.location.y));
    ctx.fillStyle = "#ff1c1c";
    ctx.fillRect(this.collisionBounds.minX, this.collisionBounds.minY, this.collisionBounds.maxX-this.collisionBounds.minX, this.collisionBounds.maxY-this.collisionBounds.minY);
    
	this.sprite.moveTo(this.location.addVec(new Vector2(-32, 0)));
	this.sprite.textureCoords.x = Math.floor(this.animForward)*64;
	_stage.addSprite(this.sprite);
	
	if(this.powerup != null)
		this.powerup.drawPlayerOverlay();
	ctx.restore();
}

CharacterStewart.prototype.update = function() {
	Player.prototype.update.call(this);
	this.animForward = (this.animForward+Time.delta*10)%6;
}