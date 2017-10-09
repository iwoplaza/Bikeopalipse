function Node(_loc, _connected, _name, _demand, _id){
    this.location = _loc;
    this.connected = _connected;
    this.name = _name;
    this.demand = _demand;
    this.id = _id;
}
Node.prototype.List = new Array();
Node.prototype.create = function(_id, _loc, _c, _n, _d){
    Node.prototype.List[_id] = new Node(_loc, _c, _n, _d, _id);
}
Node.prototype.setRoute = function(_id){
    if (this.id == _id) return 0;
    if (this.connected[_id]!=undefined)
        return this.connected[_id];
    return undefined;
}
Node.prototype.draw = function(){
    ctx.save();
    
    ctx.restore();
}
function test(){
    Node.prototype.create(0,new Vector2(0,0), {"1": 10, "2": 20});
    Node.prototype.create(1,new Vector2(0,0), {"0": 10},"T1");
    Node.prototype.create(2,new Vector2(0,0), {"0": 20},"T2");
}