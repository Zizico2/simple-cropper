"use client";

import { useDropzone } from "react-dropzone";

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
      className={`border-2 border-dashed rounded-lg p-10 relative text-center cursor-pointer transition-[border-color,background-color] duration-200 ${
        isDragActive
          ? "border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]"
          : "border-[var(--border-faint)] bg-[var(--surface-tint)] text-[var(--foreground-subtle)] hover:border-[var(--border-hover)]"
      }`}
    >
      <input {...getInputProps()} />
      <p className={`text-base mb-2 ${isDragActive ? "invisible" : ""}`}>
        Drag & drop an image here, or click to select
      </p>
      <p
        className={`text-[0.85rem] opacity-70 ${isDragActive ? "invisible" : ""}`}
      >
        Supports JPG, PNG, WEBP, BMP
      </p>
      <p
        className={`text-base absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDragActive ? "" : "invisible"}`}
      >
        Drop the image here ...
      </p>
    </div>
  );
}
