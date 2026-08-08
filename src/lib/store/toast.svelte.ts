const DISMISS_DELAY_MS = 4000;

export type ToastVariant = 'success' | 'error';

export type ToastItem = {
	id: string;
	message: string;
	variant: ToastVariant;
};

let _items = $state<ToastItem[]>([]);

export const toast = {
	get items() {
		return _items;
	},

	show(message: string, variant: ToastVariant = 'success') {
		const id = crypto.randomUUID();
		_items = [..._items, { id, message, variant }];
		setTimeout(() => {
			_items = _items.filter((item) => item.id !== id);
		}, DISMISS_DELAY_MS);
	},

	dismiss(id: string) {
		_items = _items.filter((item) => item.id !== id);
	}
};
