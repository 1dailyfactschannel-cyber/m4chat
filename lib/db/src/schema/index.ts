import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  avatar: text('avatar'),
  phone: text('phone'),
  username: text('username'),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const chats = pgTable('chats', {
  id: serial('id').primaryKey(),
  name: text('name'),
  avatar: text('avatar'),
  type: text('type').notNull().default('private'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const chatParticipants = pgTable('chat_participants', {
  id: serial('id').primaryKey(),
  chatId: serial('chat_id').references(() => chats.id).notNull(),
  userId: serial('user_id').references(() => users.id).notNull(),
  role: text('role').default('member'),
  joinedAt: timestamp('joined_at').defaultNow(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  chatId: serial('chat_id').references(() => chats.id).notNull(),
  senderId: serial('sender_id').references(() => users.id).notNull(),
  text: text('text'),
  type: text('type').default('text'),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});