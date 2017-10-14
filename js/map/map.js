function Map(_image, _location){
    this.test();
    this.current = undefined;
    this.route = undefined;
    this.selected = MapNode.prototype.list[0];;
    this.map = {
        location: _location,
        image: _image
    };
    this.imageSelector = Resources.images['res/img/ui/selector.png'];
    this.cursor = new Vector2(((canvas.width/(Camera.scale+1))/2), ((canvas.height/(Camera.scale+1))/2));
	
	this.meshMap = Draw.rectangle(0, 0, 0, this.map.image.width, this.map.image.height);
	this.meshSelector = Draw.rectangle(-10, -8, 0, 28, 23);
	this.meshCursor = Draw.rectangle_solid(-1, -1, 0, 2, 2, [1, 1, 1, 1]);
	//(this.selector, Math.floor(-this.selector.width/(Camera.scale+1)),  Math.floor(-this.selector.height/(Camera.scale+1))+1, this.selector.width, this.selector.height);
};
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
};
Map.prototype.update = function(){
    this.selected = MapNode.prototype.list[0];
    for (var i=1;i<MapNode.prototype.list.length;i++){
        if (MapNode.prototype.list[i].getDist(this.cursor.x-this.map.location.x,this.cursor.y-this.map.location.y)<this.selected.getDist(this.cursor.x-this.map.location.x,this.cursor.y-this.map.location.y)) this.selected = MapNode.prototype.list[i];
    }
};
Map.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.map.location.x, this.map.location.y);
    ctx.drawImage(this.meshMap, this.map.image);
    for (let i in Route.prototype.list) Route.prototype.list[i].draw();
    for (let i in MapNode.prototype.list) MapNode.prototype.list[i].draw();
    
    ctx.translate(this.selected.location.x,this.selected.location.y);
    //ctx.drawImage(this.selector, Math.floor(-this.selector.width/(Camera.scale+1)),  Math.floor(-this.selector.height/(Camera.scale+1))+1, this.selector.width, this.selector.height);
	ctx.drawImage(this.meshSelector, this.imageSelector, 0, 0, 28, 23);
    
    ctx.restore();
    
    ctx.save();
    ctx.translate(this.cursor.x, this.cursor.y);
    ctx.drawSolid(this.meshCursor);
    ctx.restore();
};
Map.prototype.setRoute = function(_id){
    this.route = (this.current.routes[_id]?this.current.routes[_id]:this.route);
};
Map.prototype.arrive = function(){
    this.current = (this.route.nodes[0]==this.current?this.route.nodes[1]:this.route.nodes[0]);
};
Map.prototype.test = function(){
    MapNode.prototype.create(0, new Vector2(118,102), "Start");
    MapNode.prototype.create(1, new Vector2(75,90));
    MapNode.prototype.create(2, new Vector2(36,108), "T2");
    MapNode.prototype.create(3, new Vector2(66,129), "T3");
    MapNode.prototype.create(4, new Vector2(35,185), "T4");
    MapNode.prototype.create(5, new Vector2(67,181), "T5");
    MapNode.prototype.create(6, new Vector2(87,222), "T6");
    MapNode.prototype.create(7, new Vector2(102,153), "T7");
    MapNode.prototype.create(8, new Vector2(145,140), "T8");
    MapNode.prototype.create(9, new Vector2(133,173));
    MapNode.prototype.create(10, new Vector2(154,201), "T10");
    MapNode.prototype.create(11, new Vector2(203,163), "T11");
    MapNode.prototype.create(12, new Vector2(165,115));
    MapNode.prototype.create(13, new Vector2(201,114), "T13");
    MapNode.prototype.create(14, new Vector2(166,77), "T14");
    MapNode.prototype.create(15, new Vector2(194,61), "T15");
    MapNode.prototype.create(16, new Vector2(158,41));
    MapNode.prototype.create(17, new Vector2(117,40), "T17");
    
    Route.prototype.create(MapNode.prototype.list[0], MapNode.prototype.list[1]);
    Route.prototype.create(MapNode.prototype.list[0], MapNode.prototype.list[14]);
    Route.prototype.create(MapNode.prototype.list[1], MapNode.prototype.list[2]);
    Route.prototype.create(MapNode.prototype.list[2], MapNode.prototype.list[3]);
    Route.prototype.create(MapNode.prototype.list[3], MapNode.prototype.list[4]);
    Route.prototype.create(MapNode.prototype.list[3], MapNode.prototype.list[7]);
    Route.prototype.create(MapNode.prototype.list[4], MapNode.prototype.list[5]);
    Route.prototype.create(MapNode.prototype.list[5], MapNode.prototype.list[6]);
    Route.prototype.create(MapNode.prototype.list[7], MapNode.prototype.list[5]);
    Route.prototype.create(MapNode.prototype.list[7], MapNode.prototype.list[9]);
    Route.prototype.create(MapNode.prototype.list[7], MapNode.prototype.list[8]);
    Route.prototype.create(MapNode.prototype.list[8], MapNode.prototype.list[0]);
    Route.prototype.create(MapNode.prototype.list[8], MapNode.prototype.list[11]);
    Route.prototype.create(MapNode.prototype.list[8], MapNode.prototype.list[12]);
    Route.prototype.create(MapNode.prototype.list[8], MapNode.prototype.list[9]);
    Route.prototype.create(MapNode.prototype.list[9], MapNode.prototype.list[10]);
    Route.prototype.create(MapNode.prototype.list[10], MapNode.prototype.list[11]);
    Route.prototype.create(MapNode.prototype.list[10], MapNode.prototype.list[11]);
    Route.prototype.create(MapNode.prototype.list[11], MapNode.prototype.list[13]);
    Route.prototype.create(MapNode.prototype.list[12], MapNode.prototype.list[14]);
    Route.prototype.create(MapNode.prototype.list[12], MapNode.prototype.list[13]);
    Route.prototype.create(MapNode.prototype.list[13], MapNode.prototype.list[15]);
    Route.prototype.create(MapNode.prototype.list[15], MapNode.prototype.list[14]);
    Route.prototype.create(MapNode.prototype.list[14], MapNode.prototype.list[16]);
    Route.prototype.create(MapNode.prototype.list[16], MapNode.prototype.list[17]);
    
};