var World = {
    roadHeight: 105,
};

World.init = function() {
    this.obstacles = [];
    this.obstacleDelay = 10;
	this.coins = [];
	this.coinSpawnCooldown = 1;
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

		if(this.coinSpawnCooldown > 0) {
			this.coinSpawnCooldown -= Time.delta;
		} else {
			this.spawnCoin();
		}
		
		for(var i = this.obstacles.length-1; i >= 0; i--) {
			this.obstacles[i].update();
			if(this.obstacles[i].dead)
				this.obstacles.splice(i, 1);
		}
		
		for(var i = this.coins.length-1; i >= 0; i--) {
			this.coins[i].update();
			if(this.coins[i].dead)
				this.coins.splice(i, 1);
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
	
	this.stage.clear();
    Player.player.draw(this.stage);
    
    for(var key in this.obstacles) {
        this.obstacles[key].draw(this.stage);
    }
	for(var key in this.coins) {
        this.coins[key].draw(this.stage);
    }
	this.stage.draw();
    
    ctx.restore();
}

World.spawnCoin = function() {
	this.coins.push(new Coin(new Vector2(400, 20+Math.floor(Math.random()*-(this.roadHeight-40)))));
	this.coinSpawnCooldown = 1;
}

World.getDriveSpeed = function() {
    return 150;
}