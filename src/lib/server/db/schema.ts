import { pgTable, text, uuid, timestamp, uniqueIndex, integer } from 'drizzle-orm/pg-core';

// --- USERS (if using email auth) ---
export const users = pgTable('users', {
	id: uuid('id').primaryKey(),
	name: text('name')
});

// --- AWARDS ---
export const awards = pgTable('awards', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	description: text('description'),
	type: text('type').notNull()
});

// --- NOMINATIONS ---
export const nominations = pgTable('nominations', {
	id: uuid('id').primaryKey().defaultRandom(),
	awardId: uuid('award_id')
		.references(() => awards.id)
		.notNull(),
	nominee: text('nominee').notNull(), // or nomineeUserId if voting for friends
	submittedBy: uuid('submitted_by')
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const nomineeEntities = pgTable('nominee_entities', {
	id: uuid('id').primaryKey().defaultRandom(),

	name: text('name'), // optional (clips might not have one)
	textValue: text('text'), // for pure text awards
	imageUrl: text('image_url'),
	videoUrl: text('video_url'),

	createdAt: timestamp('created_at').defaultNow()
});

export const awardNominees = pgTable('award_nominees', {
	id: uuid('id').primaryKey().defaultRandom(),

	awardId: uuid('award_id')
		.references(() => awards.id)
		.notNull(),

	createdAt: timestamp('created_at').defaultNow()
});

export const awardNomineeMembers = pgTable('award_nominee_members', {
	id: uuid('id').primaryKey().defaultRandom(),
	awardNomineeId: uuid('award_nominee_id')
		.references(() => awardNominees.id)
		.notNull(),
	nomineeEntityId: uuid('nominee_entity_id')
		.references(() => nomineeEntities.id)
		.notNull()
});

export const votes = pgTable('votes', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id')
		.references(() => users.id)
		.notNull(),
	awardNomineeId: uuid('award_nominee_id')
		.references(() => awardNominees.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow()
});
