import { foods, nutritionFacts, type Food, type InsertFood, type NutritionFact, type InsertNutritionFact } from "@shared/schema";

export interface IStorage {
  getAllFoods(): Promise<Food[]>;
  getFoodByQRCode(qrCode: string): Promise<Food | undefined>;
  createFood(food: InsertFood): Promise<Food>;
  getAllNutritionFacts(): Promise<NutritionFact[]>;
  getRandomNutritionFact(): Promise<NutritionFact | undefined>;
}

export class MemStorage implements IStorage {
  private foods: Map<number, Food>;
  private nutritionFacts: Map<number, NutritionFact>;
  private currentFoodId: number;
  private currentFactId: number;

  constructor() {
    this.foods = new Map();
    this.nutritionFacts = new Map();
    this.currentFoodId = 1;
    this.currentFactId = 1;
    
    // Seed initial data
    this.seedData();
  }

  async getAllFoods(): Promise<Food[]> {
    return Array.from(this.foods.values());
  }

  async getFoodByQRCode(qrCode: string): Promise<Food | undefined> {
    return Array.from(this.foods.values()).find(food => food.qrCode === qrCode);
  }

  async createFood(insertFood: InsertFood): Promise<Food> {
    const id = this.currentFoodId++;
    const food: Food = { ...insertFood, id };
    this.foods.set(id, food);
    return food;
  }

  async getAllNutritionFacts(): Promise<NutritionFact[]> {
    return Array.from(this.nutritionFacts.values());
  }

  async getRandomNutritionFact(): Promise<NutritionFact | undefined> {
    const facts = Array.from(this.nutritionFacts.values());
    if (facts.length === 0) return undefined;
    return facts[Math.floor(Math.random() * facts.length)];
  }

  private seedData() {
    // Seed some initial foods
    const initialFoods: InsertFood[] = [
      {
        name: "Apple",
        calories: 95,
        protein: 0,
        carbs: 25,
        fat: 0,
        qrCode: "APPLE001",
        benefits: ["High in fiber", "Good source of vitamin C", "Heart healthy"],
        category: "fruit",
        bestTimeToConsume: "Morning or as a pre-workout snack",
        servingSize: "1 medium apple (182g)"
      },
      {
        name: "Almonds",
        calories: 164,
        protein: 6,
        carbs: 6,
        fat: 14,
        qrCode: "ALMOND001",
        benefits: ["Rich in protein", "Good source of healthy fats", "Contains vitamin E"],
        category: "nut",
        bestTimeToConsume: "As a snack between meals",
        servingSize: "1 ounce (28g)"
      }
    ];

    initialFoods.forEach(food => this.createFood(food));

    // Seed some nutrition facts
    const initialFacts: InsertNutritionFact[] = [
      {
        fact: "Eating bananas can help reduce bloating and support heart health",
        category: "fruits"
      },
      {
        fact: "Almonds contain more protein than eggs gram for gram",
        category: "nuts"
      },
      {
        fact: "Spinach is high in iron and can boost energy levels",
        category: "vegetables"
      }
    ];

    initialFacts.forEach(fact => {
      const id = this.currentFactId++;
      this.nutritionFacts.set(id, { ...fact, id });
    });
  }
}

export const storage = new MemStorage();
