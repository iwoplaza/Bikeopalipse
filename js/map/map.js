function Map(_image, _location){
    this.current = undefined;
    this.route = undefined;
    this.selected = undefined;
    this.map = {
        location: _location,
        image: _image
    };
    this.cursor = {
        location: new Vector2((canvas.width/(Camera.scale+1))/2, (canvas.height/(Camera.scale+1))/2),
        image: Resources.images['res/img/ui/selector.png']
    };
    this.test();
}
Map.prototype.move = function(_direction){
    switch(_direction){
        case 0:
            this.map.location.y+=2;
            break;
        case 1:
            this.map.location.y-=2;
            break;
        case 2:
            this.map.location.x+=2;
            break;
        case 3:
            this.map.location.x-=2;
            break;
    }
}
Map.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.map.location.x, this.map.location.y);
    ctx.drawImage(this.map.image, 0, 0, this.map.image.width, this.map.image.height);
    for (var i in Node.prototype.List) Node.prototype.List[i].draw();
    ctx.restore();
    
    ctx.save();
    ctx.translate(this.cursor.location.x, this.cursor.location.y);
    ctx.drawImage(this.cursor.image, -this.cursor.image.width/2, -this.cursor.image.height/2, this.cursor.image.width, this.cursor.image.height);
    ctx.restore();
}
Map.prototype.setRoute = function(_id){
    this.route = (this.current.routes[_id]?this.current.routes[_id]:this.route);
}
Map.prototype.arrive = function(){
    this.current = (this.route.nodes[0]==this.current?this.route.nodes[1]:this.route.nodes[0]);
}
Map.prototype.test = function(){
    Node.prototype.create(0, new Vector2(118,102), "Start");
    Node.prototype.create(1, new Vector2(75,90));
    Node.prototype.create(2, new Vector2(36,108), "T2");
    Node.prototype.create(3, new Vector2(66,129), "T3");
    Node.prototype.create(4, new Vector2(35,185), "T4");
    Node.prototype.create(5, new Vector2(67,181), "T5");
    Node.prototype.create(6, new Vector2(87,222), "T6");
    Node.prototype.create(7, new Vector2(102,153), "T7");
    Node.prototype.create(8, new Vector2(145,140), "T8");
    Node.prototype.create(9, new Vector2(133,173));
    Node.prototype.create(10, new Vector2(154,201), "T10");
    Node.prototype.create(11, new Vector2(203,163), "T11");
    Node.prototype.create(12, new Vector2(165,115));
    Node.prototype.create(13, new Vector2(201,114), "T13");
    Node.prototype.create(14, new Vector2(166,77), "T14");
    Node.prototype.create(15, new Vector2(194,61), "T15");
    Node.prototype.create(16, new Vector2(158,41));
    Node.prototype.create(17, new Vector2(117,40), "T17");
    /*
    Route.prototype.create(Node.prototype.List[0],Node.prototype.List[1]);
    Route.prototype.create(Node.prototype.List[1],Node.prototype.List[2]);
    Route.prototype.create(Node.prototype.List[2],Node.prototype.List[0]);
    */
}