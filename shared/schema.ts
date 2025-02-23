import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";

// Business data schema
export const businessDataSchema = z.object({
  basic_info: z.object({
    name: z.string(),
    phone: z.string(),
    city: z.string().optional(),
    rating: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    working_hours: z.record(z.string()).optional(),
  }),
  five_star_reviews: z.array(z.object({
    text: z.string(),
    reviewer_name: z.string(),
    date: z.string(),
  })).optional(),
  social_media: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    reviews_link: z.string().optional(),
  }).optional(),
});

export type BusinessData = z.infer<typeof businessDataSchema>;

// User schema for admin access
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
