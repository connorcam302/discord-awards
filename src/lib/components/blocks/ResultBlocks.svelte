<script lang="ts">
	import type { AwardResult } from '$lib/server/db/functions';
	import DuoResult from '../results/DuoResult.svelte';
	import ImageResult from '../results/ImageResult.svelte';
	import ResultParent from '../results/ResultParent.svelte';
	import TextResult from '../results/TextResult.svelte';
	import VideoResult from '../results/VideoResult.svelte';

	let { results }: { results: AwardResult[] } = $props();
</script>

{#each results as result, i (i)}
	{#if result.awardType == 'text'}
		<ResultParent data-snap-item>
			<TextResult {result} />
		</ResultParent>
	{:else if result.awardType == 'image'}
		<ResultParent data-snap-item>
			<ImageResult {result} />
		</ResultParent>
	{:else if result.awardType == 'double'}
		<ResultParent data-snap-item>
			<DuoResult {result} />
		</ResultParent>
	{:else if result.awardType == 'video'}
		<ResultParent data-snap-item>
			<VideoResult {result} />
		</ResultParent>
	{/if}
{/each}
