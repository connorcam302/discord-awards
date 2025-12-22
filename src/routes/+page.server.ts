import { db } from '$lib/server/db';
import {
	getAllAwards,
	getAllNominees,
	getUserNominations,
	getUserVotes
} from '$lib/server/db/functions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	const awards = await getAllNominees(db);
	if (user) {
		const userVotes = await getUserVotes(db, user.id);

		console.log(userVotes);

		for (const award of awards) {
			const nomination = userVotes[award.id];
			console.log(nomination);
			award.initialValue = nomination ?? '';
		}
	}

	return { awards };
};
