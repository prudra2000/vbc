// utils/qrCodeHelper.ts
import QRCode from 'qrcode.react';
import { RefObject } from 'react';

/**
 * Generates a QR code and attaches it to a ref.
 * @param url - The URL that the QR code should represent.
 * @param qrRef - The ref object to attach the generated QR code to.
 * @param size - Size of the QR code.
 */
export function generateQRCode(url: string, qrRef: RefObject<HTMLCanvasElement>, size: number = 128) {
  return (
    <QRCode
      value={url}
      size={size}
      renderAs="canvas"
      ref={qrRef} // Attach to ref if downloading is needed
    />
  );
}

/**
 * Downloads the QR code as a PNG file.
 * @param qrRef - The ref object containing the QR code.
 * @param fileName - The name of the file to be downloaded.
 */
export function downloadQRCode(qrRef: RefObject<HTMLCanvasElement>, fileName: string) {
  const canvas = qrRef.current;
  if (canvas) {
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.png`;
    a.click();
  }
}
