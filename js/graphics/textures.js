//The TextureManager handles all-things textures.

var Textures = {}

Textures.bind = function(image) {
	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, image.id);
    gl.uniform1i(Shaders.getUniformLocation('uDiffuseMap'), 0);
}

Textures.bindPath = function(path) {
    Textures.bind(Resources.images[path]);
}