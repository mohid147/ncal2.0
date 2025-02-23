import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QRScannerProps {
  onResult: (result: string) => void;
  onError?: (error: string) => void;
}

export default function QRScanner({ onResult, onError }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!scannerRef.current) {
      try {
        scannerRef.current = new Html5QrcodeScanner(
          "qr-reader",
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            showTorchButtonIfSupported: true,
            supportedScanTypes: [Html5QrcodeScanType.QR_CODE]
          },
          false
        );

        scannerRef.current.render(
          (decodedText) => {
            setError("");
            onResult(decodedText);
          },
          (errorMessage) => {
            // Only set error for non-scanning errors
            if (!errorMessage.includes("No QR code found")) {
              setError(errorMessage);
              if (onError) {
                onError(errorMessage);
              }
            }
          }
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to initialize scanner";
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
      }
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
          .catch(console.error);
      }
    };
  }, [onResult, onError]);

  return (
    <Card className="p-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.includes("Permission denied") 
              ? "Please allow camera access to scan QR codes"
              : error}
          </AlertDescription>
        </Alert>
      )}
      <div id="qr-reader" className="mx-auto max-w-md" />
    </Card>
  );
}