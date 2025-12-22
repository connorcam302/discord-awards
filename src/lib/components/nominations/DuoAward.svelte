<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as NativeSelect from '$lib/components/ui/native-select/index.js';
	import type { getAllAwards } from '$lib/server/db/functions';
	import players from '$lib/data/members.json';
	let {
		award,
		initialValue = '',
		handleNomination,
		isSignedIn
	}: {
		award: Awaited<ReturnType<typeof getAllAwards>>[number];
		initialValue: string;
		handleNomination: (awardId: string, data: any) => void;
		isSignedIn: boolean;
	} = $props();
	let { id, name, description } = award;

	// Parse initialValue, handle empty string
	const parsedInitial = initialValue && initialValue !== '' ? initialValue.split('-') : ['', ''];
	let person1 = $state<string>(parsedInitial[0] ?? '');
	let person2 = $state<string>(parsedInitial[1] ?? '');

	let value = $derived<string>([person1, person2].sort().join('-'));
	$effect(() => {
		handleNomination(id, [person1, person2].sort().join('-'));
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{name}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if isSignedIn}
			<div class="flex items-center gap-4">
				<NativeSelect.Root bind:value={person1}>
					<NativeSelect.Option value="">Nominate</NativeSelect.Option>
					{#each players as player (player.name)}
						<NativeSelect.Option value={player.name}>{player.name}</NativeSelect.Option>
					{/each}
				</NativeSelect.Root>
				And
				<NativeSelect.Root bind:value={person2}>
					<NativeSelect.Option value="">Nominate</NativeSelect.Option>
					{#each players as player (player.name)}
						<NativeSelect.Option value={player.name}>{player.name}</NativeSelect.Option>
					{/each}
				</NativeSelect.Root>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
