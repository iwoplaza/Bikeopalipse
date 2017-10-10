function Map(_image, _location){
    this.current = undefined;
    this.route = undefined;
    this.selected = undefined;
    this.map = {
        location: _location,
        image: _image
    };
    this.cursor = {
        location: new Vector((canvas.width/(Camera.scale+1))/2, (canvas.height/(Camera.scale+1))/2),
        image: Resources.images['res/img/ui/selector.png']
    };
}
Map.prototype.move = function(_direction){
    switch(_direction){
        case 0:
            this.cursor.location.y -= 3;
            break;
        case 1:
            this.cursor.location.y += 3;
            break;
        case 2:
            this.cursor.location.x -= 3;
            break;
        case 3:
            this.cursor.location.x += 3;
            break;
    }
}
Map.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.map.location.x, this.map.location.y);
    ctx.drawImage(this.map.image, 0, 0, this.map.image.width, this.map.image.height);
    
    for (var i in this.nodes) this.nodes[i].draw();
    
    ctx.save();
    ctx.translate(this.cursor.location.x, this.cursor.location.y);
    ctx.drawImage(this.map.image, 0, 0, this.cursor.image.width, this.map.image.height);
    ctx.restore();
    
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