"use client";

import type { CSSProperties, ReactNode } from "react";
import type { CropperViewerElement } from "@/types/cropper-elements";
import { useCropperInit } from "./useCropperInit";

interface CropperViewerProps {
  ref?: React.Ref<CropperViewerElement>;
  resize?: "both" | "horizontal" | "vertical" | "none";
  selection?: string;
  slottable?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function CropperViewer({
  ref,
  resize,
  selection,
  slottable,
  children,
  className,
  style,
}: CropperViewerProps) {
  const isReady = useCropperInit();

  if (!isReady) {
    return <>{/* fallback */} </>;
  }

  return (
    <cropper-viewer
      ref={ref}
      resize={resize}
      selection={selection}
      slottable={slottable}
      class={className}
      style={style}
    >
      {children}
    </cropper-viewer>
  );
}
