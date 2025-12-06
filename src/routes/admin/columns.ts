import type { ColumnDef } from '@tanstack/table-core';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

export const columns: ColumnDef<Payment>[] = [
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
