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
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{food.name}</CardTitle>
        <p className="text-muted-foreground">Serving Size: {food.servingSize}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="mb-4">
            <p className="text-lg font-semibold">{food.calories} calories</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Protein</span>
                <span>{food.protein}g</span>
              </div>
              <Progress value={getNutrientPercentage(food.protein)} />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>Carbs</span>
                <span>{food.carbs}g</span>
              </div>
              <Progress value={getNutrientPercentage(food.carbs)} />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>Fat</span>
                <span>{food.fat}g</span>
              </div>
              <Progress value={getNutrientPercentage(food.fat)} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Health Benefits</h3>
          <ul className="list-disc list-inside space-y-1">
            {food.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Best Time to Consume</h3>
          <p>{food.bestTimeToConsume}</p>
        </div>
      </CardContent>
    </Card>
  );
}
