<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
	import type { getAllAwards } from "$lib/server/db/functions";

	let { award, value = '', onNominate }: 
	{ 
	  award: ReturnType<typeof getAllAwards>[number],
	  value: string, 
	  onNominate: (awardId: string, data: any) => void; 
	} = $props();

	let {id, name, description} = award;

</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{name}</Card.Title>
    <Card.Description>{description}</Card.Description>
  </Card.Header>
  <Card.Content>
    <Input bind:value={value} placeholder="Enter your answer" />
  </Card.Content>
</Card.Root>
