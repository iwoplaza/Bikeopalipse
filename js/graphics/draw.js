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

Draw.bar_horizontal = function(width, height) {
	var mesh = new Mesh();
	mesh.fillOut([
		0, 0, 0,
		0+width, 0, 0,
		0, 0+height, 0,
		
		0+width, 0, 0,
		0, 0+height, 0,
		0+width, 0+height, 0
	], undefined, [
		0, 0,
		1, 0,
		0, 1,
		1, 0,
		0, 1,
		1, 1
	]);
	return mesh;
}

Draw.rectangle_solid = function(x, y, z, width, height, color) {
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

Draw.rectangle_stroke_solid = function(x, y, z, width, height, thickness, color) {
	var mesh = new Mesh();
	mesh.fillOut([
		//Left
		x-thickness, y, z,
		x, y, z,
		x-thickness, y+height, z,
		
		x, y, z,
		x-thickness, y+height, z,
		x, y+height, z,
		
		//Right
		x+width, y, z,
		x+width+thickness, y, z,
		x+width, y+height, z,
		
		x+width+thickness, y, z,
		x+width, y+height, z,
		x+width+thickness, y+height, z,
		
		//Top
		x, y-thickness, z,
		x+width, y-thickness, z,
		x, y, z,
		
		x+width, y-thickness, z,
		x, y, z,
		x+width, y, z,
		
		//Bottom
		x, y+height, z,
		x+width, y+height, z,
		x, y+height+thickness, z,
		
		x+width, y+height, z,
		x, y+height+thickness, z,
		x+width, y+height+thickness, z
	], [
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3],
		color[0], color[1], color[2], color[3]
	], [
		0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
		0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
		0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
		0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1
	]);
	return mesh;
}