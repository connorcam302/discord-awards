<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { getAllAwards, getAllNominees } from '$lib/server/db/functions';
	import Button from '../ui/button/button.svelte';
	import VoteSelector from './VoteSelector.svelte';

	let {
		award,
		initialValue = '',
		handleVote,
		isSignedIn
	}: {
		award: Awaited<ReturnType<typeof getAllNominees>>[number];
		initialValue: string;
		handleVote: (awardId: string, data: any) => void;
		isSignedIn: boolean;
	} = $props();

	let { id, name, description, nominees } = award;
	let value = $state<string>(initialValue);

	$effect(() => {
		handleVote(id, value);
	});

	const handleSelect = (nomineeId: string) => {
		if (isSignedIn) {
			value = nomineeId;
		}
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{name}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each nominees as nominee (nominee.id)}
				{@const member = nominee.members[0]}
				<VoteSelector {nominee} {handleSelect} isSelected={value == nominee.id}>
					<div class="flex flex-col gap-2">
						<iframe
							width="560"
							height="315"
							src={member.video}
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin"
							allowfullscreen
						></iframe>
						<Button class="text-lg">Select Video</Button>
					</div>
				</VoteSelector>
			{/each}
		</div>
	</Card.Content>
</Card.Root>
