"use client";

import { useDropzone } from "react-dropzone";
import styles from "./ImageUpload.module.css";

interface ImageUploadProps {
  onImageSelected: (url: string, file: File) => void;
}

export default function ImageUpload({ onImageSelected }: ImageUploadProps) {
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const objectUrl = URL.createObjectURL(file);
      onImageSelected(objectUrl, file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`${styles.dropzone} ${isDragActive ? styles.active : ""}`}
    >
      <input {...getInputProps()} />
      <p className={`${styles.text} ${isDragActive ? styles.hidden : ""}`}>
        Drag & drop an image here, or click to select
      </p>
      <p className={`${styles.subtext} ${isDragActive ? styles.hidden : ""}`}>
        Supports JPG, PNG, WEBP, BMP
      </p>
      <p
        className={`${styles.text} ${styles.dragMessage} ${isDragActive ? "" : styles.hidden}`}
      >
        Drop the image here ...
      </p>
    </div>
  );
}
