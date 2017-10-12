function Shader(_name) {
	this.name = _name ? _name : "";
}

Shader.prototype.downloadVertex = function() {
	var xmlhttp = new XMLHttpRequest();
	var me = this;
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
			me.compileVertex(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", "res/shader/"+this.name+".vs", true);
	xmlhttp.send();
}

Shader.prototype.downloadFragment = function() {
	var xmlhttp = new XMLHttpRequest();
	var me = this;
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
			me.compileFragment(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", "res/shader/"+this.name+".fs", true);
	xmlhttp.send();
}


Shader.prototype.compileVertex = function(code) {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);

	gl.shaderSource(vertexShader, code);
	gl.compileShader(vertexShader);

	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		alert("Vertex Shader Error: "+gl.getShaderInfoLog(vertexShader));
		return null;
	}

	this.vertexShader = vertexShader;
	
	this.downloadFragment();
}

Shader.prototype.compileFragment = function(code) {
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	
	gl.shaderSource(fragmentShader, code);
	gl.compileShader(fragmentShader);

	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		alert("Fragment Shader Error: "+gl.getShaderInfoLog(fragmentShader));
		return null;
	}
	
	this.fragmentShader = fragmentShader;
	
	this.create();
}

Shader.prototype.create = function() {
	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, this.vertexShader);
	gl.attachShader(shaderProgram, this.fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}
	this.program = shaderProgram;
	
	Resources.loadNextShader();
}

Shader.prototype.use = function() {
	gl.useProgram(this.program);
}