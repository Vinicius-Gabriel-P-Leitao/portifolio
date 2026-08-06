import { buildEmailHtml } from '$lib/services/email/email.template';
import { buildEmailPayload } from '$lib/services/email.service';
import type { EmailAttachment } from '$lib/services/email.service';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB limit

export const POST: RequestHandler = async ({ request, platform }) => {
	const resendToken = platform?.env?.RESEND_TOKEN;
	const fromAddress = platform?.env?.RESEND_FROM_ADDRESS;
	const toAddress = platform?.env?.RESEND_TO_ADDRESS;

	if (!resendToken || !fromAddress || !toAddress) {
		console.error('[contact] Missing Resend environment variables');
		return json({ ok: false, message: 'configuration_error' }, { status: 500 });
	}

	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return json({ error: 'validation_error' }, { status: 400 });
	}

	const { name, email, message, attachment } = body as Record<string, unknown>;

	if (
		typeof name !== 'string' ||
		!name.trim() ||
		typeof email !== 'string' ||
		!email.trim() ||
		typeof message !== 'string' ||
		!message.trim()
	) {
		return json({ error: 'validation_error' }, { status: 400 });
	}

	let validAttachment: EmailAttachment | undefined = undefined;
	if (
		attachment &&
		typeof attachment === 'object' &&
		typeof (attachment as EmailAttachment).filename === 'string' &&
		typeof (attachment as EmailAttachment).content === 'string'
	) {
		const att = attachment as EmailAttachment;
		// Estimate file size in bytes from Base64 string length
		const estimatedSizeBytes = Math.ceil((att.content.length * 3) / 4);
		if (estimatedSizeBytes > MAX_FILE_SIZE_BYTES) {
			return json({ error: 'file_too_large' }, { status: 400 });
		}
		validAttachment = att;
	}

	const payload = buildEmailPayload({ name, email, message, attachment: validAttachment });

	const resendBody: Record<string, unknown> = {
		from: `Portifolio <${fromAddress}>`,
		to: toAddress,
		reply_to: email,
		subject: `Nova mensagem de ${name}`,
		html: buildEmailHtml(payload)
	};

	if (validAttachment) {
		resendBody.attachments = [
			{
				filename: validAttachment.filename,
				content: validAttachment.content
			}
		];
	}

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${resendToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(resendBody)
	});

	if (!res.ok) {
		console.error('[contact] Resend error:', res.status);
		return json({ ok: false, message: 'email_send_failed' }, { status: 502 });
	}

	return json({ ok: true });
};
