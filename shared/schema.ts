import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const foods = pgTable("foods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  calories: integer("calories").notNull(),
  protein: integer("protein").notNull(),
  carbs: integer("carbs").notNull(),
  fat: integer("fat").notNull(),
  qrCode: text("qr_code").notNull().unique(),
  benefits: text("benefits").array().notNull(),
  category: text("category", { enum: ["fruit", "vegetable", "seed", "nut"] }).notNull(),
  bestTimeToConsume: text("best_time_to_consume").notNull(),
  servingSize: text("serving_size").notNull(),
});

export const nutritionFacts = pgTable("nutrition_facts", {
  id: serial("id").primaryKey(),
  fact: text("fact").notNull(),
  category: text("category").notNull(),
});

export const insertFoodSchema = createInsertSchema(foods).omit({ id: true });
export const insertNutritionFactSchema = createInsertSchema(nutritionFacts).omit({ id: true });

export type Food = typeof foods.$inferSelect;
export type InsertFood = z.infer<typeof insertFoodSchema>;
export type NutritionFact = typeof nutritionFacts.$inferSelect;
export type InsertNutritionFact = z.infer<typeof insertNutritionFactSchema>;
