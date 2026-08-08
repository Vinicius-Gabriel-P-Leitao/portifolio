import { describe, it, expect } from 'vitest';
import { advanceCarousel, jumpToSection, computeProgress, type CarouselConfig } from './carousel';

const config: CarouselConfig = { sectionCount: 4, projectCount: 3, projectsSectionIdx: 1 };

describe('advanceCarousel — outside projects', () => {
	it('moves forward hero -> projects, resets projectIdx to 0', () => {
		const result = advanceCarousel({ sectionIdx: 0, projectIdx: 0 }, 1, config);
		expect(result).toEqual({ sectionIdx: 1, projectIdx: 0 });
	});

	it('moves backward about -> projects, resets projectIdx to last', () => {
		const result = advanceCarousel({ sectionIdx: 2, projectIdx: 0 }, -1, config);
		expect(result).toEqual({ sectionIdx: 1, projectIdx: 2 });
	});

	it('is a no-op past the last section', () => {
		const result = advanceCarousel({ sectionIdx: 3, projectIdx: 0 }, 1, config);
		expect(result).toEqual({ sectionIdx: 3, projectIdx: 0 });
	});

	it('is a no-op before the first section', () => {
		const result = advanceCarousel({ sectionIdx: 0, projectIdx: 0 }, -1, config);
		expect(result).toEqual({ sectionIdx: 0, projectIdx: 0 });
	});
});

describe('advanceCarousel — inside projects', () => {
	it('steps to next project', () => {
		const result = advanceCarousel({ sectionIdx: 1, projectIdx: 0 }, 1, config);
		expect(result).toEqual({ sectionIdx: 1, projectIdx: 1 });
	});

	it('steps to previous project', () => {
		const result = advanceCarousel({ sectionIdx: 1, projectIdx: 1 }, -1, config);
		expect(result).toEqual({ sectionIdx: 1, projectIdx: 0 });
	});

	it('exits forward to About at the last project', () => {
		const result = advanceCarousel({ sectionIdx: 1, projectIdx: 2 }, 1, config);
		expect(result).toEqual({ sectionIdx: 2, projectIdx: 2 });
	});

	it('exits backward to Hero at the first project', () => {
		const result = advanceCarousel({ sectionIdx: 1, projectIdx: 0 }, -1, config);
		expect(result).toEqual({ sectionIdx: 0, projectIdx: 0 });
	});
});

describe('jumpToSection', () => {
	it('resets projectIdx when jumping into projects', () => {
		const result = jumpToSection({ sectionIdx: 3, projectIdx: 2 }, 1, config);
		expect(result).toEqual({ sectionIdx: 1, projectIdx: 0 });
	});

	it('preserves projectIdx when jumping elsewhere', () => {
		const result = jumpToSection({ sectionIdx: 1, projectIdx: 2 }, 3, config);
		expect(result).toEqual({ sectionIdx: 3, projectIdx: 2 });
	});
});

describe('computeProgress', () => {
	it('is 0 on the first panel', () => {
		const progress = computeProgress({ sectionIdx: 0, projectIdx: 0 }, config);
		expect(progress).toBe(0);
	});

	it('is 1 on the last panel', () => {
		const progress = computeProgress({ sectionIdx: 3, projectIdx: 0 }, config);
		expect(progress).toBe(1);
	});

	it('interpolates within the projects panel', () => {
		const progress = computeProgress({ sectionIdx: 1, projectIdx: 1 }, config);
		expect(progress).toBeCloseTo(1 / 3 + (1 / 2) * (1 / 3));
	});
});
