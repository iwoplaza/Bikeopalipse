attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec2 aTextureCoord;

uniform mat4 uMMatrix;
uniform mat4 uVMatrix;
uniform mat4 uPMatrix;
uniform vec4 uColor;

varying vec4 vColor;
varying vec2 vTextureCoord;

void main(void) {
	gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
	vColor = aVertexColor * uColor;
	vTextureCoord = aTextureCoord;
}