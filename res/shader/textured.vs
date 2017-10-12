attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec2 aTextureCoord;

uniform mat4 uMMatrix;
uniform mat4 uVMatrix;
uniform mat4 uPMatrix;
uniform float src_x;
uniform float src_y;
uniform float src_width;
uniform float src_height;

varying vec4 vColor;
varying vec2 vTextureCoord;

void main(void) {
	gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
	vColor = aVertexColor;
	vTextureCoord = aTextureCoord;
}