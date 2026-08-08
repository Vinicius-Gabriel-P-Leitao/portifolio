export interface ResendConfig {
	token: string;
	fromAddress: string;
	toAddress: string;
}

export interface ResendAttachment {
	filename: string;
	content: string;
}

export interface ResendEmailRequest {
	replyTo: string;
	subject: string;
	html: string;
	attachment?: ResendAttachment;
}

export type ResendSendResult = { ok: true } | { ok: false; status: number };

interface ResendEnv {
	RESEND_TOKEN?: string;
	RESEND_FROM_ADDRESS?: string;
	RESEND_TO_ADDRESS?: string;
}

/** Pure: reads/validates the three required env vars, no fetch involved. */
export function readResendConfig(env: ResendEnv | undefined): ResendConfig | null {
	if (!env?.RESEND_TOKEN) return null;
	if (!env.RESEND_FROM_ADDRESS) return null;
	if (!env.RESEND_TO_ADDRESS) return null;

	return {
		token: env.RESEND_TOKEN,
		fromAddress: env.RESEND_FROM_ADDRESS,
		toAddress: env.RESEND_TO_ADDRESS
	};
}

/** Pure: builds the Resend API request body. Exported so shape can be asserted without a network call. */
export function buildResendBody(
	config: ResendConfig,
	request: ResendEmailRequest
): Record<string, unknown> {
	const body: Record<string, unknown> = {
		from: `Portifolio <${config.fromAddress}>`,
		to: config.toAddress,
		reply_to: request.replyTo,
		subject: request.subject,
		html: request.html
	};

	if (request.attachment) {
		body.attachments = [request.attachment];
	}

	return body;
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export async function sendResendEmail(
	config: ResendConfig,
	request: ResendEmailRequest
): Promise<ResendSendResult> {
	const response = await fetch(RESEND_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${config.token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(buildResendBody(config, request))
	});

	if (!response.ok) return { ok: false, status: response.status };
	return { ok: true };
}
