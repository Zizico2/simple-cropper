"use client";

import type { CSSProperties, ReactNode } from "react";
import type { CropperGridElement } from "@/types/cropper-elements";
import { useCropperInit } from "./useCropperInit";

interface CropperGridProps {
  ref?: React.Ref<CropperGridElement>;
  rows?: number;
  columns?: number;
  bordered?: boolean;
  covered?: boolean;
  slottable?: boolean;
  themeColor?: string;
  role?: string;
  cover?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function CropperGrid({
  ref,
  rows,
  columns,
  bordered,
  covered,
  slottable,
  themeColor,
  role,
  cover,
  children,
  className,
  style,
}: CropperGridProps) {
  const isReady = useCropperInit();

  if (!isReady) {
    return <>{/* fallback */} </>;
  }

  return (
    <cropper-grid
      ref={ref}
      rows={rows}
      columns={columns}
      bordered={bordered}
      covered={covered}
      slottable={slottable}
      theme-color={themeColor}
      role={role}
      cover={cover}
      class={className}
      style={style}
    >
      {children}
    </cropper-grid>
  );
}
