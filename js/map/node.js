function Node(_loc, _c, _n, _d, _id){
    this.location = _loc;
    this.connected = _c;
    this.name = _n;
    this.demand = _d;
    this.id = _id;
}
Node.prototype.List = new Array();
Node.prototype.create = function(_id, _loc, _c, _n, _d){
    Node.prototype.List[_id] = new Node(_loc, _c, _n, _d, _id);
}
Node.prototype.getRoute = function(_id){
    if (!this.name) return this.connected[_id];
}
Node.prototype.setRoute = function(_id){
    if (this.id == _id) return;
    if (this.connected[_id]!=undefined)
        return _id;
    else{
        for (var i in this.connected){
            if (Node.prototype.List[i]!=undefined){
                if (Node.prototype.List[i].getRoute(_id)!=undefined){
                    return parseInt(i);
                }
            }
        }
    }
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