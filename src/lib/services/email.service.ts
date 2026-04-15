export type EmailData = {
	name: string;
	email: string;
	message: string;
};

export type EmailPayload = EmailData & { time: string };

/** Pure function — builds the payload sent to the API. Exported for testing. */
export function buildEmailPayload(data: EmailData): EmailPayload {
	return { ...data, time: new Date().toLocaleString() };
}

export async function sendEmail(
	data: EmailData
): Promise<{ ok: true } | { ok: false; message: string }> {
	try {
		const res = await fetch('/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			return { ok: false, message: (body as { error?: string })?.error ?? 'email_send_failed' };
		}

		return { ok: true };
	} catch {
		return { ok: false, message: 'network_error' };
	}
}
