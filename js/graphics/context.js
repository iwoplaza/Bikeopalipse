function ContextState() {
	this.modelMatrix = mat4.create();
	this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
	mat4.identity(this.modelMatrix);
	mat4.identity(this.viewMatrix);
	mat4.identity(this.projectionMatrix);
}
ContextState.prototype.clone = function() {
	var state = new ContextState();
	state.modelMatrix = mat4.create(this.modelMatrix);
	state.viewMatrix = mat4.create(this.viewMatrix);
	state.projectionMatrix = mat4.create(this.projectionMatrix);
	return state;
}

function Context() {
	this.currentState = new ContextState();
	this.saveStates = [];
	
	this.texturesEnabled = true;
}

Context.prototype.areTexturesEnabled = function() {
	return this.texturesEnabled;
}

Context.prototype.translate = function(x, y, z) {
	mat4.translate(this.currentState.modelMatrix, [x, y ? y : 0, z ? z : 0]);
};
    
Context.prototype.rotate = function(angle) {
	mat4.rotate(this.currentState.modelMatrix, angle, [0, 0, 1]);
};

Context.prototype.scale = function(x, y) {
	mat4.scale(this.currentState.modelMatrix, [x, y, 1]);
};
    
Context.prototype.identityModel = function() {
	mat4.identity(this.currentState.modelMatrix);
};

Context.prototype.identityView = function() {
	mat4.identity(this.currentState.viewMatrix);
},

Context.prototype.identityProjection = function() {
	mat4.identity(this.currentState.projectionMatrix);
};

Context.prototype.publishMatrixUniforms = function() {
	gl.uniformMatrix4fv(Shaders.getUniformLocation('uMMatrix'), false, this.currentState.modelMatrix);
	gl.uniformMatrix4fv(Shaders.getUniformLocation('uVMatrix'), false, this.currentState.viewMatrix);
	gl.uniformMatrix4fv(Shaders.getUniformLocation('uPMatrix'), false, this.currentState.projectionMatrix);
};

Context.prototype.resetToWorldMatrix = function() {
	this.identityModel();
};
    
Context.prototype.ortho = function(p_left, p_right, p_bottom, p_top, p_near, p_far) {
	mat4.ortho(p_left, p_right, p_bottom, p_top, p_near, p_far, this.currentState.projectionMatrix);
};

Context.prototype.perspective = function(p_angle, p_ratio, p_near, p_far) {
	mat4.perspective(p_angle, p_ratio, p_near, p_far, this.currentState.projectionMatrix);
};

Context.prototype.save = function() {
	this.saveStates.push(this.currentState.clone());
};

Context.prototype.restore = function() {
	var lastSave = this.saveStates.pop();
	this.currentState = lastSave;
};

Context.prototype.handleStateErrors = function() {
	if(this.saveStates.length > 0) {
		console.error("[GL Helper] There are " + this.saveStates.length + " save states (0 expected).");
	}
};

Context.prototype.drawImage = function(mesh, image, x, y, w, h) {
	if(x == undefined) {
		Shaders.use('textured');
	}else{
		Shaders.use('cutout');
		Shaders.setUniform4f('uCutoutCoords', x/image.width, y/image.height, w/image.width, h/image.height);
	}
	Textures.bind(image);
	mesh.draw(this);
};