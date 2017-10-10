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
Map.prototype.test = function(){
    Node.prototype.create(0, new Vector2(0,0), "Start", 0);
    Node.prototype.create(1, new Vector2(10,5), "T1", 0);
    Node.prototype.create(2, new Vector2(0,10), "T2", 0);
    Route.prototype.create(Node.prototype.List[0],Node.prototype.List[1]);
    Route.prototype.create(Node.prototype.List[1],Node.prototype.List[2]);
    Route.prototype.create(Node.prototype.List[2],Node.prototype.List[0]);
}