<script lang="ts">
	import type { getAllAwards } from '$lib/server/db/functions';
	import DuoAward from '../awards/DuoAward.svelte';
	import GameAward from '../awards/GameAward.svelte';
	import MiscAward from '../awards/MiscAward.svelte';
	import SingleAward from '../awards/SingleAward.svelte';
	let {
		awards,
		allNominations
	}: { awards: Awaited<ReturnType<typeof getAllAwards>>; allNominations: Record<string, unknown> } =
		$props();

	const handleNomination = (awardId: string, nominationData: unknown) => {
		allNominations[awardId] = nominationData;
	};
</script>

<div class="flex w-full flex-col items-center gap-16">
	{#each awards as award, i (i)}
		{#if award.type === 'one-person'}
			<SingleAward {award} {handleNomination} initialValue="" />
		{:else if award.type === 'two-person'}
			<DuoAward {award} {handleNomination} initialValue="" />
		{:else if award.type === 'misc'}
			<MiscAward {award} {handleNomination} initialValue="" />
		{:else if award.type === 'game'}
			<GameAward {award} {handleNomination} initialValue="" />
		{/if}
	{/each}
</div>
