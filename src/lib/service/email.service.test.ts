import { describe, expect, test } from 'vitest';
import { buildEmailPayload } from './email.service';

describe('buildEmailPayload', () => {
	test('includes all input fields in the payload', () => {
		const data = { name: 'Vinícius', email: 'v@example.com', message: 'Hello' };

		const payload = buildEmailPayload(data);

		expect(payload.name).toBe('Vinícius');
		expect(payload.email).toBe('v@example.com');
		expect(payload.message).toBe('Hello');
	});

	test('adds a non-empty time field', () => {
		const payload = buildEmailPayload({ name: 'A', email: 'a@a.com', message: 'B' });

		expect(payload.time).toBeTruthy();
		expect(typeof payload.time).toBe('string');
	});

	test('does not mutate the original data object', () => {
		const data = { name: 'A', email: 'a@a.com', message: 'B' };
		const original = { ...data };

		buildEmailPayload(data);

		expect(data).toEqual(original);
	});
});
