<script lang="ts">
	import { onMount } from 'svelte';
	import { Renderer, Camera, Transform, Sphere, Program, Mesh } from 'ogl';
	import VERTEX_SHADER from '$lib/shaders/gargantua.vert.glsl?raw';
	import FRAGMENT_SHADER from '$lib/shaders/gargantua.frag.glsl?raw';

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
		speed = 0.4,
		iterations = 70
	}: Props = $props();

	let containerRef: HTMLDivElement;

	onMount(() => {
		const renderer = new Renderer({
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance',
			dpr: Math.min(window.devicePixelRatio || 1, 1.5)
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
