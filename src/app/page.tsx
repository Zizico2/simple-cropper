// src/app/page.tsx
'use client'

import { useState, useRef } from 'react'
import Image from 'next/image';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImageUpload from '../components/ImageUpload';
import { getCroppedImg } from '../utils/canvasUtils';
import styles from './page.module.css';

// Helper to center the crop initially
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  // 1. Create a ref to access the image element directly
  const imgRef = useRef<HTMLImageElement>(null)

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    // Start with a centered crop
    setCrop(centerAspectCrop(width, height, 16 / 9))
  }

  const showCroppedImage = async () => {
    // 2. Ensure we have the image, the crop data, and the canvas ref
    if (
      imgRef.current &&
      completedCrop?.width &&
      completedCrop?.height
    ) {
      try {
        const croppedImgUrl = await getCroppedImg(
          imgRef.current, // Pass the HTMLImageElement
          completedCrop,  // Pass the PixelCrop
        )
        setCroppedImage(croppedImgUrl)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleReset = () => {
    setImageSrc(null)
    setCroppedImage(null)
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Accurate Image Cropper</h1>

      {!imageSrc ? (
        <ImageUpload onImageSelected={setImageSrc} />
      ) : (
        <div>
          <div className={styles.cropContainer} style={{ height: 'auto' }}>
            {/* 3. Pass the ref to the image inside ReactCrop */}
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={undefined} // Free-form cropping
            >
              {/* biome-ignore lint/performance/noImgElement: The standard img tag is required for the cropper ref to work correctly */}
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Upload"
                onLoad={onImageLoad}
                // Ensure image scales but doesn't overflow
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
              />
            </ReactCrop>
          </div>

          <div className={styles.controls}>
            <div className={styles.buttonGroup}>
              <button
                onClick={handleReset}
                className={`${styles.btn} ${styles.btnReset}`}
                type="button"
              >
                Reset
              </button>
              <button
                onClick={showCroppedImage}
                className={`${styles.btn} ${styles.btnCrop}`}
                type="button"
              >
                Generate Crop
              </button>
            </div>
          </div>
        </div>
      )}

      {croppedImage && (
        <div className={styles.result}>
          <h3>Result</h3>
          <Image
            src={croppedImage}
            alt="Cropped result"
            width={completedCrop?.width}
            height={completedCrop?.height}
            className={styles.resultImg}
            unoptimized // 👈 Mandatory for Blob URLs
            style={{ width: '100%', height: 'auto' }} // 👈 Keeps it responsive
          />
          <a
            href={croppedImage}
            download="cropped-image.jpg"
            className={styles.btnDownload}
          >
            Download Image
          </a>
        </div>
      )}
    </main>
  )
}