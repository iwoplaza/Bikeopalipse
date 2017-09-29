var Time = {
    delta: 0,
    deltaCap: 100,
    lastTime: Date.now(),
    
    update: function() {
        var now = Date.now();
        this.delta = (Math.max(0, Math.min(now-this.lastTime, this.deltaCap)))/1000;
        this.lastTime = now;
    }
};