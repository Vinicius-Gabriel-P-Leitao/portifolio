uniform float uTime;
varying vec3 vWorldPosition;
uniform vec3 uCameraPosition;

#define ITERATIONS 200   // antes 60
#define STEP_SIZE 0.3    // antes 0.15
#define BH_RADIUS 1.5          // Era 2.5 - buraco menor
#define DISK_INNER 2.5         // Era 3.5 - disco mais perto
#define DISK_OUTER 7.0         // Era 12.0 - disco menor
#define DISK_HEIGHT 0.4        // Era 0.8 - mais fino

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

float noise(vec3 x) {
  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n = p.x + p.y * 57.0 + 113.0 * p.z;
  return mix(mix(mix(hash(n + 0.0), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y), mix(mix(hash(n + 113.0), hash(n + 114.0), f.x), mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
}

float fbm(vec3 p) {
  float f = 0.0;
  float weight = 0.5;
  for(int i = 0; i < 3; i++) {
    f += weight * abs(noise(p));
    p *= 2.0;
    weight *= 0.5;
  }
  return f;
}

float getDensity(vec3 p) {
  float r = length(p.xz);
  float h = abs(p.y);

  // Fora do disco
  if(r < DISK_INNER || r > DISK_OUTER || h > DISK_HEIGHT * 3.0)
    return 0.0;

  // Ruído rotativo
  float angle = atan(p.z, p.x);
  vec3 coord = vec3(r * 1.5, angle * 4.0 + uTime * 1.5 + (8.0 / r), h * 4.0);

  float gas = fbm(coord);

  // Máscaras
  float fadeR = smoothstep(DISK_INNER, DISK_INNER + 1.0, r) *
    smoothstep(DISK_OUTER, DISK_OUTER - 3.0, r);

  float fadeH = exp(-h * (6.0 + r * 0.3));

  return max(0.0, (gas - 0.3)) * fadeR * fadeH * 2.0;
}

void main() {
  // Ray setup
  vec3 ro = uCameraPosition;
  vec3 rd = normalize(vWorldPosition - uCameraPosition);

  // Verificar se o raio intersecta a caixa do buraco negro
  float distToBH = length(ro);
  if(distToBH > 200.0) // antes 100
    discard;
    
  vec3 col = vec3(0.0);
  float alpha = 0.0;
  vec3 p = ro;

  // Dithering
  float dither = hash(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)));
  p += rd * dither * 0.2;

  for(int i = 0; i < ITERATIONS; i++) {
    float distToCenter = length(p);

  // CONTORNO BRANCO SÓLIDO - antes do horizonte
    float edgeDistance = abs(distToCenter - BH_RADIUS);
    float edgeWidth = 0.08; // Espessura do anel

    if(edgeDistance < edgeWidth) {
    // Anel branco sólido e brilhante
      vec3 edgeColor = vec3(5.0, 5.0, 5.0); // Branco super brilhante
      float edgeIntensity = smoothstep(edgeWidth, 0.0, edgeDistance);

      col = mix(col, edgeColor, edgeIntensity);
      alpha = max(alpha, edgeIntensity * 0.95);
    }

  // Horizonte de eventos - esfera preta
    if(distToCenter < BH_RADIUS - edgeWidth) {
      col = vec3(0.0);
      alpha = 1.0;
      break;
    }

  // Lente gravitacional (simplificada)
    float gravity = 0.25 / (distToCenter * distToCenter + 0.1);
    vec3 gravityDir = -normalize(p);
    rd = normalize(rd + gravityDir * gravity * STEP_SIZE);
  // ... resto continua igual

    // Avançar
    p += rd * STEP_SIZE;

    // Disco de acreção
    float density = getDensity(p);

    if(density > 0.01) {
      float r = length(p.xz);

      // Cores baseadas na temperatura
      float temp = smoothstep(DISK_OUTER, DISK_INNER, r);
      temp = clamp(temp + density * 0.5, 0.0, 1.0);

      vec3 coldColor = vec3(0.6, 0.1, 0.0);   // Vermelho escuro
      vec3 midColor = vec3(2.0, 0.8, 0.2);    // Laranja brilhante
      vec3 hotColor = vec3(3.0, 2.5, 2.0);    // Branco quente

      vec3 gasColor = mix(coldColor, midColor, smoothstep(0.0, 0.6, temp));
      gasColor = mix(gasColor, hotColor, smoothstep(0.6, 1.0, temp));

      // Acumular cor
      float contrib = density * 0.6;
      col += gasColor * contrib * (1.0 - alpha);
      alpha += contrib;

      if(alpha > 0.95)
        break;
    }

    // Parar se muito longe
    if(distToCenter > 40.0)
      break;
  }

  // Tone mapping
  col = col / (col + vec3(1.0)); // Reinhard
  col = pow(col, vec3(0.8)); // Gamma

  alpha = clamp(alpha, 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}