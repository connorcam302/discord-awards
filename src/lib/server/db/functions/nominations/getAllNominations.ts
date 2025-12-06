import type { drizzle } from 'drizzle-orm/postgres-js';
import { awards, nominations, users } from '../../schema';
import { eq } from 'drizzle-orm';

export const getAllNominations = async (db: ReturnType<typeof drizzle>) => {
	const allNominations = await db
		.select({
			awardName: awards.name,
			nominee: nominations.nominee,
			user: users.name
		})
		.from(nominations)
		.innerJoin(awards, eq(nominations.awardId, awards.id))
		.innerJoin(users, eq(nominations.submittedBy, users.id));

	return allNominations;
};
