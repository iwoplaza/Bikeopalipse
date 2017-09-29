function Player() {
    this.location = new Vector2(60, -World.roadHeight/2);
    console.log("Init");
	this.velocity = new Vector2(0, 0);
	this.dragY = 700000;
	this.maxVelocityY = 120;
    this.up = this.down = this.left = this.right = false;
    this.collisionBounds = new Bounds(-15, -3, 15, 0);
	this.tripCooldown = 0;
	
	this.sprite = new Sprite(Resources.images['res/img/player.png'], null, new Vector2(0, 0), 32, 32, -32);
	this.animForward = 0;
}

Player.prototype.update = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	this.velocity.x = 0;
	if(this.tripCooldown > 0) {
		this.tripCooldown-=Time.delta;
	}
	
	if(!gameScreen.isGameOver) {
		if(this.tripCooldown <= 0) {
			if(this.left) this.goLeft();
			if(this.right) this.goRight();
		}else{
			this.velocity.x = -60;
		}
		if(this.up) this.goUp();
		else if(this.down) this.goDown();
		else this.applyDrag();
		
		for(var i in World.obstacles) {
			var obstacle = World.obstacles[i];
			var collision = obstacle.collidesWith(this.collisionBounds.offset(this.location));

			if(collision == Obstacle.COLLISION_FATAL)
				gameScreen.gameOver();
			else if(collision == Obstacle.COLLISION_TRIP)
				this.trip();
		}
		
		this.animForward = (this.animForward+Time.delta*15)%4;
	}else{
		this.velocity = new Vector2();
	}
    
	this.location = this.location.addVec(this.velocity.multiply(Time.delta));
	
    if(this.location.x < 20)
        gameScreen.gameOver();
    if(this.location.y < -World.roadHeight)
        this.location.y = -World.roadHeight;
    if(this.location.y > 0)
        this.location.y = 0;
}

Player.prototype.draw = function(_stage) {
    ctx.fillStyle = "#3fce3f";
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    //ctx.fillRect(-15,-30, 30, 30);
    
    ctx.fillStyle = "#ff1c1c";
    ctx.fillRect(this.collisionBounds.minX, this.collisionBounds.minY, this.collisionBounds.maxX-this.collisionBounds.minX, this.collisionBounds.maxY-this.collisionBounds.minY);
    
	this.sprite.moveTo(this.location.addVec(new Vector2(-16, 0)));
	this.sprite.textureCoords.x = Math.floor(this.animForward)*32;
	_stage.addSprite(this.sprite);
	
    ctx.restore();
}

Player.prototype.keyDown = function(e) {
    var keyCode = e.keyCode;
    console.log(keyCode);
    if(keyCode == 65 || keyCode == 37)
        this.left = true;
    if(keyCode == 68 || keyCode == 39)
        this.right = true;
    if(keyCode == 87 || keyCode == 38)
        this.up = true;
    if(keyCode == 83 || keyCode == 40)
        this.down = true;
}

Player.prototype.keyUp = function(e) {
    var keyCode = e.keyCode;
    console.log(keyCode);
    if(keyCode == 65 || keyCode == 37)
        this.left = false;
    if(keyCode == 68 || keyCode == 39)
        this.right = false;
    if(keyCode == 87 || keyCode == 38)
        this.up = false;
    if(keyCode == 83 || keyCode == 40)
        this.down = false;
}

Player.prototype.goLeft = function() {
    this.velocity.x = -150;
}

Player.prototype.goRight = function() {
    this.velocity.x = 150;
}

Player.prototype.goUp = function() {
    this.velocity.y = Math.max(this.velocity.y-25, -this.maxVelocityY);
}

Player.prototype.goDown = function() {
    this.velocity.y = Math.min(this.velocity.y+25, this.maxVelocityY);
}

Player.prototype.trip = function() {
	this.tripCooldown = 0.6;
}

Player.prototype.applyDrag = function() {
	if(this.velocity.y > 0) {
		this.velocity.y -= this.dragY*Time.delta;
		if(this.velocity.y < 0) this.velocity.y = 0;
	}else if(this.velocity.y < 0) {
		this.velocity.y += this.dragY*Time.delta;
		if(this.velocity.y > 0) this.velocity.y = 0;
	}
}

Player.prototype.getOffsetCollisionBounds = function() {
    return this.collisionBounds.offset(this.location);
}