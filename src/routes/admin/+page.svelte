<script lang="ts">
	import DataTable from './data-table.svelte';
	import { columns } from './columns.ts';
	import * as NativeSelect from '$lib/components/ui/native-select/index.js';

	const { data } = $props();

	const { user, allNominations } = data;

	console.log(data);

	const isAdmin = user?.id === 'e2d7e3a2-4428-47c3-93dd-70d691807896';

	// get all unique nominations award names
	const awardNames = allNominations
		.map((nomination) => nomination.awardName)
		.filter((awardName, index, self) => self.indexOf(awardName) === index);

	let filter = $state('all');
	let filteredNominations = $derived.by(() => {
		if (filter === 'all') return allNominations;
		return allNominations.filter((nomination) => nomination.awardName === filter);
	});
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<div class="flex flex-col items-center justify-center gap-4 p-4">
		{#if isAdmin}
			<h1 class="text-3xl font-bold">Admin Page</h1>
			<NativeSelect.Root bind:value={filter}>
				<NativeSelect.Option value="all">Select award name</NativeSelect.Option>
				{#each awardNames as awardName (awardName)}
					<NativeSelect.Option value={awardName}>{awardName}</NativeSelect.Option>
				{/each}
			</NativeSelect.Root>
			<div class="max-w-3xl">
				<DataTable data={filteredNominations} {columns} />
			</div>
		{:else}
			<h1 class="text-3xl font-bold">You are not an admin</h1>
		{/if}
	</div>
</div>
