<script lang="ts">
	import Button from '../ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	let { children, isShowingDefault = true, ...restProps } = $props();

	let isShowing = $derived(isShowingDefault);
</script>

<div class="flex h-screen w-full snap-start snap-always items-center justify-center" {...restProps}>
	<div class="flex min-h-screen w-full items-center justify-center px-2">
		<Card.Root class="w-full max-w-4xl">
			<Card.Content class="flex h-[90vh] flex-col">
				{#if isShowing}
					{@render children()}
				{:else}
					<Button onclick={() => (isShowing = true)}>Reveal</Button>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>
