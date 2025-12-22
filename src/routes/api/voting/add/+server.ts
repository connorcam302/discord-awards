import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { awards, awardNominees, votes } from '$lib/server/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { db } from '$lib/server/db';

type VotePayload = Record<string, string>; // { [awardId]: nomineeId }

export const POST: RequestHandler = async ({ request, locals }) => {
	const { votes: submittedVotes, user }: { votes: VotePayload; user: { id: string } } =
		await request.json();

	if (!user) {
		throw error(401, 'Not authenticated');
	}

	const entries = Object.entries(submittedVotes);

	if (entries.length === 0) {
		throw error(400, 'No votes submitted');
	}

	const hasEmpty = entries.some(([, nomineeId]) => !nomineeId);
	if (hasEmpty) {
		throw error(400, 'You must vote in every category');
	}

	const awardIds = entries.map(([awardId]) => awardId);
	const nomineeIds = entries.map(([, nomineeId]) => nomineeId);

	const awardsWithNominees = await db
		.select({ awardId: awardNominees.awardId })
		.from(awardNominees)
		.groupBy(awardNominees.awardId);

	const requiredAwardIds = awardsWithNominees.map((a) => a.awardId);

	const missingAwards = requiredAwardIds.filter((id) => !awardIds.includes(id));

	if (missingAwards.length > 0) {
		throw error(400, 'You must vote in every category');
	}

	const validNominees = await db
		.select({
			nomineeId: awardNominees.id,
			awardId: awardNominees.awardId
		})
		.from(awardNominees)
		.where(inArray(awardNominees.id, nomineeIds));

	const nomineeToAward = new Map(validNominees.map((n) => [n.nomineeId, n.awardId]));

	for (const [awardId, nomineeId] of entries) {
		if (nomineeToAward.get(nomineeId) !== awardId) {
			throw error(400, 'Invalid nominee submitted');
		}
	}

	await db.transaction(async (tx) => {
		// Delete existing votes
		console.log(user.id);
		await tx.delete(votes).where(eq(votes.userId, user.id));

		// Insert new votes
		for (const nomineeId of nomineeIds) {
			await tx.insert(votes).values({
				userId: user.id,
				awardNomineeId: nomineeId
			});
		}
	});

	return json({ success: true });
};
