<script lang="ts">
import * as Card from "$lib/components/ui/card/index.js";

	type Award = {
		id: string;
		name: string;
		description: string;
	};

	let { award }: { award: Award } = $props();
	let {id, name, description} = award;
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{name}</Card.Title>
    <Card.Description>{description}</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Card Content</p>
  </Card.Content>
</Card.Root>
