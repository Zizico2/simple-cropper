"use client";

import type { CSSProperties, ReactNode } from "react";
import type { CropperCrosshairElement } from "@/types/cropper-elements";

interface CropperCrosshairProps {
  ref?: React.Ref<CropperCrosshairElement>;
  centered?: boolean;
  slottable?: boolean;
  themeColor?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function CropperCrosshair({
  ref,
  centered,
  slottable,
  themeColor,
  children,
  className,
  style,
}: CropperCrosshairProps) {
  return (
    <cropper-crosshair
      ref={ref}
      centered={centered}
      slottable={slottable}
      theme-color={themeColor}
      class={className}
      style={style}
    >
      {children}
    </cropper-crosshair>
  );
}
