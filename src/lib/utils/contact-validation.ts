import type { EmailAttachment } from '$lib/service/email.service';

export const MAX_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface ContactFields {
	name: string;
	email: string;
	message: string;
}

export type ContactValidationError = 'validation_error' | 'file_too_large';

export interface ContactValidationSuccess {
	ok: true;
	fields: ContactFields;
	attachment: EmailAttachment | undefined;
}

export interface ContactValidationFailure {
	ok: false;
	error: ContactValidationError;
}

export type ContactValidationResult = ContactValidationSuccess | ContactValidationFailure;

type AttachmentParseResult =
	| { ok: true; attachment: EmailAttachment | undefined }
	| { ok: false; error: 'file_too_large' };

function isNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

function isAttachmentShape(value: unknown): value is EmailAttachment {
	if (!value || typeof value !== 'object') return false;

	const candidate = value as Record<string, unknown>;
	return typeof candidate.filename === 'string' && typeof candidate.content === 'string';
}

/** Base64 encodes 3 bytes as 4 characters — inverse of that ratio estimates the original size. */
export function estimateBase64SizeBytes(base64Content: string): number {
	return Math.ceil((base64Content.length * 3) / 4);
}

function parseAttachment(rawAttachment: unknown): AttachmentParseResult {
	if (!isAttachmentShape(rawAttachment)) return { ok: true, attachment: undefined };

	const sizeBytes = estimateBase64SizeBytes(rawAttachment.content);
	if (sizeBytes > MAX_ATTACHMENT_SIZE_BYTES) return { ok: false, error: 'file_too_large' };

	return { ok: true, attachment: rawAttachment };
}

function parseFields(rawBody: Record<string, unknown>): ContactFields | null {
	const { name, email, message } = rawBody;

	if (!isNonEmptyString(name)) return null;
	if (!isNonEmptyString(email)) return null;
	if (!isNonEmptyString(message)) return null;

	return { name, email, message };
}

/** Pure: parsed JSON body in, validation result out. No I/O, fully unit-testable. */
export function validateContactRequest(rawBody: unknown): ContactValidationResult {
	const body = (rawBody ?? {}) as Record<string, unknown>;

	const fields = parseFields(body);
	if (fields === null) return { ok: false, error: 'validation_error' };

	const attachmentResult = parseAttachment(body.attachment);
	if (!attachmentResult.ok) return { ok: false, error: attachmentResult.error };

	return { ok: true, fields, attachment: attachmentResult.attachment };
}
