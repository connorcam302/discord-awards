import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users, nominations as nominationsTable } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
	const { nominations, user } = await request.json();

	console.log('adding');

	// Ensure user exists
	const userCheck = await db.select().from(users).where(eq(users.id, user.id));

	if (!userCheck.length) {
		await db.insert(users).values({ id: user.id, name: user.email });
	}

	// Validate and insert nominations
	for (const awardId of Object.keys(nominations)) {
		const nominee = nominations[awardId];

		if (!nominee || nominee === '-') {
			throw error(400, { message: 'Ensure all nominations are filled in.' });
		}

		//remove existing entry if it exists

		await db
			.delete(nominationsTable)
			.where(and(eq(nominationsTable.awardId, awardId), eq(nominationsTable.submittedBy, user.id)));

		const inserted = await db.insert(nominationsTable).values({
			awardId,
			nominee,
			submittedBy: user.id
		});
	}

	return json({ success: true });
};
