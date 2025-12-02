<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as NativeSelect from '$lib/components/ui/native-select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { getAllAwards } from '$lib/server/db/functions';
	import players from '$lib/data/members.json';

	let {
		award,
		initialValue = '',
		handleNomination
	}: {
		award: Awaited<ReturnType<typeof getAllAwards>>[number];
		initialValue: string;
		handleNomination: (awardId: string, data: any) => void;
	} = $props();

	let { id, name, description } = award;
	let value = $state<string>(initialValue);

	$effect(() => {
		handleNomination(id, value);
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{name}</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content>
		<NativeSelect.Root bind:value>
			<NativeSelect.Option value="">Nominate</NativeSelect.Option>
			{#each players as player (player.name)}
				<NativeSelect.Option value={player.name}>{player.name}</NativeSelect.Option>
			{/each}
		</NativeSelect.Root>
	</Card.Content>
</Card.Root>
