"use client";

import type { CSSProperties, ReactNode } from "react";
import type { CropperShadeElement } from "@/types/cropper-elements";
import { useCropperInit } from "./useCropperInit";

interface CropperShadeProps {
  ref?: React.Ref<CropperShadeElement>;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  slottable?: boolean;
  themeColor?: string;
  hidden?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function CropperShade({
  ref,
  x,
  y,
  width,
  height,
  slottable,
  themeColor,
  hidden,
  children,
  className,
  style,
}: CropperShadeProps) {
  const isReady = useCropperInit();

  if (!isReady) {
    return <>{/* fallback */} </>;
  }

  return (
    <cropper-shade
      ref={ref}
      x={x}
      y={y}
      width={width}
      height={height}
      slottable={slottable}
      theme-color={themeColor}
      hidden={hidden}
      class={className}
      style={style}
    >
      {children}
    </cropper-shade>
  );
}
