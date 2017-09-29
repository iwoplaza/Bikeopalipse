var World = {
    roadHeight: 105,
};

World.init = function() {
    this.obstacles = [];
    this.obstacleDelay = 10;
	this.road = new Road();
	this.stage = new Stage();
}

World.update = function() {
	var gameScreen = ScreenHandler.current;
	if(!gameScreen) return;
	
    Player.player.update();
	
	if(!gameScreen.isGameOver) {
		if(this.obstacleDelay > 0) {
			this.obstacleDelay -= this.getDriveSpeed()*Time.delta;
		} else {
			var obstacle = Obstacle.generate();
			this.obstacles.push(obstacle);
			this.obstacleDelay = obstacle.getGap();
		}

		for(var i = this.obstacles.length-1; i >= 0; i--) {
			this.obstacles[i].update();
			if(this.obstacles[i].dead)
				this.obstacles.splice(i, 1);
		}
		
		this.road.update();
	}
}

World.draw = function() {
    ctx.save();
    ctx.translate(0, canvas.height);
	ctx.scale(Camera.scale, Camera.scale);
    
    ctx.fillStyle = "#444";
    ctx.fillRect(0, -this.roadHeight, canvas.width, this.roadHeight);
    
	this.road.draw();
	
    Player.player.draw(this.stage);
    
    for(var key in this.obstacles) {
        this.obstacles[key].draw(this.stage);
    }
    
    ctx.restore();
}

World.getDriveSpeed = function() {
    return 20000;
}