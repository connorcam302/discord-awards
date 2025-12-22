<script lang="ts">
	import { cn } from '$lib/utils';

	let { children, isSelected, handleSelect, nominee } = $props();
</script>

<button
	class={cn(
		'selectable-btn relative h-full  overflow-hidden border border-transparent p-4',
		isSelected && 'selected border-accent bg-[#d4c67d20]'
	)}
	onclick={() => handleSelect(nominee.id)}
>
	{@render children()}
</button>

<style>
	.selectable-btn::after {
		content: '';
		position: absolute;
		top: 0;
		left: -200%;
		width: 150%;
		height: 100%;
		background: linear-gradient(
			120deg,
			transparent 30%,
			rgba(212, 198, 125, 0.35),
			transparent 70%
		);
		transform: skewX(-20deg);
	}

	.selectable-btn.selected::after {
		animation: shine 0.7s ease-out;
	}

	@keyframes shine {
		from {
			left: -150%;
		}
		to {
			left: 150%;
		}
	}
</style>
