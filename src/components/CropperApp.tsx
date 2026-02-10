"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { downloadCrop } from "../utils/downloadCrop";
import styles from "./CropperApp.module.css";
import ImageUpload from "./ImageUpload";

interface ImageData {
  src: string;
  file: File;
  width: number;
  height: number;
}

export default function CropperApp() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageSelected = (url: string, file: File) => {
    setCrop(undefined);
    setCompletedCrop(undefined);

    const img = new window.Image();
    img.onload = () => {
      setImageData({
        src: url,
        file,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.src = url;
  };

  const onDownload = async () => {
    const image = imgRef.current;
    if (!image || !completedCrop || !imageData) return;

    setIsProcessing(true);
    try {
      await downloadCrop({
        image,
        crop: completedCrop,
        fileName: imageData.file.name,
        mimeType: imageData.file.type,
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to crop image");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setImageData(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  const fileExtension = imageData
    ? imageData.file.name.substring(imageData.file.name.lastIndexOf("."))
    : "";

  return (
    <>
      <div className={styles.toolbar}>
        <p className={styles.infoText}>
          {imageData ? (
            <>
              Format: <strong>{imageData.file.type}</strong> &middot; Saving as:{" "}
              <strong>...-crop{fileExtension}</strong>
            </>
          ) : (
            "No image selected"
          )}
        </p>

        <div className={styles.toolbarActions}>
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
            disabled={!imageData}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>

      {!imageData ? (
        <ImageUpload onImageSelected={handleImageSelected} />
      ) : (
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        >
          <Image
            ref={imgRef}
            src={imageData.src}
            alt="Crop target"
            width={imageData.width}
            height={imageData.height}
            crossOrigin="anonymous"
            className={styles.cropImage}
            unoptimized
          />
        </ReactCrop>
      )}
    </>
  );
}
