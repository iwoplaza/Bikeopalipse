function Route(_A, _B){
    this.nodes = [_A, _B];
    this.length = Math.sqrt(Math.pow(_B.location.x-_A.location.x,2)+Math.pow(_B.location.y-_A.location.y,2));
    this.terrain = "normal";
    _A.routes[_B.id]=this;
    _B.routes[_A.id]=this;
}
Route.prototype.list = new Array(0);
Route.prototype.create = function(_A, _B){
    Route.prototype.list.push(new Route(_A, _B));
}
Route.prototype.draw = function(){
    LineRenderer.drawLine(this.nodes[0].location, this.nodes[1].location);
}