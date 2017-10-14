precision mediump float;

uniform sampler2D uDiffuseMap;

varying vec4 vColor;
varying vec2 vTextureCoord;

void main(void) {
	gl_FragColor = texture2D(uDiffuseMap, vTextureCoord) * vColor;
}