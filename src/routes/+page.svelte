<script lang="ts">
	import AwardBlocks from '$lib/components/blocks/AwardBlocks.svelte';
  import type { PageData } from './$types'
  
  let { data }: { data: PageData } = $props()

  let {awards} = data;
</script>


<AwardBlocks {awards} />
