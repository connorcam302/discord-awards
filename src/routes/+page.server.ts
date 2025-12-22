import { db } from '$lib/server/db';
import { getAllAwards, getAllNominees, getUserNominations } from '$lib/server/db/functions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session, user } = await safeGetSession();

	const awards = await getAllNominees(db);

	return { awards };
};
