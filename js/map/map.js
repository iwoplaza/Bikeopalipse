function Map(_image, _location){
    this.test();
    this.current = undefined;
    this.route = undefined;
    this.selected = Node.prototype.List[0];;
    this.map = {
        location: _location,
        image: _image
    };
    this.selector = Resources.images['res/img/ui/selector.png'];
    this.cursor = new Vector2(((canvas.width/(Camera.scale+1))/2), ((canvas.height/(Camera.scale+1))/2));
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
Map.prototype.update = function(){
    this.selected = Node.prototype.List[0];
    for (var i=1;i<Node.prototype.List.length;i++){
        if (Node.prototype.List[i].getDist(this.cursor.x-this.map.location.x,this.cursor.y-this.map.location.y)<this.selected.getDist(this.cursor.x-this.map.location.x,this.cursor.y-this.map.location.y)) this.selected = Node.prototype.List[i];
    }
}
Map.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.map.location.x, this.map.location.y);
    ctx.drawImage(this.map.image, 0, 0, this.map.image.width, this.map.image.height);
    for (var i in Route.prototype.List) Route.prototype.List[i].draw();
    for (var i in Node.prototype.List) Node.prototype.List[i].draw();
    
    ctx.translate(this.selected.location.x,this.selected.location.y);
    ctx.drawImage(this.selector, Math.floor(-this.selector.width/(Camera.scale+1)),  Math.floor(-this.selector.height/(Camera.scale+1))+1, this.selector.width, this.selector.height);
    
    
    ctx.restore();
    
    ctx.save();
    ctx.translate(this.cursor.x, this.cursor.y);
    ctx.fillStyle = "#fff";
    ctx.fillRect(-1,-1,2,2);
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
    
    Route.prototype.create(Node.prototype.List[0],Node.prototype.List[1]);
    Route.prototype.create(Node.prototype.List[0],Node.prototype.List[14]);
    Route.prototype.create(Node.prototype.List[1],Node.prototype.List[2]);
    Route.prototype.create(Node.prototype.List[2],Node.prototype.List[3]);
    Route.prototype.create(Node.prototype.List[3],Node.prototype.List[4]);
    Route.prototype.create(Node.prototype.List[3],Node.prototype.List[7]);
    Route.prototype.create(Node.prototype.List[4],Node.prototype.List[5]);
    Route.prototype.create(Node.prototype.List[5],Node.prototype.List[6]);
    Route.prototype.create(Node.prototype.List[7],Node.prototype.List[5]);
    Route.prototype.create(Node.prototype.List[7],Node.prototype.List[9]);
    Route.prototype.create(Node.prototype.List[7],Node.prototype.List[8]);
    Route.prototype.create(Node.prototype.List[8],Node.prototype.List[0]);
    Route.prototype.create(Node.prototype.List[8],Node.prototype.List[11]);
    Route.prototype.create(Node.prototype.List[8],Node.prototype.List[12]);
    Route.prototype.create(Node.prototype.List[8],Node.prototype.List[9]);
    Route.prototype.create(Node.prototype.List[9],Node.prototype.List[10]);
    Route.prototype.create(Node.prototype.List[10],Node.prototype.List[11]);
    Route.prototype.create(Node.prototype.List[10],Node.prototype.List[11]);
    Route.prototype.create(Node.prototype.List[11],Node.prototype.List[13]);
    Route.prototype.create(Node.prototype.List[12],Node.prototype.List[14]);
    Route.prototype.create(Node.prototype.List[12],Node.prototype.List[13]);
    Route.prototype.create(Node.prototype.List[13],Node.prototype.List[15]);
    Route.prototype.create(Node.prototype.List[15],Node.prototype.List[14]);
    Route.prototype.create(Node.prototype.List[14],Node.prototype.List[16]);
    Route.prototype.create(Node.prototype.List[16],Node.prototype.List[17]);
    
}