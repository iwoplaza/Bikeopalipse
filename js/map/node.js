function MapNode(_id, _loc, _name, _demand){
    this.id = _id;
    this.location = _loc;
    this.name = _name;
    this.demand = _demand;
    this.discovered = true;
    this.routes = new Array(0);
}
MapNode.prototype.list = new Array();
MapNode.prototype.create = function(_id, _loc, _name, _demand){
    MapNode.prototype.list[_id] = new MapNode(_id, _loc, _name, _demand);
}
MapNode.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.drawImage(MapNodes.mesh, MapNodes.image, 8*this.discovered, (this.name==undefined)*9, 8, 9);
    ctx.restore();
}
MapNode.prototype.getDist = function(_x, _y){
    return Math.sqrt(Math.pow(this.location.x+4-_x,2)+Math.pow(this.location.y+4.5-_y,2));
}
MapNodes = {};
MapNodes.init = function() {
	this.image = Resources.images['res/img/ui/node.png'];
	this.mesh = Draw.rectangle(0, 0, 0, 8, 9);
}