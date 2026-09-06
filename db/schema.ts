import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const waitlist = sqliteTable('waitlist', {
  email: text('email').primaryKey(),
  trade: text('trade'),
  createdAt: text('created_at').notNull(),
  consentAt: text('consent_at'),
  consentSource: text('consent_source'),
  noticeVersion: text('notice_version'),
});
