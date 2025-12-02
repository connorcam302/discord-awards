<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { getAllAwards } from '$lib/server/db/functions';

	let {
		award,
		initialValue = '',
		handleNomination
	}: {
		award: Awaited<ReturnType<typeof getAllAwards>>[number];
		initialValue: string;
		handleNomination: (awardId: string, data: unknown) => void;
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
		<Input bind:value placeholder="Enter your answer" />
	</Card.Content>
</Card.Root>
