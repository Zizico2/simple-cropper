"use client";

import type { CSSProperties, ReactNode } from "react";
import type { CropperImageElement } from "@/types/cropper-elements";

interface CropperImageProps {
  ref?: React.Ref<CropperImageElement>;
  src?: string;
  alt?: string;
  crossOrigin?: string;
  decoding?: string;
  fetchPriority?: string;
  loading?: string;
  referrerPolicy?: string;
  sizes?: string;
  srcSet?: string;
  initialCenterSize?: "contain" | "cover";
  rotatable?: boolean;
  scalable?: boolean;
  skewable?: boolean;
  slottable?: boolean;
  translatable?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onTransform?: (event: CustomEvent) => void;
}

export default function CropperImage({
  ref,
  src,
  alt,
  crossOrigin,
  decoding,
  fetchPriority,
  loading,
  referrerPolicy,
  sizes,
  srcSet,
  initialCenterSize,
  rotatable,
  scalable,
  skewable,
  slottable,
  translatable,
  children,
  className,
  style,
  onTransform,
}: CropperImageProps) {
  return (
    <cropper-image
      ref={ref}
      src={src}
      alt={alt}
      crossorigin={crossOrigin}
      decoding={decoding}
      fetchpriority={fetchPriority}
      loading={loading}
      referrerpolicy={referrerPolicy}
      sizes={sizes}
      srcset={srcSet}
      initial-center-size={initialCenterSize}
      rotatable={rotatable}
      scalable={scalable}
      skewable={skewable}
      slottable={slottable}
      translatable={translatable}
      class={className}
      style={style}
      onTransform={onTransform as any}
    >
      {children}
    </cropper-image>
  );
}
