var World = {
    roadHeight: 210,
};

World.init = function() {
    this.obstacles = [];
    this.obstacleDelay = 10;
}

World.update = function() {
    Player.player.update();
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
}

World.draw = function() {
    ctx.save();
    ctx.translate(0, canvas.height);
    
    ctx.fillStyle = "#444";
    ctx.fillRect(0, -this.roadHeight, canvas.width, this.roadHeight);
    
    Player.player.draw();
    
    for(var key in this.obstacles) {
        this.obstacles[key].draw();
    }
    
    ctx.restore();
}

World.getDriveSpeed = function() {
    return 50000;
}