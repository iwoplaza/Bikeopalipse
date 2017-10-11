function drawLine(_A, _B){
    var height = _A.location.y - _B.location.y;
    var width = _A.location.x - _B.location.x;
    var dir = (Math.abs(height)<Math.abs(width)?height:width)/(Math.abs(height)>Math.abs(width)?height:width);
    var counter = Math.abs(height)>Math.abs(width)?Math.abs(height):Math.abs(width);
    ctx.save();
    ctx.fillStyle = "#fff";
    for (var i=5;i<counter-5;i++){
        if (Math.abs(height)<Math.abs(width)) ctx.fillRect(Math.floor(4+(width>0?_B.location.x:_A.location.x)+i), Math.floor(4.5+(width>0?_B.location.y:_A.location.y)+dir*i),1,1);
        else ctx.fillRect(Math.floor(4+(height<0?_A.location.x:_B.location.x)+dir*i), Math.floor(4.5+(height<0?_A.location.y:_B.location.y)+i),1,1);
    }
    ctx.restore();
}