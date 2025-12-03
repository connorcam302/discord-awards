import type { drizzle } from 'drizzle-orm/postgres-js';
import { awards, nominations } from '../../schema';
import { eq } from 'drizzle-orm';

export const getUserNominations = async (db: ReturnType<typeof drizzle>, userId: string) => {
	const userNominations = await db
		.select()
		.from(nominations)
		.where(eq(nominations.submittedBy, userId));

	return userNominations;
};
