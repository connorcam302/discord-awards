import type { ColumnDef } from '@tanstack/table-core';

export type NominationData = {
	awardName: string;
	nominee: string;
	user: string | null;
};

export const columns: ColumnDef<NominationData>[] = [
	{
		accessorKey: 'awardName',
		header: 'Award Name'
	},
	{
		accessorKey: 'user',
		header: 'Email'
	},
	{
		accessorKey: 'nominee',
		header: 'Nominee'
	}
	/*{
		accessorKey: 'createdAt',
		header: 'Created At'
	}*/
];
