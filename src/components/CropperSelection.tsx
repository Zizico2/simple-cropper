"use client";

import type { CSSProperties, ReactNode } from "react";
import type { CropperSelectionElement } from "@/types/cropper-elements";

interface CropperSelectionProps {
  ref?: React.Ref<CropperSelectionElement>;
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  aspectRatio?: number;
  initialAspectRatio?: number;
  initialCoverage?: number | string;
  dynamic?: boolean;
  movable?: boolean;
  resizable?: boolean;
  zoomable?: boolean;
  multiple?: boolean;
  keyboard?: boolean;
  outlined?: boolean;
  precise?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onChange?: (event: CustomEvent) => void;
}

export default function CropperSelection({
  ref,
  id,
  x,
  y,
  width,
  height,
  aspectRatio,
  initialAspectRatio,
  initialCoverage,
  dynamic,
  movable,
  resizable,
  zoomable,
  multiple,
  keyboard,
  outlined,
  precise,
  children,
  className,
  style,
  onChange,
}: CropperSelectionProps) {
  return (
    <cropper-selection
      ref={ref}
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      aspect-ratio={aspectRatio}
      initial-aspect-ratio={initialAspectRatio}
      initial-coverage={initialCoverage}
      dynamic={dynamic}
      movable={movable}
      resizable={resizable}
      zoomable={zoomable}
      multiple={multiple}
      keyboard={keyboard}
      outlined={outlined}
      precise={precise}
      class={className}
      style={style}
      onChange={onChange}
    >
      {children}
    </cropper-selection>
  );
}
