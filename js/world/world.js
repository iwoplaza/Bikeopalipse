var World = {
    roadHeight: 105,
};

World.init = function() {
	this.distance = 0;
	this.interReminder = 0;
	
    this.obstacles = [];
	this.coins = [];
	this.powerups = [];
	this.explosions = [];
	this.zombies = [];
	
	this.imageBackground = Resources.images['res/img/world/background_dawn.png'];
	this.meshBackground = Draw.rectangle(-56, -300, 0, 512, 512);
	this.road = new Road();
	this.stage = new Stage();
    this.middleGround = new MiddleGround();
    this.structure = new Structure();
	this.skyline = new Skyline(Resources.images['res/img/world/skyline_dawn.png']);
	
	this.stepProgress = 0;
};

World.destroy = function() {
	this.meshBackground.cleanUp();
	this.skyline.destroy();
};

World.update = function() {
	Player.player.update();
	
	for(let i = 0; i < this.obstacles.length; i++)
		this.obstacles[i].update();
	for(let i = 0; i < this.coins.length; i++)
		this.coins[i].update();
	for(let i = 0; i < this.powerups.length; i++)
		this.powerups[i].update();
	for(let i = 0; i < this.explosions.length; i++)
		this.explosions[i].update();
	for(let i = 0; i < this.zombies.length; i++)
		this.zombies[i].update();
	
	this.stepFrequency = this.getDriveSpeed();
	this.stepProgress += Time.delta*this.stepFrequency;
	if(this.stepProgress >= 1) {
		this.step(Math.floor(this.stepProgress));
		this.stepProgress = this.stepProgress%1;
	}
}

World.step = function(_amount) {
	for(var i = this.obstacles.length-1; i >= 0; i--) {
		this.obstacles[i].step(_amount);
		if(this.obstacles[i].dead)
			this.obstacles.splice(i, 1);
	}

	for(var i = this.coins.length-1; i >= 0; i--) {
		this.coins[i].step(_amount);
		if(this.coins[i].dead)
			this.coins.splice(i, 1);
	}

	for(var i = this.powerups.length-1; i >= 0; i--) {
		this.powerups[i].step(_amount);
		if(this.powerups[i].dead)
			this.powerups.splice(i, 1);
	}

	for(var i = this.explosions.length-1; i >= 0; i--) {
		this.explosions[i].step(_amount);
		if(this.explosions[i].dead)
			this.explosions.splice(i, 1);
	}

	this.skyline.step(_amount);
	this.road.step(_amount);
	this.structure.step(_amount);
	this.middleGround.step(_amount);

	this.distance += this.getDriveSpeed();
	this.interReminder = (this.interReminder+this.getDriveSpeed())%1;
}

World.draw = function() {
    ctx.save();
    ctx.translate(0, canvas.height);
	ctx.scale(Camera.scale, Camera.scale);
	ctx.drawImage(this.meshBackground, this.imageBackground);
	
	this.skyline.draw();
    this.middleGround.draw();
    this.structure.draw();
	this.road.draw();
	
	this.stage.clear();
    
    for(var key in this.obstacles)
        this.obstacles[key].draw(this.stage);
	for(var key in this.coins)
        this.coins[key].draw(this.stage);
	for(var key in this.powerups)
        this.powerups[key].draw(this.stage);
	for(var key in this.explosions)
        this.explosions[key].draw(this.stage);
	for(let i = 0; i < this.zombies.length; i++)
		this.zombies[i].draw(this.stage);
	
	Player.player.draw(this.stage);
	
	this.stage.draw();
    
    ctx.restore();
}

World.spawnCoin = function(_x) {
	this.coins.push(new Coin(new Vector2(Math.floor(_x), -20+Math.floor(Math.random()*-(this.roadHeight-60)))));
}

World.spawnPowerup = function(_x) {
	this.powerups.push(new PowerupItem(new Vector2(Math.floor(_x), -20+Math.floor(Math.random()*-(this.roadHeight-60)))));
}

World.spawnExplosion = function(_location) {
	this.explosions.push(new Explosion(_location));
	AudioManager.playSFX('res/sfx/Explosion.ogg');
}

World.spawnZombies = function(_amount) {
	this.zombies = [];
	var min = 10;
	var max = this.roadHeight-10;
	for(let i = 0; i < _amount; i++) {
		var percent = i/(_amount-1);
		this.zombies.push(new Zombie(new Vector2(-20+Math.random()*30, -(min+percent*(max-min)))));
	}
}

World.getDriveSpeed = function() {
    return GameModes.current.getDriveSpeed();
}

World.shoveOffZombies = function() {
	for(let i = 0; i < this.zombies.length; i++)
		this.zombies[i].shoveOff();
}