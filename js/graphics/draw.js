Draw = {};

Draw.rectangle = function(x, y, z, width, height, tx, ty, tw, th) {
	tx = tx ? tx : 0;
	ty = ty ? ty : 0;
	tw = tw ? tw : 1;
	th = th ? th : 1;
	
	var mesh = new Mesh();
	mesh.fillOut([
		x, y, z,
		x+width, y, z,
		x, y+height, z,
		
		x+width, y, z,
		x, y+height, z,
		x+width, y+height, z
	], undefined, [
		tx, ty,
		tx+tw, ty,
		tx, ty+th,
		
		tx+tw, ty,
		tx, ty+th,
		tx+tw, ty+th
	]);
	return mesh;
}

Draw.rectangle_solid = function(x, y, z, width, height, color) {
	tx = tx ? tx : 0;
	ty = ty ? ty : 0;
	tw = tw ? tw : 1;
	th = th ? th : 1;
	
	var mesh = new Mesh();
	mesh.fillOut([
		x, y, z,
		x+width, y, z,
		x, y+height, z,
		
		x+width, y, z,
		x, y+height, z,
		x+width, y+height, z
	], [
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3]
	], [
		0, 0,
		1, 0,
		0, 1,
		1, 0,
		0, 1,
		1, 1
	]);
	return mesh;
}