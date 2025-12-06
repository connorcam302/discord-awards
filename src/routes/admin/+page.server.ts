import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { getAllNominations } from '$lib/server/db/functions';

export const load: PageServerLoad = async () => {
	const allNominations = await getAllNominations(db);
	return { allNominations };
};
