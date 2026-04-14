export type Section = 'hero' | 'projects' | 'about' | 'contact';

let _active = $state<Section>('hero');

let _lastClickAt = 0;
const LOCK_MS = 900;

export const navigation = {
	get active() {
		return _active;
	},

	setActive(section: Section) {
		if (Date.now() - _lastClickAt < LOCK_MS) return;
		_active = section;
	},

	navigate(section: Section) {
		_lastClickAt = Date.now();
		_active = section;
	}
};
