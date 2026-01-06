import type { drizzle } from 'drizzle-orm/postgres-js';
import { votes, users } from '../../schema';
import { eq } from 'drizzle-orm';

export type VoterInfo = {
	userName: string | null;
	userId: string;
};

export const getVotersForNominee = async (
	db: ReturnType<typeof drizzle>,
	awardNomineeId: string
) => {
	const voters = await db
		.select({
			userName: users.name,
			userId: votes.userId
		})
		.from(votes)
		.innerJoin(users, eq(votes.userId, users.id))
		.where(eq(votes.awardNomineeId, awardNomineeId));

	return voters;
};
