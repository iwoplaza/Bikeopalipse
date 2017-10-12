var Shaders = {
    database: [],
    current: null
}

Shaders.loadResource = function(name) {
	if(this.database[name] != undefined)
		return;

	this.database[name] = new Shader(name);
	this.database[name].downloadVertex();
};
    
Shaders.get = function(p_name) {
	return this.database[p_name];
};

Shaders.use = function(p_name) {
	this.get(p_name).use();
	this.current = this.get(p_name);
};

Shaders.getCurrent = function() {
	return this.current;
};

Shaders.getUniformLocation = function(p_name) {
	return gl.getUniformLocation(this.current.program, p_name);
};

Shaders.getAttribLocation = function(p_name) {
	return gl.getAttribLocation(this.current.program, p_name);
};

Shaders.vertexAttribPointer = function(attribute, size, type, flag, x, y) {
	gl.vertexAttribPointer(this.getAttribLocation(attribute), size, type, flag, x, y);
};

Shaders.enableAttribute = function(attribute) {
	gl.enableVertexAttribArray(this.getAttribLocation(attribute));
};

Shaders.disableAttribute = function(attribute) {
	gl.disableVertexAttribArray(this.getAttribLocation(attribute));
};

Shaders.setUniform1i = function(p_name, p_x) { gl.uniform1i(Shaders.getUniformLocation(p_name), p_x) };
Shaders.setUniform1f = function(p_name, p_x) { gl.uniform1f(Shaders.getUniformLocation(p_name), p_x) };
Shaders.setUniform2i = function(p_name, p_x, p_y) { gl.uniform2i(Shaders.getUniformLocation(p_name), p_x, p_y) };
Shaders.setUniform2f = function(p_name, p_x, p_y) { gl.uniform2f(Shaders.getUniformLocation(p_name), p_x, p_y) };
Shaders.setUniform3i = function(p_name, p_x, p_y, p_z) { gl.uniform3i(Shaders.getUniformLocation(p_name), p_x, p_y, p_z) };
Shaders.setUniform3f = function(p_name, p_x, p_y, p_z) { gl.uniform3f(Shaders.getUniformLocation(p_name), p_x, p_y, p_z) };
Shaders.setUniform4i = function(p_name, p_x, p_y, p_z, p_w) { gl.uniform4i(Shaders.getUniformLocation(p_name), p_x, p_y, p_z, p_w) };
Shaders.setUniform4f = function(p_name, p_x, p_y, p_z, p_w) { gl.uniform4f(Shaders.getUniformLocation(p_name), p_x, p_y, p_z, p_w) };