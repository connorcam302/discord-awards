<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import AwardBlocks from '$lib/components/blocks/AwardBlocks.svelte';
	import Header from '$lib/components/Header.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageData } from './$types';
	import { supabaseClient } from '$lib/supabase/client';
	import { PUBLIC_REDIRECT_URL } from '$env/static/public';
	import NomineeBlocks from '$lib/components/blocks/NomineeBlocks.svelte';

	let { data }: { data: PageData } = $props();

	let { awards, user } = data;

	let allVotes = $state<Record<string, unknown>>({});
	let isSignedIn = $state<boolean>(false);
	let isLoading = $state<boolean>(false);

	const handleSubmit = (votes: unknown) => {
		isLoading = true;
		fetch('/api/voting/add', {
			method: 'POST',
			body: JSON.stringify({ votes, user })
		})
			.then((res) => {
				if (res.ok) alert('Votes submitted!');
				if (res.status === 400) alert('Ensure all fields are filled in.');

				isLoading = false;
			})
			.catch((err) => {
				alert('Something went wrong, please try again.');
				console.error(err);
				isLoading = false;
			});
	};

	async function signInWithGoogle() {
		const { error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${PUBLIC_REDIRECT_URL}/auth/callback`
			}
		});
		if (error) console.error(error);
	}

	if (user) {
		isSignedIn = true;
	}

	$inspect(awards);
	$inspect(allVotes);
</script>

<Header />
<div
	class="font-montserrat mx-auto flex max-w-4xl flex-col gap-8 px-2 py-8 text-center text-lg/snug"
>
	<div class="flex flex-col gap-4">
		<div>
			Welcome to the Discord Awards, a celebration of this community we have built together.
			Individually we are weak, like a single twig, but as a bundle we form a mighty fine group of
			pals. As the hours pass each year, we come to know a bit more about eachother, sometimes it's
			as mysterious as Joe's relationship with his Dad other times its as unwanted as Steve's sex
			life.
			<br />
			<br />
			We are proud of what we have achieved this year and don't look back in anger at what we did not.
			Whether it's staying up at the weekend or breathing in the dark, lying on your side falling asleep
			watching Bingy stream, as our lives move on the moments we share together never change. We are
			here to celebrate our successes and to celebrate our failures.
			<br />
			<br />
			It's not always about the people either, we might set the tone, but the content sets the rhythm
			of the night. It can be a short lived fling or it can be fledged into a meta, both should leave
			you asking for 22 more minutes.
		</div>
	</div>
	<div>
		<Carousel.Root class="mx-auto h-96 w-80 md:w-full">
			<Carousel.Content class="h-96 w-80">
				<Carousel.Item><img src="/bingy.png" /></Carousel.Item>
				<Carousel.Item><img src="/sam-brother.png" /></Carousel.Item>
				<Carousel.Item><img src="/evan-masterlock.png" /></Carousel.Item>
				<Carousel.Item><img src="/liam-fit.png" /></Carousel.Item>
				<Carousel.Item><img src="/discord-dms.png" /></Carousel.Item>
				<Carousel.Item><img src="/burncastle-hairline.png" /></Carousel.Item>
				<Carousel.Item><img src="/frenchy.png" /></Carousel.Item>
				<Carousel.Item><img src="/rematch.jpg" /></Carousel.Item>
				<Carousel.Item><img src="/only-scissors.png" /></Carousel.Item>
				<Carousel.Item><img src="/dk-mirror.png" /></Carousel.Item>
				<Carousel.Item><img src="/connor-silent-hill.png" /></Carousel.Item>
				<Carousel.Item><img src="/matty-malenia.png" /></Carousel.Item>
				<Carousel.Item><img src="/liam-pizza.png" /></Carousel.Item>
				<Carousel.Item><img src="/potential-man.png" /></Carousel.Item>
				<Carousel.Item><img src="/potto-summon.jpg" /></Carousel.Item>
				<Carousel.Item><img src="/fm-tournament.png" /></Carousel.Item>
				<Carousel.Item><img src="/shy-guy.png" /></Carousel.Item>
				<Carousel.Item><img src="/skyrim-mirror.png" /></Carousel.Item>
				<Carousel.Item><img src="/potto-pokemon.png" /></Carousel.Item>
				<Carousel.Item><img src="/steve.png" /></Carousel.Item>
				<Carousel.Item><img src="/tifty-sports-interactive.png" /></Carousel.Item>
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
	<div class="flex flex-col gap-4">
		<h1 class="text-3xl font-bold">How It Works</h1>
		For the single person awards, you should not be nominating yourself, (if you do your vote will be
		voided), but for two person awards you are able to nominte yourself. You will need to be logged in
		to vote and nominate so an audit trail exists.
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
{#if !isSignedIn}
	<div class="flex items-center justify-center py-8">
		<Button onclick={signInWithGoogle} class="h-16 text-3xl font-bold ">Sign in to submit</Button>
	</div>
{/if}

<NomineeBlocks {awards} {isSignedIn} bind:allVotes />

<div class="flex items-center justify-center py-8">
	{#if !isLoading}
		<Button onclick={() => handleSubmit(allVotes)} class="h-16 w-96 text-3xl font-bold">
			Submit Votes
		</Button>
	{:else}
		<Button
			variant="outline"
			class="hover:text-color-primary hover-bg-color-primary h-16 w-96 text-3xl font-bold hover:bg-opacity-10 hover:text-opacity-10"
		>
			Submitting...</Button
		>
	{/if}
</div>
