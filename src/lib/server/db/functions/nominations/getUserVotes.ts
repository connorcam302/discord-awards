import type { drizzle } from 'drizzle-orm/postgres-js';
import { awardNominees, votes } from '../../schema';
import { eq } from 'drizzle-orm';

export const getUserVotes = async (db: ReturnType<typeof drizzle>, userId: string) => {
	const rows = await db
		.select({
			awardId: awardNominees.awardId,
			nomineeId: votes.awardNomineeId
		})
		.from(votes)
		.innerJoin(awardNominees, eq(votes.awardNomineeId, awardNominees.id))
		.where(eq(votes.userId, userId));

	return Object.fromEntries(rows.map((row) => [row.awardId, row.nomineeId]));
};
