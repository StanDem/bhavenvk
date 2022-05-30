#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
//uniform float shift;
uniform float k;

uniform float brightness;
uniform float contrast;
uniform float saturation;
varying vec2 v_texCoord;

vec4 sat(vec4 pixelColor)
{
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(pixelColor.rgb, W));

    return vec4(mix(intensity, pixelColor.rgb, saturation),pixelColor.a);
}

vec4 cb(vec4 pixelColor)
{
  pixelColor.rgb /= pixelColor.a;
  pixelColor.rgb = ((pixelColor.rgb - 0.5) * max(contrast, 0.0)) + 0.5;
  pixelColor.rgb += brightness;
  pixelColor.rgb *= pixelColor.a;
 return pixelColor;
}



vec4 distort(sampler2D s0, vec2 tex)
{
        float r3 = (tex.x-0.5) * (tex.x-0.5);

        float fx = 1.0+ r3*k;
        
        float x = fx*(tex.x-0.5)+0.5;
        float y = fx*fx*(tex.y-0.5)+0.5;
        vec4 inputDistord;;
        if (x<0.0||y<0.0||x>1.0||y>1.0) inputDistord = vec4(0.0,0.0,0.0,0.0);
        else
        inputDistord = texture2D(s0,vec2(x,y));
       
        return vec4(inputDistord.r,inputDistord.g,inputDistord.b,1.0);
}

void main()
{
  vec4 v4=distort(u_texture,v_texCoord);
  gl_FragColor = sat(cb(v4));
}



