<script lang="ts">
	import AwardBlocks from '$lib/components/blocks/AwardBlocks.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let { awards } = data;

	const handleSubmit = (data: unknown) => {
		console.log('Data:', data);
	};

	let allNominations = $state<Record<string, unknown>>({});

	$inspect(allNominations);
</script>

<div
	class="font-montserrat mx-auto flex max-w-4xl flex-col gap-8 px-2 py-8 text-center text-lg/snug"
>
	<div class="flex flex-col gap-4">
		<h1 class="text-6xl font-bold">The Discord Awards</h1>
		<div>
			Welcome to the Discord Awards, a celebration of this community we have built together.
			Individually we are weak, like a single twig, but as a bundle we form a mighty fine group of
			pals. As the hours pass each year, we come to know a bit more about eachother, sometimes it's
			as mysterious as Joe's relationship with his Dad other times other times its as unwanted as
			Steve's sex life.
			<br />
			<br />
			We are proud of what we have achieved this year and don't look back in anger at what we did not.
			Whether it's staying up at the weekend or breathing in the dark, lying on your side falling asleep
			watching Bingy stream, as our live move on the moments we share together never change. We are here
			to celebrate our successes and to celebrate our failures.
			<br />
			<br />
			It's not always about the people either, we might set the tone, but the content sets the rhythm
			of the night. It can be a short lived fling or it can be fledged into a meta, both should leave
			you asking for 22 more minutes.
		</div>
	</div>
	<div class="flex flex-col gap-4">
		<h1 class="text-3xl font-bold">How It Works</h1>

		For the single person awards, you should not be nominating yourself, (if you do your vote will
		be voided), but for two person awards you are able to nominte yourself. You will need to be
		logged in to vote and nominate so an audit trail exists.
	</div>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col items-center gap-2 text-left">
			<div class="flex w-96 items-center gap-4">
				<div class="h-6 w-6 rounded-full bg-white"></div>
				<div class="text-xl">Nominations</div>
			</div>
			<div class="flex w-96 items-center gap-2">
				<div class="flex w-6 items-center justify-center self-stretch">
					<div class="h-full w-1 bg-white"></div>
				</div>
				<div class="w-96 text-neutral-400">
					Nominations are open and you are free to submit any nominations you want. Nominations will
					be locked on the 10th of December. Up until this point you are able to change your
					nominations.
				</div>
			</div>
			<div class="flex w-96 items-center gap-4">
				<div class="h-6 w-6 rounded-full bg-white"></div>
				<div class="text-xl">Voting</div>
			</div>
			<div class="flex w-96 items-center gap-2">
				<div class="flex w-6 items-center justify-center self-stretch">
					<div class="h-full w-1 bg-white"></div>
				</div>
				<div class="w-96 text-neutral-400">
					Based on the nominations, the top 3 to 5 nominated will be eligible to be voted on. In the
					event of a tie, multiple winners will be declared. Up until voting closes, you are able to
					change your vote.
				</div>
			</div>
			<div class="flex w-96 items-center gap-4">
				<div class="h-6 w-6 rounded-full bg-white"></div>
				<div class="text-xl">Awards</div>
			</div>
			<div class="flex w-96 items-center gap-2">
				<div class="flex w-6 items-center justify-center self-stretch">
					<div class="h-full w-1 bg-white"></div>
				</div>
				<div class="w-96 text-neutral-400">
					Awards will be revealed in a final presenation once all votes have been counted.
				</div>
			</div>
		</div>
	</div>
</div>
<AwardBlocks {awards} {allNominations} />

<Button onclick={() => handleSubmit(allNominations)}>Submit</Button>
