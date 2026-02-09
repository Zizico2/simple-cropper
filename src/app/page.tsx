'use client';
import { useState } from 'react';
import Cropper, { type Area, type Point } from 'react-easy-crop';
import ImageUpload from '../components/ImageUpload';
import { getCroppedImg } from '../utils/canvasUtils';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setZoom(1);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Next.js Image Cropper</h1>

      {!imageSrc ? (
        <ImageUpload onImageSelected={setImageSrc} />
      ) : (
        <div>
          <div className={styles.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>

          <div className={styles.controls}>
            <div className={styles.sliderContainer}>
              <label htmlFor="zoom" className={styles.sliderLabel}>Zoom</label>
              <input
                id="zoom"
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className={styles.slider}
              />
            </div>

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
          <h3 style={{ marginBottom: '10px' }}>Result</h3>
          <Image
            src={croppedImage}
            alt="Cropped"
            width={croppedAreaPixels?.width}
            height={croppedAreaPixels?.height}
            className={styles.resultImg}
            unoptimized
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
  );
}