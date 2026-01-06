<script lang="ts">
	import ResultBlocks from '$lib/components/blocks/ResultBlocks.svelte';
	import Header from '$lib/components/Header.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let { awards, user } = data;

	let allVotes = $state<Record<string, unknown>>({});
	let isSignedIn = $state<boolean>(false);
	let currentIndex = $state(0);
	let scrollContainer: HTMLElement;

	if (user) {
		isSignedIn = true;
	}

	$inspect(awards);
	$inspect(allVotes);

	function scrollToNext() {
		if (currentIndex < awards.length - 1) {
			currentIndex++;
			scrollToIndex(currentIndex);
		}
	}

	function scrollToPrev() {
		if (currentIndex > 0) {
			currentIndex--;
			scrollToIndex(currentIndex);
		}
	}

	function scrollToIndex(index: number) {
		const elements = document.querySelectorAll('[data-snap-item]');
		elements[index]?.scrollIntoView({ behavior: 'smooth' });
	}

	function handleScroll() {
		const elements = document.querySelectorAll('[data-snap-item]');
		const containerCenter = window.innerHeight / 2;

		let closestIndex = 0;
		let closestDistance = Infinity;

		elements.forEach((element, index) => {
			const rect = element.getBoundingClientRect();
			const elementCenter = rect.top + rect.height / 2;
			const distance = Math.abs(containerCenter - elementCenter);

			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = index;
			}
		});

		currentIndex = closestIndex;
	}
</script>

{#if isSignedIn}
	<div
		class="scroll-snap-y scroll-snap-mandatory scrollbar-hide h-screen overflow-y-scroll"
		bind:this={scrollContainer}
		onscroll={handleScroll}
	>
		<ResultBlocks results={awards} />
	</div>

	<div class="fixed bottom-8 left-1/2 flex -translate-x-1/2 gap-4">
		<Button onclick={scrollToPrev} disabled={currentIndex === 0}>Previous</Button>
		<Button onclick={scrollToNext} disabled={currentIndex === awards.length - 1}>Next</Button>
	</div>
{/if}

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
