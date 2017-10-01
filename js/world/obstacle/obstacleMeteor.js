function ObstacleMeteor() {
    ObstacleBase.call(this);
    this.location.y = 10+Math.floor(Math.random()*-(World.roadHeight-20));
	this.sprite = new Sprite(Obstacle.image, null, new Vector2(77,0), 21, 17, -15);
	this.collisionBounds = new Bounds(-6, -8, 6, 2);
    //-15
    this.anim = 100;
}
ObstacleMeteor.prototype = Object.create(ObstacleBase.prototype);
Obstacle.register(ObstacleMeteor);

ObstacleMeteor.prototype.draw = function(_stage) {
    ctx.fillStyle = "#ff1c1c";
    ctx.fillRect(this.location.x+this.collisionBounds.minX, this.location.y+this.collisionBounds.minY, this.collisionBounds.maxX-this.collisionBounds.minX, this.collisionBounds.maxY-this.collisionBounds.minY);
    
    if (this.anim<=0)this.sprite.moveTo(this.location.addVec(new Vector2(-10)));
    else{
        ctx.save();
        console.log(this.anim)
        ctx.drawImage(Obstacle.image, 77, 0, 21, 17, this.location.x+this.collisionBounds.minX, this.location.y+this.collisionBounds.minY-this.anim, 21, 17);
        ctx.fillStyle = "#ff1c1c";
        ctx.fillRect(this.location.x+this.collisionBounds.minX, this.location.y+this.collisionBounds.minY-this.anim, 21, 17);
        ctx.restore();
    }
        
    _stage.addSprite(this.sprite);
}


ObstacleMeteor.prototype.update = function(){
    if (this.anim >= 0 ){
        this.anim -= (World.getDriveSpeed()*Time.delta);
    }else{
        this.anim = 0;
    }
    ObstacleBase.prototype.update.call(this);
}

ObstacleMeteor.prototype.collidesWith = function(bounds) {
    if(this.getOffsetCollisionBounds().overlaps(bounds) && this.anim <= 0) {
		return Obstacle.COLLISION_TRIP;
	}
	return 0;
}