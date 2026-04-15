import type { Action } from 'svelte/action';
import type { Section } from '$lib/stores/navigation.svelte';

export type IntersectOptions = {
	section?: Section;
	threshold?: number;
	onEnter?: () => void;
};
export const intersect: Action<HTMLElement, IntersectOptions> = (node, options = {}) => {
	const { threshold = 0.2, section, onEnter } = options;

	let animated = false;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;

			if (!animated) {
				node.dataset.visible = 'true';
				animated = true;
				onEnter?.();
			}

			if (section) {
				import('$lib/stores/navigation.svelte').then(({ navigation }) => {
					navigation.setActive(section);
				});
			}
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
