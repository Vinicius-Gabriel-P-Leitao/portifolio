export type Direction = 1 | -1;

export interface CarouselState {
	sectionIdx: number;
	projectIdx: number;
}

export interface CarouselConfig {
	sectionCount: number;
	projectCount: number;
	projectsSectionIdx: number; // panel index that hosts the inner project carousel
}

function advanceWithinProjects(
	state: CarouselState,
	dir: Direction,
	config: CarouselConfig
): CarouselState {
	const { projectIdx } = state;
	const atStart = projectIdx === 0;
	const atEnd = projectIdx === config.projectCount - 1;

	if (dir === 1 && !atEnd) return { ...state, projectIdx: projectIdx + 1 };
	if (dir === 1 && atEnd) return { ...state, sectionIdx: state.sectionIdx + 1 };
	if (dir === -1 && !atStart) return { ...state, projectIdx: projectIdx - 1 };
	return { ...state, sectionIdx: state.sectionIdx - 1 }; // dir === -1 && atStart
}

function advanceAcrossSections(
	state: CarouselState,
	dir: Direction,
	config: CarouselConfig
): CarouselState {
	const next = state.sectionIdx + dir;
	if (next < 0 || next >= config.sectionCount) return state;

	const enteringProjects = next === config.projectsSectionIdx;
	const projectIdx = enteringProjects
		? dir === 1
			? 0
			: config.projectCount - 1
		: state.projectIdx;

	return { sectionIdx: next, projectIdx };
}

/** Pure reducer: (state, direction) -> next state. No DOM, no timers, fully unit-testable. */
export function advanceCarousel(
	state: CarouselState,
	dir: Direction,
	config: CarouselConfig
): CarouselState {
	return state.sectionIdx === config.projectsSectionIdx
		? advanceWithinProjects(state, dir, config)
		: advanceAcrossSections(state, dir, config);
}

export function jumpToSection(
	state: CarouselState,
	targetSectionIdx: number,
	config: CarouselConfig
): CarouselState {
	const projectIdx = targetSectionIdx === config.projectsSectionIdx ? 0 : state.projectIdx;
	return { sectionIdx: targetSectionIdx, projectIdx };
}

export function computeProgress(state: CarouselState, config: CarouselConfig): number {
	const base = state.sectionIdx / (config.sectionCount - 1);
	const isProjects = state.sectionIdx === config.projectsSectionIdx;
	const inner = isProjects
		? (state.projectIdx / (config.projectCount - 1)) * (1 / (config.sectionCount - 1))
		: 0;
	return Math.min(1, base + inner);
}
