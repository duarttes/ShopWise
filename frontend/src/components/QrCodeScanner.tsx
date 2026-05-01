import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X } from '@phosphor-icons/react';

interface QrCodeScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export function QrCodeScanner({ onScan, onClose }: QrCodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerId = 'qr-reader';

  async function stopScanner() {
    const scanner = scannerRef.current;
    if (!scanner) return;
    try {
      if (scanner.isScanning) {
        await scanner.stop();
      }
      scanner.clear();
    } catch {
      // ignora erros ao parar
    }
  }

  useEffect(() => {
    const scanner = new Html5Qrcode(containerId);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          await stopScanner();
          onScan(decodedText);
        },
        undefined
      )
      .catch(() => {
        onClose();
      });

    return () => {
      stopScanner();
    };
  }, []);

  async function handleClose() {
    await stopScanner();
    onClose();
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#000',
      zIndex: 500,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px',
      }}>
        <span style={{ color: '#fff', fontFamily: 'Nunito', fontWeight: 700, fontSize: 15 }}>
          Aponte para o QR code
        </span>
        <button
          onClick={handleClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <X size={24} weight="bold" color="#fff" />
        </button>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div id={containerId} style={{ width: '100%', maxWidth: 360 }} />
      </div>
    </div>
  );
}