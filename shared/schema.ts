import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  age: integer("age"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const periodEntries = pgTable("period_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD format
  flow: text("flow"), // light, medium, heavy
  symptoms: json("symptoms").$type<string[]>(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const healthAssessments = pgTable("health_assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // menstrual, hygiene, nutrition, mental
  responses: json("responses").$type<Record<string, any>>(),
  score: integer("score"),
  recommendations: json("recommendations").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const healthTips = pgTable("health_tips", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // nutrition, exercise, mental
  title: text("title").notNull(),
  content: text("content").notNull(),
  isDaily: boolean("is_daily").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const healthResources = pgTable("health_resources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // government, ngo, health_camp
  description: text("description").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
  hours: text("hours"),
  distance: text("distance"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const educationalContent = pgTable("educational_content", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // pcod_pcos, breast_cancer, menstrual_health
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(), // article, myth_buster, faq
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPeriodEntrySchema = createInsertSchema(periodEntries).omit({
  id: true,
  createdAt: true,
});

export const insertHealthAssessmentSchema = createInsertSchema(healthAssessments).omit({
  id: true,
  createdAt: true,
});

export const insertHealthTipSchema = createInsertSchema(healthTips).omit({
  id: true,
  createdAt: true,
});

export const insertHealthResourceSchema = createInsertSchema(healthResources).omit({
  id: true,
  createdAt: true,
});

export const insertEducationalContentSchema = createInsertSchema(educationalContent).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type PeriodEntry = typeof periodEntries.$inferSelect;
export type InsertPeriodEntry = z.infer<typeof insertPeriodEntrySchema>;
export type HealthAssessment = typeof healthAssessments.$inferSelect;
export type InsertHealthAssessment = z.infer<typeof insertHealthAssessmentSchema>;
export type HealthTip = typeof healthTips.$inferSelect;
export type InsertHealthTip = z.infer<typeof insertHealthTipSchema>;
export type HealthResource = typeof healthResources.$inferSelect;
export type InsertHealthResource = z.infer<typeof insertHealthResourceSchema>;
export type EducationalContent = typeof educationalContent.$inferSelect;
export type InsertEducationalContent = z.infer<typeof insertEducationalContentSchema>;
