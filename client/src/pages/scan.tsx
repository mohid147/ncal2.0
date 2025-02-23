import { useCallback } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import QRScanner from "@/components/QRScanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Scan() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleScan = useCallback((result: string) => {
    setLocation(`/food/${result}`);
  }, [setLocation]);

  const handleError = useCallback((error: string) => {
    toast({
      title: "Scanning Error",
      description: "Please try scanning again",
      variant: "destructive",
    });
  }, [toast]);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Scan QR Code</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Position the QR code within the frame to scan
          </p>
          <QRScanner onResult={handleScan} onError={handleError} />
        </CardContent>
      </Card>
    </div>
  );
}
