import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card } from "@/components/ui/card";

interface QRScannerProps {
  onResult: (result: string) => void;
  onError?: (error: string) => void;
}

export default function QRScanner({ onResult, onError }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          onResult(decodedText);
        },
        (errorMessage) => {
          if (onError) {
            onError(errorMessage);
          }
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [onResult, onError]);

  return (
    <Card className="p-4">
      <div id="qr-reader" className="mx-auto max-w-md" />
    </Card>
  );
}
