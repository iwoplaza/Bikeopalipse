function Player() {
    this.location = new Vector2(60, -World.roadHeight/2);
    console.log("Init");
	this.velocity = new Vector2(0, 0);
	this.dragY = 70000000;
	this.maxVelocityY = 20000;
    this.up = this.down = this.left = this.right = false;
    this.collisionBounds = new Bounds(-15, -5, 15, 0);
}

Player.prototype.update = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
	this.velocity.x = 0;
	
	if(!gameScreen.isGameOver) {
		if(this.left) this.goLeft();
		if(this.right) this.goRight();
		if(this.up) this.goUp();
		else if(this.down) this.goDown();
		else this.applyDrag();
		
		for(var i in World.obstacles) {
			var obstacle = World.obstacles[i];
			var collision = obstacle.collidesWith(this.collisionBounds.offset(this.location));

			if(collision)
				gameScreen.gameOver();
		}
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

Player.prototype.draw = function() {
    ctx.fillStyle = "#3fce3f";
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.fillRect(-15,-30, 30, 30);
    
    ctx.fillStyle = "#ff1c1c";
    ctx.fillRect(this.collisionBounds.minX, this.collisionBounds.minY, this.collisionBounds.maxX-this.collisionBounds.minX, this.collisionBounds.maxY-this.collisionBounds.minY);
    
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
    this.velocity.x = -20000;
}

Player.prototype.goRight = function() {
    this.velocity.x = 20000;
}

Player.prototype.goUp = function() {
    this.velocity.y = Math.max(this.velocity.y-2500, -this.maxVelocityY);
}

Player.prototype.goDown = function() {
    this.velocity.y = Math.min(this.velocity.y+2500, this.maxVelocityY);
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