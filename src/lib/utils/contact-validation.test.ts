import { describe, it, expect } from 'vitest';
import { readResendConfig, buildResendBody, type ResendConfig } from '$lib/service/resend.service';

describe('readResendConfig', () => {
	const fullEnv = {
		RESEND_TOKEN: 'token',
		RESEND_FROM_ADDRESS: 'from@example.com',
		RESEND_TO_ADDRESS: 'to@example.com'
	};

	it('returns a config when all vars are present', () => {
		expect(readResendConfig(fullEnv)).toEqual({
			token: 'token',
			fromAddress: 'from@example.com',
			toAddress: 'to@example.com'
		});
	});

	it('returns null when the token is missing', () => {
		expect(readResendConfig({ ...fullEnv, RESEND_TOKEN: undefined })).toBeNull();
	});

	it('returns null when the from address is missing', () => {
		expect(readResendConfig({ ...fullEnv, RESEND_FROM_ADDRESS: undefined })).toBeNull();
	});

	it('returns null when the to address is missing', () => {
		expect(readResendConfig({ ...fullEnv, RESEND_TO_ADDRESS: undefined })).toBeNull();
	});

	it('returns null for an undefined env', () => {
		expect(readResendConfig(undefined)).toBeNull();
	});
});

describe('buildResendBody', () => {
	const config: ResendConfig = {
		token: 'token',
		fromAddress: 'from@example.com',
		toAddress: 'to@example.com'
	};

	it('omits attachments when none is provided', () => {
		const body = buildResendBody(config, {
			replyTo: 'reply@example.com',
			subject: 'Subject',
			html: '<p>hi</p>'
		});
		expect(body.attachments).toBeUndefined();
		expect(body).toMatchObject({
			from: 'Portifolio <from@example.com>',
			to: 'to@example.com',
			reply_to: 'reply@example.com',
			subject: 'Subject',
			html: '<p>hi</p>'
		});
	});

	it('includes the attachment when provided', () => {
		const attachment = { filename: 'a.png', content: 'YQ==' };
		const body = buildResendBody(config, {
			replyTo: 'reply@example.com',
			subject: 'Subject',
			html: '<p>hi</p>',
			attachment
		});
		expect(body.attachments).toEqual([attachment]);
	});
});
