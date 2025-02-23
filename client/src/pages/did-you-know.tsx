import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";
import { Lightbulb, RefreshCw } from "lucide-react";
import type { NutritionFact } from "@shared/schema";

export default function DidYouKnow() {
  const { data: fact, isLoading } = useQuery<NutritionFact>({
    queryKey: ["/api/nutrition-facts/random"],
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/nutrition-facts/random"] });
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            Did You Know?
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <>
              <p className="text-lg">{fact?.fact}</p>
              <Button
                onClick={handleRefresh}
                className="mt-4"
                variant="outline"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Another Fact
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
