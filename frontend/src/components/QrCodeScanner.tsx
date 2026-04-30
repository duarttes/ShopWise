import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QrCodeScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export function QrCodeScanner({ onScan, onClose }: QrCodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerId = 'qr-reader';

  useEffect(() => {
    const scanner = new Html5Qrcode(containerId);
    scannerRef.current = scanner;

    scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        scanner.stop().then(() => {
          onScan(decodedText);
        });
      },
      undefined
    ).catch(() => {
      onClose();
    });

    return () => {
      scanner.isScanning && scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex justify-between items-center p-4">
        <span className="text-white font-medium">Aponte para o QR code</span>
        <button onClick={onClose} className="text-white text-2xl">✕</button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div id={containerId} className="w-full max-w-sm" />
      </div>
    </div>
  );
}