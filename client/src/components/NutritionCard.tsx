import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Food } from "@shared/schema";

interface NutritionCardProps {
  food: Food;
}

export default function NutritionCard({ food }: NutritionCardProps) {
  const totalNutrients = food.protein + food.carbs + food.fat;

  const getNutrientPercentage = (value: number) => {
    return (value / totalNutrients) * 100;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 px-4 md:px-6">
        <CardTitle className="text-xl md:text-2xl font-bold">{food.name}</CardTitle>
        <p className="text-sm md:text-base text-muted-foreground">Serving Size: {food.servingSize}</p>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
        <div>
          <div className="mb-4">
            <p className="text-base md:text-lg font-semibold">{food.calories} calories</p>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-sm md:text-base">
                <span>Protein</span>
                <span>{food.protein}g</span>
              </div>
              <Progress value={getNutrientPercentage(food.protein)} />
            </div>

            <div>
              <div className="flex justify-between mb-2 text-sm md:text-base">
                <span>Carbs</span>
                <span>{food.carbs}g</span>
              </div>
              <Progress value={getNutrientPercentage(food.carbs)} />
            </div>

            <div>
              <div className="flex justify-between mb-2 text-sm md:text-base">
                <span>Fat</span>
                <span>{food.fat}g</span>
              </div>
              <Progress value={getNutrientPercentage(food.fat)} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-base md:text-lg">Health Benefits</h3>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
            {food.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-base md:text-lg">Best Time to Consume</h3>
          <p className="text-sm md:text-base">{food.bestTimeToConsume}</p>
        </div>
      </CardContent>
    </Card>
  );
}