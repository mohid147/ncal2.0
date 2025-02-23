import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import type { Food } from "@shared/schema";
import NutritionCard from "@/components/NutritionCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function FoodDetails() {
  const { qrCode } = useParams();
  
  const { data: food, isLoading } = useQuery<Food>({
    queryKey: ["/api/foods/qr", qrCode],
  });

  if (isLoading) {
    return <Skeleton className="h-[600px] w-full" />;
  }

  if (!food) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-destructive">Food Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The QR code scanned does not match any food in our database
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <NutritionCard food={food} />
    </div>
  );
}
