<script lang="ts">
	import DataTable from './data-table.svelte';
	import VotingTable from './voting-table.svelte';
	import { columns } from './columns.ts';
	import { votingColumns } from './voting-columns.ts';
	import * as NativeSelect from '$lib/components/ui/native-select/index.js';
	import type { VotingResultWithVoters } from './voting-columns';

	const { data } = $props();

	const { user, allNominations, votingResults } = data;

	console.log(data);

	const isAdmin = user?.id === 'e2d7e3a2-4428-47c3-93dd-70d691807896';

	const awardNames = allNominations
		.map((nomination) => nomination.awardName)
		.filter((awardName, index, self) => self.indexOf(awardName) === index);

	let nominationsFilter = $state('all');
	let filteredNominations = $derived.by(() => {
		if (nominationsFilter === 'all') return allNominations;
		return allNominations.filter((nomination) => nomination.awardName === nominationsFilter);
	});

	let votingFilter = $state('all');
	let filteredVotingResults = $derived.by(() => {
		if (votingFilter === 'all') return votingResults;
		return votingResults.filter((result) => result.awardName === votingFilter);
	});

	const votingAwardNames = votingResults
		.map((result) => result.awardName)
		.filter((awardName, index, self) => self.indexOf(awardName) === index);
</script>

<div class="flex flex-col items-center justify-center gap-8 p-4">
	{#if isAdmin}
		<h1 class="text-3xl font-bold">Admin Page</h1>

		<div class="flex flex-col items-center gap-4 p-4">
			<h2 class="text-2xl font-bold">Nominations</h2>
			<NativeSelect.Root bind:value={nominationsFilter}>
				<NativeSelect.Option value="all">Select award name</NativeSelect.Option>
				{#each awardNames as awardName (awardName)}
					<NativeSelect.Option value={awardName}>{awardName}</NativeSelect.Option>
				{/each}
			</NativeSelect.Root>
			<div class="max-w-3xl">
				<DataTable data={filteredNominations} {columns} />
			</div>
		</div>

		<div class="flex flex-col items-center gap-4 p-4">
			<h2 class="text-2xl font-bold">Voting Results</h2>
			<NativeSelect.Root bind:value={votingFilter}>
				<NativeSelect.Option value="all">Select award name</NativeSelect.Option>
				{#each votingAwardNames as awardName (awardName)}
					<NativeSelect.Option value={awardName}>{awardName}</NativeSelect.Option>
				{/each}
			</NativeSelect.Root>
			<div class="max-w-3xl">
				<VotingTable data={filteredVotingResults} columns={votingColumns} />
			</div>
		</div>
	{:else}
		<h1 class="text-3xl font-bold">You are not an admin</h1>
	{/if}
</div>
