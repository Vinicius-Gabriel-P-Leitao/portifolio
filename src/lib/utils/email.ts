export type EmailData = {
	name: string;
	email: string;
	message: string;
};

export type EmailPayload = EmailData & { time: string };

/** Pure function — builds the payload sent to EmailJS. Exported for testing. */
export function buildEmailPayload(data: EmailData): EmailPayload {
	return { ...data, time: new Date().toLocaleString() };
}

export async function sendEmail(
	data: EmailData
): Promise<{ ok: true } | { ok: false; message: string }> {
	const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
	const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
	const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

	const missing = (
		[
			['VITE_EMAILJS_SERVICE_ID', serviceId],
			['VITE_EMAILJS_TEMPLATE_ID', templateId],
			['VITE_EMAILJS_PUBLIC_KEY', publicKey]
		] as const
	)
		.filter(([, v]) => !v)
		.map(([k]) => k);

	if (missing.length > 0) {
		console.error('[email] Missing environment variables:', missing.join(', '));
		return { ok: false, message: 'configuration_error' };
	}

	try {
		const emailjs = (await import('@emailjs/browser')).default;
		await emailjs.send(serviceId, templateId, buildEmailPayload(data), publicKey);

		return { ok: true };
	} catch (error) {
		const detail = error instanceof Error ? error.message : String(error);
		console.error('[email] Send failed:', detail);

		return { ok: false, message: 'email_send_failed' };
	}
}
