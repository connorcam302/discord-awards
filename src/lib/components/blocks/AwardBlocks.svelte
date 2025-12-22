<script lang="ts">
	import type { getAllAwards } from '$lib/server/db/functions';
	import DuoAward from '../nominations/DuoAward.svelte';
	import GameAward from '../nominations/GameAward.svelte';
	import MiscAward from '../nominations/MiscAward.svelte';
	import SingleAward from '../nominations/SingleAward.svelte';

	let {
		awards,
		allNominations,
		isSignedIn
	}: {
		awards: Awaited<ReturnType<typeof getAllAwards>>;
		allNominations: Record<string, unknown>;
		isSignedIn: boolean;
	} = $props();

	const handleNomination = (awardId: string, nominationData: unknown) => {
		allNominations[awardId] = nominationData;
	};
</script>

<div class="flex w-full flex-col items-center gap-16">
	{#each awards as award, i (i)}
		{#if award.type === 'one-person'}
			<SingleAward {award} {handleNomination} initialValue={award.initialValue} {isSignedIn} />
		{:else if award.type === 'two-person'}
			<DuoAward {award} {handleNomination} initialValue={award.initialValue} {isSignedIn} />
		{:else if award.type === 'misc'}
			<MiscAward {award} {handleNomination} initialValue={award.initialValue} {isSignedIn} />
		{:else if award.type === 'game'}
			<GameAward {award} {handleNomination} initialValue={award.initialValue} {isSignedIn} />
		{/if}
	{/each}
</div>
