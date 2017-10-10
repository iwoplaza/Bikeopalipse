function Node(_id, _loc, _name, _demand){
    this.id = _id;
    this.location = _loc;
    this.name = _name;
    this.demand = _demand;
    this.routes = new Array(0);
}
Node.prototype.List = new Array();
Node.prototype.create = function(_id, _loc, _name, _demand){
    Node.prototype.List[_id] = new Node(_id, _loc, _name, _demand);
}
Node.prototype.draw = function(){
    ctx.save();
    //Draw some nodes...
    ctx.restore();
}