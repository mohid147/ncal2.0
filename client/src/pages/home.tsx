import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Lightbulb } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6 md:space-y-8 px-2">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Welcome to <span className="text-primary">NCAL</span>
        </h1>
        <p className="mt-3 md:mt-4 text-lg md:text-xl text-muted-foreground">
          Your personal nutrition and calorie analyzer
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        <Link href="/scan">
          <Card className="cursor-pointer transition-transform hover:scale-102 active:scale-98">
            <CardContent className="flex flex-col items-center p-4 md:p-6 text-center">
              <Camera className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
              <h2 className="text-xl md:text-2xl font-semibold mb-2">Scan Food</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Scan QR codes to get detailed nutritional information
              </p>
              <Button className="w-full md:w-auto">Start Scanning</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/did-you-know">
          <Card className="cursor-pointer transition-transform hover:scale-102 active:scale-98">
            <CardContent className="flex flex-col items-center p-4 md:p-6 text-center">
              <Lightbulb className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
              <h2 className="text-xl md:text-2xl font-semibold mb-2">Did You Know?</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Discover interesting nutrition facts and tips
              </p>
              <Button className="w-full md:w-auto">Learn More</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}