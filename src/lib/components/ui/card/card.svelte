<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	let cardElement: HTMLDivElement;
	let mouseX = 0;
	let mouseY = 0;

	function handleMouseMove(e: MouseEvent) {
		if (!cardElement) return;

		const rect = cardElement.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;

		cardElement.style.setProperty('--cursor-x', `${mouseX}px`);
		cardElement.style.setProperty('--cursor-y', `${mouseY}px`);
	}
</script>

<div
	class="card-container w-full max-w-2xl"
	bind:this={cardElement}
	onmousemove={handleMouseMove}
	role="presentation"
	{...restProps}
>
	<div class="card bg-card text-card-foreground w-full py-6">
		{@render children?.()}
	</div>
</div>

<style>
	.card-container {
		position: relative;
		padding: 2px;

		background: radial-gradient(
			circle 160px at var(--cursor-x, 50%) var(--cursor-y, 50%),
			#fff4ba 0%,
			#d4c67d 30%,
			#404040 70%
		);
		transition: background 0.05s ease-out;
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
</style>
