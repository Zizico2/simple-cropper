"use client";

import { useRef, useState } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageUpload from "../components/ImageUpload";
import styles from "./page.module.css";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Store the raw File object to preserve metadata (name, type)
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  // Handler: Receives both URL and File object
  const handleImageSelected = (url: string, file: File) => {
    setOriginalFile(file);
    setCrop(undefined);
    setCompletedCrop(undefined);

    // Load natural dimensions
    const img = new Image();
    img.onload = () => {
      setImageSrc(url);
    };
    img.src = url;
  };

  const onDownload = () => {
    const image = imgRef.current;
    if (!image || !completedCrop || !originalFile) return;

    setIsProcessing(true);

    try {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No 2d context");

      // Target dimensions at full resolution
      const targetWidth = Math.round(completedCrop.width * scaleX);
      const targetHeight = Math.round(completedCrop.height * scaleY);
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.imageSmoothingQuality = "high";

      // Draw the cropped region from the original image
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        targetWidth,
        targetHeight,
        0,
        0,
        targetWidth,
        targetHeight,
      );

      // Filename logic
      const lastDotIndex = originalFile.name.lastIndexOf(".");
      const nameWithoutExt =
        lastDotIndex !== -1
          ? originalFile.name.substring(0, lastDotIndex)
          : originalFile.name;
      const originalExtension =
        lastDotIndex !== -1 ? originalFile.name.substring(lastDotIndex) : "";

      // Download with original MIME type at 100% quality
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
          setIsProcessing(false);
        },
        originalFile.type,
        1.0,
      );
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to crop image");
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setOriginalFile(null);

    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  return (
    <main className={styles.container}>
      {/* <h1 className={styles.title}>Simple Cropper</h1> */}

      {!imageSrc ? (
        <ImageUpload onImageSelected={handleImageSelected} />
      ) : (
        <>

          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            style={{ flex: "1 1 60%", }}
          >
            {/* biome-ignore lint/performance/noImgElement: Required for react-image-crop */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop target"
              crossOrigin="anonymous"

            />
          </ReactCrop>


          <div className={styles.previewContainer}>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div className={styles.infoText}>
                Format: <strong>{originalFile?.type}</strong>
                <br />
                Saving as:{" "}
                <strong>
                  ...-crop
                  {originalFile?.name.substring(
                    originalFile?.name.lastIndexOf("."),
                  )}
                </strong>
              </div>

              <button
                onClick={onDownload}
                className={`${styles.btn} ${styles.btnDownload}`}
                disabled={isProcessing || !completedCrop}
                type="button"
              >
                {isProcessing ? "Processing..." : "Download Crop"}
              </button>

              <button
                onClick={handleReset}
                className={`${styles.btn} ${styles.btnReset}`}
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
