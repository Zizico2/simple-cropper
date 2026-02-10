import type { PixelCrop } from "react-image-crop";

interface CropDownloadOptions {
  image: HTMLImageElement;
  crop: PixelCrop;
  fileName: string;
  mimeType: string;
}

export function downloadCrop({
  image,
  crop,
  fileName,
  mimeType,
}: CropDownloadOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("No 2d context"));
      return;
    }

    const targetWidth = Math.round(crop.width * scaleX);
    const targetHeight = Math.round(crop.height * scaleY);
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      targetWidth,
      targetHeight,
      0,
      0,
      targetWidth,
      targetHeight,
    );

    const lastDotIndex = fileName.lastIndexOf(".");
    const nameWithoutExt =
      lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
    const originalExtension =
      lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : "";

    canvas.toBlob(
      (blob: Blob | null) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${nameWithoutExt}-crop${originalExtension}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
        resolve();
      },
      mimeType,
      1.0,
    );
  });
}
