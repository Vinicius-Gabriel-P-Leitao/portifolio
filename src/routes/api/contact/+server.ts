import { buildEmailHtml } from '$lib/service/email/email.template';
import { buildEmailPayload } from '$lib/service/email.service';
import { validateContactRequest } from '$lib/utils/contact-validation';
import { readResendConfig, sendResendEmail } from '$lib/service/resend.service';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const VALIDATION_ERROR_STATUS: Record<string, number> = {
	validation_error: 400,
	file_too_large: 400
};

async function parseJsonBody(
	request: Request
): Promise<{ ok: true; body: unknown } | { ok: false }> {
	try {
		return { ok: true, body: await request.json() };
	} catch {
		return { ok: false };
	}
}

export const POST: RequestHandler = async ({ request, platform }) => {
	const resendConfig = readResendConfig(platform?.env);
	if (!resendConfig) {
		console.error('[contact] Missing Resend environment variables');
		return json({ ok: false, message: 'configuration_error' }, { status: 500 });
	}

	const parsedBody = await parseJsonBody(request);
	if (!parsedBody.ok) {
		return json({ error: 'validation_error' }, { status: 400 });
	}

	const validation = validateContactRequest(parsedBody.body);
	if (!validation.ok) {
		const status = VALIDATION_ERROR_STATUS[validation.error] ?? 400;
		return json({ error: validation.error }, { status });
	}

	const { fields, attachment } = validation;
	const payload = buildEmailPayload({ ...fields, attachment });

	const sendResult = await sendResendEmail(resendConfig, {
		replyTo: fields.email,
		subject: `Nova mensagem de ${fields.name}`,
		html: buildEmailHtml(payload),
		attachment
	});

	if (!sendResult.ok) {
		console.error('[contact] Resend error:', sendResult.status);
		return json({ ok: false, message: 'email_send_failed' }, { status: 502 });
	}

	return json({ ok: true });
};
