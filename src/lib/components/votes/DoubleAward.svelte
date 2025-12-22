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
				{@const memberOne = nominee.members[0]}
				{@const memberTwo = nominee.members[1]}
				<VoteSelector {nominee} {handleSelect} isSelected={value == nominee.id}>
					<div class="flex flex-col items-center justify-between gap-2">
						<div class="flex gap-1">
							<div class="flex h-32 w-32 items-center justify-center overflow-hidden">
								<img src={memberOne.image} class="h-full w-full object-cover" />
							</div>
							<div class="flex h-32 w-32 items-center justify-center overflow-hidden">
								<img src={memberTwo.image} class="h-full w-full object-cover" />
							</div>
						</div>
						<div class="font-montserrat flex grow items-center text-xl font-semibold">
							{memberOne.name} & {memberTwo.name}
						</div>
					</div>
				</VoteSelector>
			{/each}
		</div>
	</Card.Content>
</Card.Root>
