<script lang="ts">
	import type { getAllResults } from '$lib/server/db/functions';
	import ResultChart from './ResultChart.svelte';
	import { Crown } from '@lucide/svelte';

	let {
		result
	}: {
		result: Awaited<ReturnType<typeof getAllResults>>[number];
	} = $props();

	const maxVotes = $derived(
		result.nominees.length > 0 ? Math.max(...result.nominees.map((n) => n.voteCount)) : 0
	);
</script>

<div class="flex h-full max-w-2xl flex-col justify-between gap-2 p-4">
	<div class="flex flex-col gap-2 text-center">
		<h2 class="text-center text-3xl font-bold">{result.awardName}</h2>
		<h3 class="">{result.awardDescription}</h3>
	</div>
	<div class="flex flex-col items-center gap-2">
		<iframe
			width="360"
			height="200"
			src={result.nominees[0].members[0].videoUrl}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
		<div class="text-primary flex items-center gap-2 text-2xl font-bold">
			<Crown />
			<div>{result.nominees[0].members[0].textValue}</div>
		</div>
	</div>
	<ResultChart {result} />
</div>
