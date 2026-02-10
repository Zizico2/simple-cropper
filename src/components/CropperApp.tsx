"use client";

import Image from "next/image";

import { useState } from "react";
import ReactCrop, { type Crop, type PercentCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@cloudflare/kumo/components/button";
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
  const [completedCrop, setCompletedCrop] = useState<PercentCrop>();

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
    if (!completedCrop || !imageData) return;

    setIsProcessing(true);
    try {
      await downloadCrop({
        imageSrc: imageData.src,
        crop: completedCrop,
        naturalWidth: imageData.width,
        naturalHeight: imageData.height,
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
    if (imageData) {
      URL.revokeObjectURL(imageData.src);
    }
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
          <Button
            onClick={onDownload}
            disabled={isProcessing || !completedCrop}
            type="button"
            variant="primary"
            loading={isProcessing}
          >
            Download Crop
          </Button>

          <Button
            onClick={handleReset}
            disabled={!imageData}
            type="button"
            variant="destructive"
          >
            Reset
          </Button>
        </div>
      </div>

      {!imageData ? (
        <ImageUpload onImageSelected={handleImageSelected} />
      ) : (
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(_c, percentCrop) => setCompletedCrop(percentCrop)}
        >
          <Image
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
