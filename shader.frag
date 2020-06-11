#ifdef GL_ES

precision mediump float;

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
mat2 m = mat2( 0.8,  0.6, -0.6,  0.6 );

float hash( float n )
{
	return fract(sin(n)*43758.5453);
}

float noise( in vec2 x )
{
	vec2 p = floor(x);
	vec2 f = fract(x);
	f = f*f*(3.0-2.0*f);
	float n = p.x + p.y*57.0;
	float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x), mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
	return res;
}

float fbm( vec2 p )
{
	float f = 0.0;
	f += 0.50000*noise( p ); p = m*p*2.02;
	f += 0.25000*noise( p ); p = m*p*2.03;
	f += 0.12500*noise( p ); p = m*p*2.01;
	f += 0.06250*noise( p ); p = m*p*2.04;
	f += 0.03125*noise( p );
	return f/0.984375;
}

float length2( vec2 p )
{
	float ax = abs(p.x);
	float ay = abs(p.y);
	return pow( pow(ax,4.0) + pow(ay,4.0), 1.0/4.0 );
}

vec3 colA = vec3(1.0, 0.0, 0.0);
vec3 colB = vec3(0.0, 1.0, 0.0); 
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
	vec2 m = -1.0 + 2.0 * u_position.xy / u_resolution.xy; // Remap the incoming position between -1 and 1. 
	m.y = -m.y; // Remap the y as per the world coordinates (since y is flipped in the shader world). 
	m.x *= factor; // Remap incoming position based on the factor. 

	// Distance field (for the eye) 
	// float d = distance(p, m)/abs(sin(u_time*0.2));
	// vec3 col = mix(colA, colB, d); 

	// Animate upper and lower eyelid. 
	float lowerLid = step(-2.0 + cos(u_time*0.2)*2.05, p.y); 
	vec3 l = vec3(lowerLid); 
	float upperLid = step(-1.0 + cos(u_time*0.2)*2.05, 1.0-p.y);
	vec3 u = vec3(upperLid); 

	// [TODO] Receive this as a uniform based on screen size. 
	float minRadius = 0.1; 
	float pupilBlurDistance = 0.1; // Constant value. 
	float rad_pupil = minRadius + abs(sin(u_time*0.5) * 0.1);
	
	vec2 ctr1 = m;
	vec2 ctr2 = 0.40 * m;
	vec2 ctr3 = 0.03 * m;
	
	// Pupil.
	float r1 = distance(p, ctr1); // Distance field from the pupil. 
	float r2 = distance(p, ctr2);
	float r3 = distance(p, ctr3);

	// // EXTERIOR.
	vec3 col = vec3(0.062, 0.670, 0.796);
	// //vec3 col = vec3(0.859, 0.11, 0.424);

	vec3 iris1, iris2;

	// Individually mix R, G, and B. 
	iris1.x = 0.1 + 0.3*fbm(2.3*p + vec2(u_time*0.4, u_time*0.5)); // R
	iris1.y = 0.3 + 0.4*fbm(4.3*p + vec2(u_time*0.1, u_time*0.2)); // G
	iris1.z = 0.2 + 0.4*fbm(1.3*p + vec2(u_time*0.3, u_time*0.3)); // B 

	// iris2.x = 0.9 + 0.2*fbm(1.7*p + vec2(u_time*0.2, u_time*0.3));
	// iris2.y = 0.4 + 0.4*fbm(3.1*p + vec2(u_time*0.3, u_time*0.4));
	// iris2.z = 0.0 + 0.4*fbm(2.3*p + vec2(u_time*0.1, u_time*0.2));

	// // INTERIOR.
	float f = fbm( 5.0*(p-ctr2)+u_time);
	col = mix( col, iris1, f );
	// col = mix( col, iris2, smoothstep(0.9,0.2, (r1+r2)/5.0) );
           
	// float a = atan( abs(p.y-ctr1.y), p.x-ctr1.x );
	// a += 0.05*fbm( 10.0*p+u_time*0.5 );
	// f = smoothstep( 0.3, 1.0, fbm( vec2(20.0*a,6.0*r2) ) );
	// col = mix( col, vec3(0.77255, 0.78039, 0.78039), f );
    
	// f = smoothstep(0.4, 0.9, fbm( vec2(15.0*a,10.0*((r1+r3)/2.0)) ) );
	// col *= 1.0-0.5*f;
	// col *= 1.0-0.1*smoothstep( 0.6,0.8, r1 );	
	// vec3 col = vec3(1.0); 
	col = mix(col, vec3(0.11765, 0.12549, 0.13333), smoothstep(r3, r3 + pupilBlurDistance, rad_pupil));
	
	gl_FragColor = vec4(col,1.0);
}


// Add a blinker