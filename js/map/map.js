function Map(_image, _location, _size, _nodes){
    this.image = _image;
    this.location = _location;
    this.size = _size;
    this.current = 0;
    this.next = 0;
    this.dist = 0;
}
Map.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.drawImage(this.image, 0, 0, this.size.x, this.size.y);
    for (var i in this.nodes) this.nodes[i].draw();
    ctx.restore();
}
Map.prototype.setRoute = function(_id){
    this.dist = Node.prototype.List[this.current].setRoute(_id)|this.dist;

}
Map.prototype.update = function(){
    if (this.current == this.next){
        this.jump = 0;
        this.dist = 0;
    }
}