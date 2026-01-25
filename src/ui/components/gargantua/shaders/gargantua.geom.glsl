// NOTE: Referencia
// https://www.shadertoy.com/view/lstSRS
uniform float uTime;
varying vec3 vWorldPosition;
uniform vec3 uCameraPosition;

#define ITERATIONS 200   
#define STEP_SIZE 0.3    
#define BH_RADIUS 1.5          // NOTE: Buraco menor, horizonte de eventos
#define DISK_INNER 2.5         // NOTE: disco mais perto
#define DISK_OUTER 7.0         // NOTE: disco menor
#define DISK_HEIGHT 0.4        // NOTE: mais fino

float hash(float angle) {
  return fract(sin(angle) * 43758.5453123);
}

/*
* - O espaço 3D é dividido em uma grelha de cubos (voxels).
* - Para cada voxel, a função hash gera valores pseudo-aleatórios em cada canto.
* - frac = posição dentro do voxel, usada para interpolar suavemente entre os valores nos cantos.
* - mix(...) faz interpolações trilineares, criando transições suaves.
*/
float noise(vec3 pos) {
  vec3 base = floor(pos);
  vec3 frac = fract(pos);

  frac = frac * frac * (3.0 - 2.0 * frac);
  float n = base.x + base.y * 57.0 + 113.0 * base.z;

  // NOTE: Separado em variável para não zuar na formatação 
  float xy1 = mix(hash(n + 0.0), hash(n + 1.0), frac.x);
  float xy2 = mix(hash(n + 57.0), hash(n + 58.0), frac.x);
  float xy3 = mix(hash(n + 113.0), hash(n + 114.0), frac.x);
  float xy4 = mix(hash(n + 170.0), hash(n + 171.0), frac.x);

  return mix(mix(xy1, xy2, frac.y), mix(xy3, xy4, frac.y), frac.z);
}

float fractalBrownianMotion(vec3 pos) {
  float sum = 0.0;
  float amplitude = 0.5;

  for(int octave = 0; octave < 3; octave++) {
    sum += amplitude * abs(noise(pos));
    pos *= 2.0;
    amplitude *= 0.5;
  }

  return sum;
}

float getDensity(vec3 samplePos) {
  float radius = length(samplePos.xz);
  float height = abs(samplePos.y);

  if(radius < DISK_INNER || radius > DISK_OUTER || height > DISK_HEIGHT * 3.0)
    return 0.0;

  // NOTE: Ruído rotativo
  float angle = atan(samplePos.z, samplePos.x);
  // NOTE: Necessário para não ter corte bruto no horizonte e na "fumaça"
  vec2 angleCoords = vec2(cos(angle), sin(angle));
  vec3 noiseCoord = vec3(radius * 1.5, angleCoords.x * 4.0, angleCoords.y * 4.0) + vec3(0.0, 0.0, height * 4.0);

  float relativisticJets = fractalBrownianMotion(noiseCoord);

  // NOTE: Máscaras
  float fadeR = smoothstep(DISK_INNER, DISK_INNER + 1.0, radius) * smoothstep(DISK_OUTER, DISK_OUTER - 3.0, radius);
  float fadeH = exp(-height * (6.0 + radius * 0.3));

  return max(0.0, (relativisticJets - 0.2)) * fadeR * fadeH * 2.0;
}

void main() {
  vec3 rayOrigin = uCameraPosition;
  vec3 rayDir = normalize(vWorldPosition - uCameraPosition);

  // NOTE: Descarta fragmentos muito longe do buraco negro
  float distanceFromOrigin = length(rayOrigin);
  if(distanceFromOrigin > 200.0)
    discard;

  vec3 finalColor = vec3(0.0);
  float alphaAccum = 0.0;
  vec3 samplePos = rayOrigin;   // NOTE: Posição atual do raio

  float dither = hash(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)));
  samplePos += rayDir * dither * 0.2;

  for(int step = 0; step < ITERATIONS; step++) {
    float distanceToCenter = length(samplePos);

    // NOTE: Anel branco sólido antes do horizonte
    float edgeDistance = abs(distanceToCenter - BH_RADIUS);
    float edgeWidth = 0.04;

    if(edgeDistance < edgeWidth) {
      vec3 edgeColor = vec3(1.0); // NOTE: Cinza fraquinho
      float edgeIntensity = smoothstep(edgeWidth, 0.0, edgeDistance);

      finalColor = mix(finalColor, edgeColor, edgeIntensity);
      alphaAccum = max(alphaAccum, edgeIntensity * 0.95);
    }

    // NOTE: Horizonte de eventos
    if(distanceToCenter < BH_RADIUS - edgeWidth) {
      finalColor = vec3(0.0);
      alphaAccum = 1.0;
      break;
    }

    // NOTE: Lente gravitacional simplificada
    float gravityStrength = 0.25 / (distanceToCenter * distanceToCenter + 0.1);
    vec3 gravityDir = -normalize(samplePos);
    rayDir = normalize(rayDir + gravityDir * gravityStrength * STEP_SIZE);

    samplePos += rayDir * STEP_SIZE;

    // NOTE: "FUMAÇA" em volta do buraco
    float relativisticJets = getDensity(samplePos);

    if(relativisticJets > 0.01) {
      float radius = length(samplePos.xz);

      // NOTE: Cores baseadas na "temperatura" do gás
      float temp = smoothstep(DISK_OUTER, DISK_INNER, radius);
      temp = clamp(temp + relativisticJets * 0.5, 0.0, 1.0);

      vec3 coldColor = vec3(0.6, 0.1, 0.0);
      vec3 midColor = vec3(2.0, 0.8, 0.2);
      vec3 hotColor = vec3(3.0, 2.5, 4.0);

      vec3 gasColor = mix(coldColor, midColor, smoothstep(0.0, 0.6, temp));
      gasColor = mix(gasColor, hotColor, smoothstep(0.6, 1.0, temp));

      // NOTE: Acumula cor e alpha
      float contribution = relativisticJets * 0.6;
      finalColor += gasColor * contribution * (1.0 - alphaAccum);
      alphaAccum += contribution;

      if(alphaAccum > 0.95)
        break;
    }

    // NOTE: Para se estiver muito longe
    if(distanceToCenter > 40.0)
      break;
  }

  finalColor = finalColor / (finalColor + vec3(1.0));     // NOTE: Reinhard
  finalColor = pow(finalColor, vec3(0.8));           // NOTE: Gamma

  alphaAccum = clamp(alphaAccum, 0.0, 1.0);

  gl_FragColor = vec4(finalColor, alphaAccum);
}
