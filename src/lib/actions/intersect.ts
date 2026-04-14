import type { Action } from 'svelte/action';
import type { Section } from '$lib/stores/navigation.svelte';

export type IntersectOptions = {
	/** IntersectionObserver threshold (0–1). Default: 0.2 */
	threshold?: number;
	/** Section name to set as active whenever this element is in view. */
	section?: Section;
	/** Extra callback fired on every entry into the viewport. */
	onEnter?: () => void;
};

/**
 * Svelte action — watches when an element enters the viewport.
 *
 * - Sets `data-visible="true"` once for CSS entry animations.
 * - Continuously updates the navigation store so both Navbar and BottomNav
 *   reflect the section currently in view (scroll AND click).
 *
 * @example
 * <section use:intersect={{ section: 'projects' }}>
 */
export const intersect: Action<HTMLElement, IntersectOptions> = (node, options = {}) => {
	const { threshold = 0.2, section, onEnter } = options;

	let animated = false;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;

			// Animation: trigger only the first time the section enters view.
			if (!animated) {
				node.dataset.visible = 'true';
				animated = true;
				onEnter?.();
			}

			// Navigation: update on every intersection so scrolling back works.
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
