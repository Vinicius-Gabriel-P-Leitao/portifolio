export interface GestureThresholds {
	wheelDelta: number;
	wheelResetMs: number;
	swipeMinPxX: number;
	swipeMinPxY: number;
	swipeMaxDurationMs: number;
}

export const DEFAULT_THRESHOLDS: GestureThresholds = {
	wheelDelta: 50,
	wheelResetMs: 200,
	swipeMinPxX: 35,
	swipeMinPxY: 45,
	swipeMaxDurationMs: 800
};

const FORWARD_KEYS = ['ArrowRight', 'ArrowDown', 'PageDown', ' '];
const BACKWARD_KEYS = ['ArrowLeft', 'ArrowUp', 'PageUp'];
const TYPING_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];

interface GestureOptions {
	onAdvance: (direction: 1 | -1) => void;
	/** Returns true when input should be ignored (transition in flight, modal open, etc). */
	isLocked: () => boolean;
	thresholds?: Partial<GestureThresholds>;
}

const isDialogTarget = (target: EventTarget | null): boolean =>
	(target as HTMLElement | null)?.closest?.('[role="dialog"]') != null;

const isTypingTarget = (target: EventTarget | null): boolean => {
	const element = target as HTMLElement | null;
	if (!element) return false;
	return TYPING_TAGS.includes(element.tagName) || element.isContentEditable;
};

/** Pure: given a swipe delta, decide the resulting direction (or none). Independently testable. */
export function resolveSwipeDirection(
	deltaX: number,
	deltaY: number,
	thresholds: GestureThresholds
): 1 | -1 | null {
	const absDeltaX = Math.abs(deltaX);
	const absDeltaY = Math.abs(deltaY);

	if (absDeltaX > absDeltaY && absDeltaX > thresholds.swipeMinPxX) {
		return deltaX > 0 ? 1 : -1;
	}

	if (absDeltaY >= absDeltaX && absDeltaY > thresholds.swipeMinPxY) {
		return deltaY > 0 ? 1 : -1;
	}
	return null;
}

/** Pure: given a keyboard key, decide the resulting direction (or none). Independently testable. */
export function resolveKeyDirection(key: string): 1 | -1 | null {
	if (FORWARD_KEYS.includes(key)) return 1;
	if (BACKWARD_KEYS.includes(key)) return -1;
	return null;
}

/**
 * Svelte action: `use:carouselGestures={{ onAdvance, isLocked }}`
 * Wires wheel/touch/keyboard listeners on window and cleans them up on destroy.
 */
export function carouselGestures(_node: HTMLElement, options: GestureOptions) {
	const thresholds = { ...DEFAULT_THRESHOLDS, ...options.thresholds };
	let wheelAccumulator = 0;
	let wheelResetTimer: ReturnType<typeof setTimeout>;
	let touchStart = { x: 0, y: 0, time: 0 };

	function handleWheel(wheelEvent: WheelEvent) {
		if (options.isLocked()) return;

		wheelEvent.preventDefault();
		wheelAccumulator += wheelEvent.deltaY;
		clearTimeout(wheelResetTimer);
		wheelResetTimer = setTimeout(() => (wheelAccumulator = 0), thresholds.wheelResetMs);

		if (Math.abs(wheelAccumulator) <= thresholds.wheelDelta) return;

		options.onAdvance(wheelAccumulator > 0 ? 1 : -1);
		wheelAccumulator = 0;
	}

	function handleTouchStart(touchStartEvent: TouchEvent) {
		if (touchStartEvent.touches.length !== 1) return;
		if (isDialogTarget(touchStartEvent.target)) return;

		const touch = touchStartEvent.touches[0];
		touchStart = { x: touch.clientX, y: touch.clientY, time: Date.now() };
	}

	function handleTouchEnd(touchEndEvent: TouchEvent) {
		if (options.isLocked()) return;
		if (isDialogTarget(touchEndEvent.target)) return;
		if (touchEndEvent.changedTouches.length === 0) return;

		const elapsedMs = Date.now() - touchStart.time;
		if (elapsedMs > thresholds.swipeMaxDurationMs) return;

		const touch = touchEndEvent.changedTouches[0];
		const deltaX = touchStart.x - touch.clientX;
		const deltaY = touchStart.y - touch.clientY;
		const direction = resolveSwipeDirection(deltaX, deltaY, thresholds);

		if (direction === null) return;
		options.onAdvance(direction);
	}

	function handleKeydown(keyboardEvent: KeyboardEvent) {
		if (options.isLocked()) return;
		if (isTypingTarget(keyboardEvent.target)) return;

		const direction = resolveKeyDirection(keyboardEvent.key);
		if (direction === null) return;

		keyboardEvent.preventDefault();
		options.onAdvance(direction);
	}

	window.addEventListener('wheel', handleWheel, { passive: false });
	window.addEventListener('touchstart', handleTouchStart, { passive: true });
	window.addEventListener('touchend', handleTouchEnd, { passive: true });
	window.addEventListener('keydown', handleKeydown);

	return {
		update(newOptions: GestureOptions) {
			options = newOptions;
		},
		destroy() {
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchend', handleTouchEnd);
			window.removeEventListener('keydown', handleKeydown);
			clearTimeout(wheelResetTimer);
		}
	};
}
