"use client";

import type { CSSProperties, ReactNode } from "react";
import type { CropperHandleElement } from "@/types/cropper-elements";
import { useCropperInit } from "./useCropperInit";

interface CropperHandleProps {
  ref?: React.Ref<CropperHandleElement>;
  action?:
    | "select"
    | "move"
    | "scale"
    | "n-resize"
    | "e-resize"
    | "s-resize"
    | "w-resize"
    | "ne-resize"
    | "nw-resize"
    | "se-resize"
    | "sw-resize"
    | "none";
  plain?: boolean;
  slottable?: boolean;
  themeColor?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function CropperHandle({
  ref,
  action,
  plain,
  slottable,
  themeColor,
  children,
  className,
  style,
}: CropperHandleProps) {
  const isReady = useCropperInit();

  if (!isReady) {
    return <>{/* fallback */} </>;
  }

  return (
    <cropper-handle
      ref={ref}
      action={action}
      plain={plain}
      slottable={slottable}
      theme-color={themeColor}
      class={className}
      style={style}
    >
      {children}
    </cropper-handle>
  );
}
