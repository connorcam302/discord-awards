<script lang="ts">
	import type { getAllResults } from '$lib/server/db/functions';

	let {
		result
	}: {
		result: Awaited<ReturnType<typeof getAllResults>>[number];
	} = $props();

	const maxVotes = $derived(
		result.nominees.length > 0 ? Math.max(...result.nominees.map((n) => n.voteCount)) : 0
	);

	function isUrl(str: string): boolean {
		return str.startsWith('http://') || str.startsWith('https://');
	}

	function embedToWatch(url) {
		try {
			const parsed = new URL(url);

			// Handle youtu.be embeds just in case
			if (parsed.hostname === 'youtu.be') {
				return `https://www.youtube.com/watch?v=${parsed.pathname.slice(1)}`;
			}

			// Standard embed format
			if (parsed.pathname.startsWith('/embed/')) {
				const videoId = parsed.pathname.split('/embed/')[1].split('/')[0];
				return `https://www.youtube.com/watch?v=${videoId}`;
			}

			// Already a watch URL or unsupported format
			return url;
		} catch {
			// Invalid URL input
			return null;
		}
	}
</script>

<div class="space-y-3">
	{#each result.nominees as nominee (nominee.awardNomineeId)}
		<div class="space-y-1">
			<div class="flex justify-between text-sm">
				{#if nominee.nomineeName && isUrl(nominee.nomineeName)}
					<a
						href={embedToWatch(nominee.nomineeName)}
						target="_blank"
						rel="noopener noreferrer"
						class="text-primary font-medium hover:underline"
					>
						{embedToWatch(nominee.nomineeName)}
					</a>
				{:else}
					<span class="font-medium">{nominee.nomineeName || 'Unknown'}</span>
				{/if}
				<span class="text-muted-foreground">{nominee.voteCount} votes</span>
			</div>
			<div class="bg-muted h-4 overflow-hidden rounded-full">
				<div
					class="bg-primary h-full rounded-full transition-all duration-300"
					style="width: {(nominee.voteCount / maxVotes) * 100}%"
				></div>
			</div>
		</div>
	{/each}
</div>
