function Map(_image, _location){
    this.image = _image;
    this.location = _location;
    this.current = undefined;
    this.route = undefined;
}
Map.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
    for (var i in this.nodes) this.nodes[i].draw();
    ctx.restore();
}
Map.prototype.setRoute = function(_id){
    this.route = (this.current.routes[_id]?this.current.routes[_id]:this.route);
}
Map.prototype.arrive = function(){
    this.current = (this.route.nodes[0]==this.current?this.route.nodes[1]:this.route.nodes[0]);
}