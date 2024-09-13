import {
  pgTable,
  text,
  timestamp,
  integer
} from "drizzle-orm/pg-core";
import { relations, sql } from 'drizzle-orm';
import { users } from "./users";

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  images: text("images").array().notNull().default(sql`'{}'::text[]`),
  author: text('author').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.author],
    references: [users.id],
  }),
}));


