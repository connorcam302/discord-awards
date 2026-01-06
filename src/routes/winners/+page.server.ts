import { db } from '$lib/server/db';
import {
	getAllAwards,
	getAllNominees,
	getAllResults,
	getUserNominations,
	getUserVotes
} from '$lib/server/db/functions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	const awards = await getAllResults(db);

	return { awards };
};
