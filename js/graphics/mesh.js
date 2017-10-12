function Mesh() {
    this.positionBuffer = gl.createBuffer();
    this.colorBuffer = gl.createBuffer();
    this.textureCoordBuffer = gl.createBuffer();
    
    this.draw = function(_context) {
		Shaders.enableAttribute('aVertexPosition');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        Shaders.vertexAttribPointer('aVertexPosition', this.positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

		Shaders.enableAttribute('aVertexColor');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        Shaders.vertexAttribPointer('aVertexColor', this.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

		Shaders.enableAttribute('aTextureCoord');
		gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
		Shaders.vertexAttribPointer('aTextureCoord', this.textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
        _context.publishMatrixUniforms();
		//Shaders.setUniform1i('uEnableTextures', _context.areTexturesEnabled());
        
        gl.drawArrays(gl.TRIANGLES, 0, this.positionBuffer.numItems);
		
		Shaders.disableAttribute('aVertexPosition');
		Shaders.disableAttribute('aVertexColor');
		Shaders.disableAttribute('aTextureCoord');
    };
    
    this.fillOut = function(vertices, colors, texCoords) {
        this.positionBuffer.itemSize = 3;
        this.positionBuffer.numItems = vertices.length/3;
        this.colorBuffer.itemSize = 4;
        this.colorBuffer.numItems = vertices.length/3;
        this.textureCoordBuffer.itemSize = 2;
        this.textureCoordBuffer.numItems = vertices.length/3;
        
        if(colors == undefined) {
            colors = new Array();
            for(var i = 0; i < this.colorBuffer.numItems; i++) {
                colors.push(1);
                colors.push(1);
                colors.push(1);
                colors.push(1);
            }
        }
        
        if(texCoords == undefined) {
            texCoords = new Array();
            for(var i = 0; i < this.textureCoordBuffer.numItems; i++) {
                texCoords.push(0);
                texCoords.push(0);
            }
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
    },
	
    this.cleanUp = function() {
        gl.deleteBuffer(this.vertices);
        gl.deleteBuffer(this.colorBuffer);
        gl.deleteBuffer(this.textureCoordBuffer);
    };
}