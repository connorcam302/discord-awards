import { db } from '$lib/server/db';
import { getAllAwards, getUserNominations } from '$lib/server/db/functions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session, user } = await safeGetSession();
	const awards = await getAllAwards(db);
	if (user) {
		const userNominations = await getUserNominations(db, user.id);

		for (const award of awards) {
			const nomination = userNominations.find((n) => n.awardId === award.id);
			award.initialValue = nomination?.nominee ?? '';
		}
	}

	return { awards };
};
