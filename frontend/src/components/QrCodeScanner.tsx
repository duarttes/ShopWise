import { useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { X } from '@phosphor-icons/react';

interface Props {
  onScan: (result: string) => void;
  onClose: () => void;
}

export function QrCodeScanner({ onScan, onClose }: Props) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerId = 'qr-scanner-container';

  useEffect(() => {
    const scanner = new Html5Qrcode(containerId, { verbose: false });
    scannerRef.current = scanner;

    scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (text) => {
        cleanup().then(() => onScan(text));
      },
      undefined
    ).catch(() => {
      onClose();
    });

    return () => { cleanup(); };
  }, []);

  async function cleanup() {
    const scanner = scannerRef.current;
    if (!scanner) return;
    scannerRef.current = null;
    try {
      const state = scanner.getState();
      if (
        state === Html5QrcodeScannerState.SCANNING ||
        state === Html5QrcodeScannerState.PAUSED
      ) {
        await scanner.stop();
      }
      scanner.clear();
    } catch {}
  }

  async function handleClose() {
    await cleanup();
    onClose();
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#000', zIndex: 500,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
        <span style={{ color: '#fff', fontFamily: 'Nunito', fontWeight: 700, fontSize: 15 }}>
          Aponte para o QR code
        </span>
        <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <X size={24} weight="bold" color="#fff" />
        </button>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div id={containerId} style={{ width: '100%', maxWidth: 360 }} />
      </div>
    </div>
  );
}