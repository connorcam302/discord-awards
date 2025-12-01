
<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
	import type { getAllAwards } from "$lib/server/db/functions";
	let { award }: { award: Awaited<ReturnType<typeof getAllAwards>>[number] } = $props();
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
