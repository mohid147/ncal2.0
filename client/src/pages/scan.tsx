import { useCallback } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import QRScanner from "@/components/QRScanner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Scan() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleScan = useCallback((result: string) => {
    toast({
      title: "QR Code Detected",
      description: "Loading nutrition information...",
    });
    setLocation(`/food/${result}`);
  }, [setLocation, toast]);

  const handleError = useCallback((error: string) => {
    // Only show toast for significant errors
    if (!error.includes("No QR code found")) {
      toast({
        title: "Scanning Error",
        description: error.includes("Permission denied")
          ? "Please allow camera access to scan QR codes"
          : "There was a problem with the scanner. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Scan QR Code</CardTitle>
          <CardDescription>
            Position the QR code within the frame to scan. Make sure you have good lighting and the code is clearly visible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QRScanner onResult={handleScan} onError={handleError} />
        </CardContent>
      </Card>
    </div>
  );
}