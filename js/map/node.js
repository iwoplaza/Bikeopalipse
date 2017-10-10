function Node(_id, _loc, _name, _demand){
    this.id = _id;
    this.location = _loc;
    this.name = _name;
    this.demand = _demand;
    this.discovered = true;
    this.routes = new Array(0);
    this.image = Resources.images['res/img/ui/node.png'];
}
Node.prototype.List = new Array();
Node.prototype.create = function(_id, _loc, _name, _demand){
    Node.prototype.List[_id] = new Node(_id, _loc, _name, _demand);
}
Node.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.drawImage(this.image, 8*this.discovered, (this.name==undefined)*9, 8, 9, 0, 0, 8, 9);
    ctx.restore();
}