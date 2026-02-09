"use client";

import type { CSSProperties, ReactNode } from "react";
import type { CropperCanvasElement } from "@/types/cropper-elements";
import { useCropperInit } from "./useCropperInit";

interface CropperCanvasProps {
  ref?: React.Ref<CropperCanvasElement>;
  background?: boolean;
  disabled?: boolean;
  scaleStep?: number;
  themeColor?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onAction?: (event: CustomEvent) => void;
  onActionstart?: (event: CustomEvent) => void;
  onActionmove?: (event: CustomEvent) => void;
  onActionend?: (event: CustomEvent) => void;
}

export default function CropperCanvas({
  ref,
  background,
  disabled,
  scaleStep,
  themeColor,
  children,
  className,
  style,
  onAction,
  onActionstart,
  onActionmove,
  onActionend,
}: CropperCanvasProps) {
  const isReady = useCropperInit();

  if (!isReady) {
    return <>{/* fallback */} </>;
  }

  return (
    <cropper-canvas
      ref={ref}
      background={background}
      disabled={disabled}
      scale-step={scaleStep}
      theme-color={themeColor}
      class={className}
      style={style}
      onAction={onAction}
      onActionstart={onActionstart}
      onActionmove={onActionmove}
      onActionend={onActionend}
    >
      {children}
    </cropper-canvas>
  );
}
