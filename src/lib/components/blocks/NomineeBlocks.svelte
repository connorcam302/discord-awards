<script lang="ts">
	import type { getAllNominees } from '$lib/server/db/functions';
	import DoubleAward from '../votes/DoubleAward.svelte';
	import ImageAward from '../votes/ImageAward.svelte';
	import TextAward from '../votes/TextAward.svelte';
	import VideoAward from '../votes/VideoAward.svelte';

	let {
		awards,
		allVotes = $bindable(),
		isSignedIn
	}: {
		awards: Awaited<ReturnType<typeof getAllNominees>>;
		allVotes: Record<string, unknown>;
		isSignedIn: boolean;
	} = $props();

	const handleVote = (awardId: string, voteData: unknown) => {
		allVotes[awardId] = voteData;
	};
</script>

<div class="flex w-full flex-col items-center gap-16">
	{#each awards as award, i (i)}
		{#if award.type == 'image'}
			<ImageAward {award} {handleVote} initialValue={award.initialValue} {isSignedIn} />
		{:else if award.type == 'double'}
			<DoubleAward {award} {handleVote} initialValue={award.initialValue} {isSignedIn} />
		{:else if award.type == 'text'}
			<TextAward {award} {handleVote} initialValue={award.initialValue} {isSignedIn} />
		{:else if award.type == 'video'}
			<VideoAward {award} {handleVote} initialValue={award.initialValue} {isSignedIn} />
		{/if}
	{/each}
</div>
