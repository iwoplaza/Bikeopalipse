var LineRenderer = {};

LineRenderer.init = function() {
	this.meshPixel = Draw.rectangle_solid(0, 0, 0, 1, 1, [1, 1, 1, 1]);
};

LineRenderer.drawLine = function(_A, _B){
    let height = _A.y - _B.y;
    let width = _A.x - _B.x;
    let dir = (Math.abs(height)<Math.abs(width)?height:width)/(Math.abs(height)>Math.abs(width)?height:width);
    let counter = Math.abs(height)>Math.abs(width)?Math.abs(height):Math.abs(width);
	let margin = 5;
    
	let minX, minY;
	if (Math.abs(height) < Math.abs(width)) {
		minX = margin-1 + (width > 0?_B.x:_A.x);
		minY = margin-0.5 + (width > 0?_B.y:_A.y);
	}else{
		minX = margin-1 + (height < 0?_A.x:_B.x);
		minY = margin-0.5 + (height < 0?_A.y:_B.y);
	}
		
    for (let i = margin; i < counter-margin; i++){
        /*if (Math.abs(height) < Math.abs(width))
			ctx.drawSolid(Math.floor(4+(width > 0?_B.location.x:_A.location.x)+i), Math.floor(4.5+(width>0?_B.location.y:_A.location.y)+dir*i),1,1);
        else
			ctx.drawSolid(Math.floor(4+(height < 0?_A.location.x:_B.location.x)+dir*i), Math.floor(4.5+(height<0?_A.location.y:_B.location.y)+i),1,1);
		*/
		ctx.save();
			if (Math.abs(height) < Math.abs(width))
				ctx.translate(Math.floor(minX+i), Math.floor(minY+dir*i));
			else
				ctx.translate(Math.floor(minX+dir*i), Math.floor(minY+i));
			ctx.drawSolid(this.meshPixel);
		ctx.restore();
    }
};