import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertFoodSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Get food by QR code
  app.get("/api/foods/qr/:code", async (req, res) => {
    const food = await storage.getFoodByQRCode(req.params.code);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(food);
  });

  // Get all foods
  app.get("/api/foods", async (_req, res) => {
    const foods = await storage.getAllFoods();
    res.json(foods);
  });

  // Create new food
  app.post("/api/foods", async (req, res) => {
    try {
      const food = insertFoodSchema.parse(req.body);
      const created = await storage.createFood(food);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid food data" });
    }
  });

  // Get random nutrition fact
  app.get("/api/nutrition-facts/random", async (_req, res) => {
    const fact = await storage.getRandomNutritionFact();
    if (!fact) {
      return res.status(404).json({ message: "No facts available" });
    }
    res.json(fact);
  });

  const httpServer = createServer(app);
  return httpServer;
}
