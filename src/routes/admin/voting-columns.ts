import type { ColumnDef } from '@tanstack/table-core';
import type { VotingResult } from '$lib/server/db/functions/nominations/getAllVotingResults';
import type { VoterInfo } from '$lib/server/db/functions/nominations/getVotersForNominee';

export type VotingResultWithVoters = VotingResult & {
	voters: VoterInfo[];
};

export const votingColumns: ColumnDef<VotingResultWithVoters>[] = [
	{
		id: 'expander',
		header: '',
		cell: ({ row }) => {
			if (row.getCanExpand()) {
				return `<button
					class="flex items-center justify-center w-8 h-8 transition-transform ${row.getIsExpanded() ? 'rotate-90' : ''}"
					aria-label="${row.getIsExpanded() ? 'Collapse' : 'Expand'}"
					style="background: none; border: none; cursor: pointer; padding: 0; font-size: 12px;"
					data-expanded="${row.getIsExpanded()}"
					data-row-id="${row.id}"
				>
					▶
				</button>`;
			}
			return '';
		}
	},
	{
		accessorKey: 'awardName',
		header: 'Award Name'
	},
	{
		accessorKey: 'nomineeName',
		header: 'Nominee'
	},
	{
		accessorKey: 'voteCount',
		header: 'Votes'
	}
];
