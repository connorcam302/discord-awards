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
		<div class="flex flex-wrap items-center justify-center">
			{#each nominees as nominee (nominee.id)}
				{@const member = nominee.members[0]}
				<VoteSelector {nominee} {handleSelect} isSelected={value == nominee.id}>
					<div class="flex h-56 w-44 flex-col items-center justify-between gap-2">
						<div class="flex h-32 w-32 items-center justify-center overflow-hidden">
							<img src={member.image} class="h-full w-full object-cover" />
						</div>
						<div class="font-montserrat flex grow items-center text-xl font-semibold">
							{member.name}
						</div>
					</div>
				</VoteSelector>
			{/each}
		</div>
	</Card.Content>
</Card.Root>
