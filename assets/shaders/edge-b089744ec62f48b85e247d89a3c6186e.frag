#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
varying vec2 v_texCoord;

const float RADIUS = 0.95;
const float SOFTNESS = 0.65;

vec4 ed(sampler2D iChannel0, vec2 fragCoord)
{

    vec2 uv = fragCoord.xy;
    vec2 position = fragCoord.xy/ vec2(0.6,1.0) - vec2(0.8,0.5) ;
	float len = length(position);
    float vignette = 1.0-smoothstep(RADIUS, RADIUS-SOFTNESS, len);
    float angle = dot(position, uv) / (length(position)*length(uv));
    vec2 screenPos = vec2(1.0)-( fragCoord.xy );
    float colorR = texture2D(iChannel0, uv-(vignette*(position*(len*0.015)))).r;
    float colorG = texture2D(iChannel0, uv).g;
    float colorB = texture2D(iChannel0, uv+(vignette*(position*(len*0.015)))).b;

    return vec4(colorR, colorG, colorB, 1.0);
	//fragColor = vec4(vignette);
    //fragColor = texture2D(iChannel0, uv);
}

void main()
{
   gl_FragColor=ed(u_texture,v_texCoord);
}



