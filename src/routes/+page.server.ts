import { db } from '$lib/server/db';
import { getAllAwards } from '$lib/server/db/functions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const awards = await getAllAwards(db);

  return { awards };
};
