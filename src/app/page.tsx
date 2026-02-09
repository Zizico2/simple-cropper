"use client";

import { useEffect, useRef, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import styles from "./page.module.css";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Store the raw File object to preserve metadata (name, type)
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  // Store natural dimensions to calculate correct scale
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });

  // const cropperRef = useRef<any>(null);
  const selectionRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  useEffect(() => {
    import("cropperjs");
  }, []);

  // Handler: Receives both URL and File object
  const handleImageSelected = (url: string, file: File) => {
    setImageSrc(url);
    setOriginalFile(file);

    // Load natural dimensions
    const img = new Image();
    img.onload = () => {
      setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = url;
  };

  const onDownload = async () => {
    const selection = selectionRef.current;
    const imageElement = imageRef.current;

    if (selection && imageElement && originalFile) {
      setIsProcessing(true);

      try {
        const imgRect = imageElement.getBoundingClientRect();
        const selectionRect = selection.getBoundingClientRect();

        // Safety check
        if (!naturalSize.width || !imgRect.width) return;

        // 1. Calculate Scale (Natural Size / Screen Size)
        const scale = naturalSize.width / imgRect.width;

        // 2. Calculate Target Dimensions
        const targetWidth = Math.max(
          1,
          Math.round(selectionRect.width * scale),
        );
        const targetHeight = Math.max(
          1,
          Math.round(selectionRect.height * scale),
        );

        // 3. Generate High-Res Canvas
        const canvas = await selection.$toCanvas({
          width: targetWidth,
          height: targetHeight,
        });

        // 4. Filename Logic
        // Extract exact extension from original filename (e.g. .jpeg)
        const lastDotIndex = originalFile.name.lastIndexOf(".");
        const nameWithoutExt =
          lastDotIndex !== -1
            ? originalFile.name.substring(0, lastDotIndex)
            : originalFile.name;
        const originalExtension =
          lastDotIndex !== -1 ? originalFile.name.substring(lastDotIndex) : "";

        // 5. Download
        // We ask the browser to use the original MIME type (e.g. image/jpeg) at 100% quality
        canvas.toBlob(
          (blob: Blob | null) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;

              // Construct filename: "my-photo-crop.jpeg"
              link.download = `${nameWithoutExt}-crop${originalExtension}`;

              document.body.appendChild(link);
              link.click();

              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }
          },
          originalFile.type,
          1.0,
        );
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to crop image");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setOriginalFile(null);
    setNaturalSize({ width: 0, height: 0 });
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cropper.js 2.0</h1>

      {!imageSrc ? (
        <ImageUpload onImageSelected={handleImageSelected} />
      ) : (
        <div className={styles.editorLayout}>
          <div className={styles.cropContainer}>
            {/* biome-ignore lint: Custom Element */}
            <cropper-canvas
              // ref={cropperRef}
              background
              class={styles.cropperCanvas}
            >
              {/* biome-ignore lint: Custom Element */}
              <cropper-image
                ref={imageRef}
                src={imageSrc}
                alt="Picture"
                rotatable
                scalable
                skewable
                translatable
              ></cropper-image>
              {/* biome-ignore lint: Custom Element */}
              <cropper-shade hidden></cropper-shade>
              {/* biome-ignore lint: Custom Element */}
              <cropper-handle action="select" plain></cropper-handle>

              {/* biome-ignore lint: Custom Element */}
              <cropper-selection
                ref={selectionRef}
                id="crop-selection"
                initial-coverage="0.5"
                movable
                resizable
              >
                {/* biome-ignore lint: Custom Element */}
                <cropper-grid role="grid" cover></cropper-grid>
                {/* biome-ignore lint: Custom Element */}
                <cropper-crosshair centered></cropper-crosshair>
                {/* biome-ignore lint: Custom Element */}
                <cropper-handle
                  action="move"
                  theme-color="rgba(255, 255, 255, 0.35)"
                ></cropper-handle>
                {/* biome-ignore lint: Custom Element */}
                <cropper-handle action="nw-resize"></cropper-handle>
                {/* biome-ignore lint: Custom Element */}
                <cropper-handle action="ne-resize"></cropper-handle>
                {/* biome-ignore lint: Custom Element */}
                <cropper-handle action="se-resize"></cropper-handle>
                {/* biome-ignore lint: Custom Element */}
                <cropper-handle action="sw-resize"></cropper-handle>
              </cropper-selection>
            </cropper-canvas>
          </div>

          <div className={styles.previewContainer}>
            <div>
              <div className={styles.previewLabel}>Live Preview</div>
              {/* biome-ignore lint: Custom Element */}
              <cropper-viewer
                selection="#crop-selection"
                class={styles.viewer}
              ></cropper-viewer>
            </div>

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
                disabled={isProcessing}
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
        </div>
      )}
    </main>
  );
}
