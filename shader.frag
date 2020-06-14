#ifdef GL_ES

precision highp float;

#endif

// ------------------------------------------------------- //
// INNER SITE OF MY EXISTENCE.
// ------------------------------------------------------- //
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_position;

// ------------------------------------------------------- //
// MOTION
// ------------------------------------------------------- //
const mat2 m = mat2( 0.036,  0.736, -1.256,  0.400 );

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm4( vec2 p )
{
    float f = 0.0;
    f += 0.5000*noise( p ); p = m*p*2.02;
    f += 0.2500*noise( p ); p = m*p*2.03;
    f += 0.1250*noise( p ); p = m*p*2.01;
    f += 0.0625*noise( p );
    return f/0.9375;
}

float pattern(in vec2 p) {
    vec2 q = vec2(0.0, 0.0);
    q.x = fbm4(p + vec2(0.142*u_time,0.096*u_time)); 
    q.y = fbm4(p + vec2(0.150,0.0300)); 
    return fbm4(p + 4.0*q); 
}

// ------------------------------------------------------- //
// BEGIN.
// ------------------------------------------------------- //
void main(void)
{    
	vec2 st = gl_FragCoord.xy / u_resolution.xy; 
	float factor = (u_resolution.x/u_resolution.y); 

	// Screen
	vec2 p = -1.0 + 2.0 * st; // Remap the space between -1 and 1. 
	p.x *= factor; // Remap x-space based on the factor.

	// Pupil's position
	vec2 cPos = -1.0 + 2.0 * u_position.xy / u_resolution.xy; // Remap the incoming position between -1 and 1. 
	cPos.y = -cPos.y; // Remap the y as per the world coordinates (since y is flipped in the shader world). 
	cPos.x *= factor; // Remap incoming position based on the factor. 

	// Animate upper and lower eyelid. 
	float lowerLid = step(-2.0 + cos(u_time*0.10)*2.05, p.y); 
	vec3 l = vec3(lowerLid); 
	float upperLid = step(-1.0 + cos(u_time*0.10)*2.05, 1.0-p.y);
	vec3 u = vec3(upperLid); 

	// [TODO] Receive this as a uniform.
	float minRadius = 0.1; 
	float pupilAmplitude = 0.10;
	float pupilBlurDistance = 0.1; // Constant value. 
	vec3 pupilColor = vec3(0.0); 
	float rad_pupil = minRadius + abs(sin(u_time*0.2) * pupilAmplitude);

	// Distance field of the current position
	float d = distance(cPos, p); 

	// All the colors. 
	vec3 col = vec3(1.000,0.000,0.413);  
	vec3 irisA = vec3(0.657,0.990,0.822);
	vec3 irisB = vec3(0.001,0.073,0.900); 
	vec3 irisC = vec3(0.132,0.740,0.605); 

    irisA.r = irisA.r + fbm4(0.8*p + vec2(0.176 * u_time, 0.368 * u_time)); 
	irisA.g = irisA.g + fbm4(2.836*p + vec2(0.590 * u_time, 0.392 * u_time));
    irisA.b = irisA.b + fbm4(2.316*p + vec2(0.240 * u_time, 0.236 * u_time));

	irisB.x = irisB.r + fbm4(1.7*p + vec2(u_time*0.2, u_time*0.3));
	irisB.y = irisB.g + fbm4(3.1*p + vec2(u_time*0.3, u_time*0.4));
	irisB.z = irisB.b + fbm4(2.3*p + vec2(u_time*0.1, u_time*0.2));

	// Background
    float f = clamp((fbm4(abs(0.5*p) + pattern(abs(p*20.0)) + -u_time*0.1)), 0.0, 1.0);
	//f = fbm4(5.0*p + u_time*0.5); 
    col = mix(col, irisA, f);

	// // // Center halo. 
	//col = mix(col, irisB, smoothstep(0.4, 0.6+abs(sin(u_time*0.25))*1.5, d));
	// col = mix(col, irisB, pattern(abs(p*1.0) - u_time*0.1));

	// // // White streaks
	// float a = atan(abs(p.y-cPos.y), p.x-cPos.x)*1.5;
	// a += 0.02*fbm4(5.0*p + u_time*1.0);
	// f = smoothstep(abs(sin(u_time*0.25))*0.001, 1.0, fbm4(vec2(20.0*a, abs(sin(u_time*0.25))*5.0*d)));
	// col = mix(col, irisC, f);

	// // // Dark streaks
	// f = smoothstep(0.4, 0.9, fbm4(vec2(15.0*a, 15.0*d)));
	// col *= 1.0-0.5*f;
	// col *= 1.0-0.1*smoothstep(0.6,0.8,d);	
	
	// [Note] col here should be the color of the background + iris
	//col = mix(col, pupilColor, smoothstep(d, d + pupilBlurDistance, rad_pupil));

	col = col*l*u;
	
	gl_FragColor = vec4(col,1.0);
}