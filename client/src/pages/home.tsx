import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Lightbulb } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to <span className="text-primary">NCAL</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Your personal nutrition and calorie analyzer
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/scan">
          <Card className="cursor-pointer transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Camera className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Scan Food</h2>
              <p className="text-muted-foreground">
                Scan QR codes to get detailed nutritional information
              </p>
              <Button className="mt-4">Start Scanning</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/did-you-know">
          <Card className="cursor-pointer transition-transform hover:scale-105">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Did You Know?</h2>
              <p className="text-muted-foreground">
                Discover interesting nutrition facts and tips
              </p>
              <Button className="mt-4">Learn More</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
