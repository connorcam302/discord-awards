<script lang="ts">
	import { type ColumnDef, getCoreRowModel } from '@tanstack/table-core';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { VotingResultWithVoters } from './voting-columns.ts';

	type VotingTableProps = {
		columns: ColumnDef<VotingResultWithVoters>[];
		data: VotingResultWithVoters[];
	};

	let { data, columns }: VotingTableProps = $props();

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		getCoreRowModel: getCoreRowModel()
	});

	function toggleRow(rowId: string) {
		const row = table.getRow(rowId);
		if (row) {
			row.toggleExpanded();
		}
	}

	$effect(() => {
		const buttons = document.querySelectorAll('[data-row-id]');
		buttons.forEach((button) => {
			if (button instanceof HTMLButtonElement) {
				button.onclick = () => {
					toggleRow(button.dataset.rowId || '');
				};
			}
		});
	});
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head colspan={header.colSpan}>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row data-state={row.getIsSelected() && 'selected'}>
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
				</Table.Row>
				{#if row.getIsExpanded()}
					<Table.Row>
						<Table.Cell colspan={row.getAllCells().length}>
							<div class="p-4">
								{#if row.original.voters}
									<div class="text-sm">
										<p class="mb-2 font-semibold">Voters:</p>
										<ul class="list-inside list-disc space-y-1">
											{#each row.original.voters as voter}
												<li>{voter.userName}</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						</Table.Cell>
					</Table.Row>
				{/if}
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
