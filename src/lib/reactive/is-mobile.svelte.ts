import { browser } from '$app/environment';

const BREAKPOINT = 768;
let _value = $state(browser ? window.matchMedia(`(max-width: ${BREAKPOINT}px)`).matches : false);

if (browser) {
	window
		.matchMedia(`(max-width: ${BREAKPOINT}px)`)
		.addEventListener('change', (e: MediaQueryListEvent) => {
			_value = e.matches;
		});
}

export const isMobile = {
	get current() {
		return _value;
	}
};
