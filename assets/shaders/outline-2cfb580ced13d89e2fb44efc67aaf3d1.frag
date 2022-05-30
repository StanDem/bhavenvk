#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform vec4 u_outlineColor;

varying vec4 v_color;
varying vec2 v_texCoord;

const float smoothing = 1.0/16.0;
const float outlineWidth = 6.0/16.0;
const float outerEdgeCenter = 0.5 - outlineWidth;

float smoothsteps(float edge0,float edge1,float x){
 float t;
    t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}
void main() {
    float distance = texture2D(u_texture, v_texCoord).a;
    float alpha = smoothsteps(outerEdgeCenter - smoothing, outerEdgeCenter + smoothing, distance);
    float border = smoothsteps(0.5 - smoothing, 0.5 + smoothing, distance);
    gl_FragColor = vec4( v_color.rgb, alpha*v_color.a );
}
