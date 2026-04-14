import { describe, expect, test } from 'vitest';
import { PROJECTS } from './projects';

describe('PROJECTS', () => {
	test('contains at least one project', () => {
		expect(PROJECTS.length).toBeGreaterThan(0);
	});

	test('every project has a unique id', () => {
		const ids = PROJECTS.map((p) => p.id);

		expect(new Set(ids).size).toBe(ids.length);
	});

	test('every project has required string fields', () => {
		for (const project of PROJECTS) {
			expect(project.id).toBeTruthy();
			expect(project.title).toBeTruthy();
			expect(project.desc.en).toBeTruthy();
			expect(project.desc['pt-br']).toBeTruthy();
		}
	});

	test('every project has a non-empty tech array', () => {
		for (const project of PROJECTS) {
			expect(project.tech).toBeInstanceOf(Array);
			expect(project.tech.length).toBeGreaterThan(0);
		}
	});

	test('projects with images have valid image arrays', () => {
		const withImages = PROJECTS.filter((p) => p.images);

		for (const project of withImages) {
			expect(project.images!.length).toBeGreaterThan(0);

			for (const image of project.images!) {
				expect(image.title).toBeTruthy();
				expect(image.url).toMatch(/^https?:\/\//);
			}
		}
	});
});
