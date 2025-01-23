import { pgTable, serial, varchar, json, timestamp } from "drizzle-orm/pg-core";

export const ChatHistory = pgTable("chat_history", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  chatHistory: json("chatHistory").notNull(),
  timestamp: timestamp("timestamp").notNull().default("now()"),
});
