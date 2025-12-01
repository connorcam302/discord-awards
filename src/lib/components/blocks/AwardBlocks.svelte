<script lang="ts">
	import type { getAllAwards } from '$lib/server/db/functions';
    import DuoAward from '../awards/DuoAward.svelte';
	import GameAward from '../awards/GameAward.svelte';
    import MiscAward from '../awards/MiscAward.svelte';
    import SingleAward from '../awards/SingleAward.svelte';
	let awards: ReturnType<typeof getAllAwards> = $props()

	let allNominations = $state<Record<string, any>>({});
	
	function handleNomination(awardId: string, nominationData: any) {
		allNominations[awardId] = nominationData;
		console.log('All nominations:', allNominations);
	}

</script>

<div class="flex flex-col gap-4">
	{#await awards then awardsResolved}
	{#each awardsResolved as award, i (i)}
		{#if award.type === 'single'}
			<SingleAward {award} {handleNomination} />
		{:else if award.type === 'duo'}
			<DuoAward {award} {handleNomination} />
			{:else if award.type === 'misc'}
				<MiscAward {award} {handleNomination} />
		{:else if award.type === 'game'}
		<GameAward {award} {handleNomination} />
		{/if}
	{/each}
	{/await}
</div>
