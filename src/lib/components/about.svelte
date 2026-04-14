<script lang="ts">
	import { intersect } from '$lib/actions/intersect';
	import * as m from '$lib/paraglide/messages';

	const STACK = [
		{ category: () => m['about.frontend'](), items: ['Tailwind', 'React', 'Jetpack Compose'] },
		{
			category: () => m['about.backend'](),
			items: ['Java', 'Kotlin', 'Spring Boot', 'Node.js']
		},
		{
			category: () => m['about.database'](),
			items: ['PostgreSQL', 'SQLite', 'MongoDB', 'Firebase']
		},
		{ category: () => m['about.infra'](), items: ['Docker', 'Git'] }
	];
</script>

<section id="about" class="px-4 py-20" use:intersect={{ section: 'about', threshold: 0.2 }}>
	<div class="mx-auto w-full max-w-3xl">
		<h2 class="mb-8 text-[11px] tracking-[0.3em] text-white/40 uppercase">
			{m['about.title']()}
		</h2>

		<p class="mb-10 text-sm leading-relaxed text-white/65 sm:text-base">
			{m['about.bio']()}
		</p>

		<div class="space-y-5">
			{#each STACK as group (group.category())}
				<div>
					<span class="mb-2 block text-[10px] tracking-widest text-white/30 uppercase">
						{group.category()}
					</span>
					<div class="flex flex-wrap gap-2">
						{#each group.items as item (item)}
							<span
								class="rounded-full border border-white/8 px-3 py-1 text-xs text-white/55 transition-colors hover:border-white/15 hover:text-white/80"
							>
								{item}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
