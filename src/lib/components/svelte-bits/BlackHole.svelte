<script lang="ts">
	import { onMount } from 'svelte';
	import { Renderer, Camera, Transform, Sphere, Program, Mesh, Vec3 } from 'ogl';

	type Props = {
		class?: string;
		style?: string;
		enableMouseInteraction?: boolean;
		speed?: number;
		iterations?: number;
	};

	let {
		class: className = '',
		style = '',
		enableMouseInteraction = true,
		speed = 0.5,
		iterations = 100
	}: Props = $props();

	let containerRef: HTMLDivElement;

	const VERTEX_SHADER = `
		attribute vec3 position;
		attribute vec3 normal;
		attribute vec2 uv;

		uniform mat4 modelMatrix;
		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		varying vec3 vPosition;
		varying vec3 vWorldPosition;

		void main() {
			vPosition = position;
			vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

	const FRAGMENT_SHADER = `
		precision highp float;

		uniform float uTime;
		uniform vec3 uCameraPosition;
		uniform int uIterations;

		varying vec3 vWorldPosition;

		#define STEP_SIZE 0.3    
		#define BH_RADIUS 1.5          // Horizonte de eventos
		#define DISK_INNER 1.8         // Disco inicio
		#define DISK_OUTER 8.0         // Disco fim
		#define DISK_HEIGHT 0.4        // Espessura

		float hash(float angle) {
			return fract(sin(angle) * 43758.5453123);
		}

		float noise(vec3 pos) {
			vec3 base = floor(pos);
			vec3 frac = fract(pos);

			frac = frac * frac * (3.0 - 2.0 * frac);
			float angle = base.x + base.y * 57.0 + 113.0 * base.z;

			float xy1 = mix(hash(angle + 0.0), hash(angle + 1.0), frac.x);
			float xy2 = mix(hash(angle + 57.0), hash(angle + 58.0), frac.x);
			float xy3 = mix(hash(angle + 113.0), hash(angle + 114.0), frac.x);
			float xy4 = mix(hash(angle + 170.0), hash(angle + 171.0), frac.x);

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

			float angle = atan(samplePos.z, samplePos.x);
			vec2 angleCoords = vec2(cos(angle), sin(angle));
			vec3 noiseCoord = vec3(radius * 1.5, angleCoords.x * 4.0 + uTime * 1.5, angleCoords.y * 4.0 + height * 4.0 + uTime * 1.2);

			float relativisticJets = fractalBrownianMotion(noiseCoord);

			float fadeR = smoothstep(DISK_INNER, DISK_INNER + 1.0, radius) * smoothstep(DISK_OUTER, DISK_OUTER - 3.0, radius);
			float fadeH = exp(-height * (6.0 + radius * 0.3));

			return max(0.0, (relativisticJets - 0.2)) * fadeR * fadeH * 2.0;
		}

		void main() {
			vec3 rayOrigin = uCameraPosition;
			vec3 rayDir = normalize(vWorldPosition - uCameraPosition);

			float distanceFromOrigin = length(rayOrigin);
			if(distanceFromOrigin > 200.0)
				discard;

			vec3 finalColor = vec3(0.0);
			float alphaAccum = 0.0;
			vec3 samplePos = rayOrigin;

			float dither = hash(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)));
			samplePos += rayDir * dither * 0.2;

			for(int step = 0; step < 100; step++) {
				if (step >= uIterations) break;

				float distanceToCenter = length(samplePos);

				float edgeDistance = abs(distanceToCenter - BH_RADIUS);
				float edgeWidth = 0.04;

				if(edgeDistance < edgeWidth) {
					vec3 edgeColor = vec3(1.0);
					float edgeIntensity = smoothstep(edgeWidth, 0.0, edgeDistance);

					finalColor = mix(finalColor, edgeColor, edgeIntensity);
					alphaAccum = max(alphaAccum, edgeIntensity * 0.95);
				}

				if(distanceToCenter < BH_RADIUS - edgeWidth) {
					finalColor = vec3(0.0);
					alphaAccum = 1.0;
					break;
				}

				float gravityStrength = 1.0 / (distanceToCenter * distanceToCenter + 0.1);
				vec3 gravityDir = -normalize(samplePos);
				rayDir = normalize(rayDir + gravityDir * gravityStrength * STEP_SIZE);

				samplePos += rayDir * STEP_SIZE;

				float relativisticJets = getDensity(samplePos);

				if(relativisticJets > 0.01) {
					float radius = length(samplePos.xz);

					float temp = smoothstep(DISK_OUTER, DISK_INNER, radius);
					temp = clamp(temp + relativisticJets * 0.5, 0.0, 1.0);

					vec3 coldColor = vec3(0.6, 0.1, 0.0);
					vec3 midColor = vec3(2.0, 0.8, 0.2);
					vec3 hotColor = vec3(3.0, 2.5, 4.0);

					vec3 gasColor = mix(coldColor, midColor, smoothstep(0.0, 0.6, temp));
					gasColor = mix(gasColor, hotColor, smoothstep(0.6, 1.0, temp));

					float contribution = relativisticJets * 1.5;
					finalColor += gasColor * contribution * (1.0 - alphaAccum);
					alphaAccum += contribution;

					if(alphaAccum > 0.95)
						break;
				}

				if(distanceToCenter > 40.0)
					break;
			}

			finalColor = finalColor / (finalColor + vec3(1.0));
			finalColor = pow(finalColor, vec3(0.8));

			alphaAccum = clamp(alphaAccum, 0.0, 1.0);

			gl_FragColor = vec4(finalColor, alphaAccum);
		}
	`;

	onMount(() => {
		const renderer = new Renderer({
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance',
			dpr: Math.min(window.devicePixelRatio || 1, 2)
		});
		const gl = renderer.gl;

		containerRef.appendChild(gl.canvas);

		const camera = new Camera(gl, { fov: 45, near: 0.1, far: 1000 });
		camera.position.set(0, 4, 18);
		camera.lookAt([0, 0, 0]);

		const scene = new Transform();

		const geometry = new Sphere(gl, { radius: 60, widthSegments: 48, heightSegments: 48 });

		const uniforms = {
			uTime: { value: 0 },
			uCameraPosition: { value: camera.position },
			uIterations: { value: iterations }
		};

		const program = new Program(gl, {
			vertex: VERTEX_SHADER,
			fragment: FRAGMENT_SHADER,
			uniforms,
			transparent: true,
			cullFace: false
		});

		const mesh = new Mesh(gl, { geometry, program });
		mesh.setParent(scene);

		const setSize = () => {
			const width = containerRef.clientWidth || window.innerWidth;
			const height = containerRef.clientHeight || window.innerHeight;
			renderer.setSize(width, height);
			camera.perspective({ aspect: width / height });
		};

		setSize();
		window.addEventListener('resize', setSize);

		// Mouse movement interaction
		let mouseX = 0;
		let mouseY = 0;
		let targetX = 0;
		let targetY = 0;

		const handleMouseMove = (e: MouseEvent) => {
			if (!enableMouseInteraction) return;
			const { innerWidth, innerHeight } = window;
			targetX = ((e.clientX / innerWidth) - 0.5) * 4;
			targetY = ((e.clientY / innerHeight) - 0.5) * 2;
		};

		if (enableMouseInteraction) {
			window.addEventListener('mousemove', handleMouseMove);
		}

		let animationFrameId: number;
		let startTime = performance.now();

		const update = () => {
			const elapsed = (performance.now() - startTime) / 1000;
			program.uniforms.uTime.value = elapsed * speed;

			// Smooth camera mouse float
			mouseX += (targetX - mouseX) * 0.05;
			mouseY += (targetY - mouseY) * 0.05;

			camera.position.x = mouseX * 2;
			camera.position.y = 4 + mouseY * 1.5;
			camera.position.z = 18;
			camera.lookAt([0, 0, 0]);

			// Update uCameraPosition uniform
			program.uniforms.uCameraPosition.value.copy(camera.position);

			// Gentle rotation
			mesh.rotation.y = elapsed * 0.05;

			renderer.render({ scene, camera });
			animationFrameId = requestAnimationFrame(update);
		};

		animationFrameId = requestAnimationFrame(update);

		return () => {
			window.removeEventListener('resize', setSize);
			if (enableMouseInteraction) {
				window.removeEventListener('mousemove', handleMouseMove);
			}
			cancelAnimationFrame(animationFrameId);
			if (gl.canvas.parentElement === containerRef) {
				containerRef.removeChild(gl.canvas);
			}
		};
	});
</script>

<div
	bind:this={containerRef}
	class="relative w-full h-full overflow-hidden {className}"
	{style}
	aria-label="Buraco Negro Gargantua"
></div>
