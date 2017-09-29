function Player() {
    this.location = new Vector2(60, -World.roadHeight/2);
    console.log("Init");
    this.up = this.down = this.left = this.right = false;
    this.collisionBounds = new Bounds(-30, -10, 30, 0);
}

Player.prototype.update = function() {
    if(this.left) this.goLeft();
    if(this.right) this.goRight();
    if(this.up) this.goUp();
    if(this.down) this.goDown();
    
    if(this.location.x < 0)
        this.location.x = 0;
    if(this.location.y < -World.roadHeight)
        this.location.y = -World.roadHeight;
    if(this.location.y > 0)
        this.location.y = 0;
    
    for(var i in World.obstacles) {
        var obstacle = World.obstacles[i];
        var collision = obstacle.collidesWith(this.collisionBounds.offset(this.location));
        
        if(collision)
            console.log("KOLIZJA");
    }
}

Player.prototype.draw = function() {
    ctx.fillStyle = "#3fce3f";
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.fillRect(-30,-60, 60, 60);
    
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
    this.location.x -= 4;
}

Player.prototype.goRight = function() {
    this.location.x += 4;
}

Player.prototype.goUp = function() {
    this.location.y -= 4;
}

Player.prototype.goDown = function() {
    this.location.y += 4;
}

Player.prototype.getOffsetCollisionBounds = function() {
    return this.collisionBounds.offset(this.location);
}