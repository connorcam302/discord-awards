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
		<div class="flex gap-2">
			<img
				src={result.nominees[0].members[0].imageUrl}
				alt={result.nominees[0].nomineeName}
				class="h-48 w-48 md:h-80 md:w-80"
			/>
			<img
				src={result.nominees[0].members[1].imageUrl}
				alt={result.nominees[0].nomineeName}
				class="h-48 w-48 md:h-80 md:w-80"
			/>
		</div>
		<div class="text-primary flex items-center gap-2 text-2xl font-bold">
			<Crown />
			<div>{result.nominees[0].nomineeName}</div>
		</div>
	</div>
	<ResultChart {result} />
</div>
