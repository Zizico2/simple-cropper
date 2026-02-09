export interface CropperCanvasElement extends HTMLElement {
  background: boolean;
  disabled: boolean;
  scaleStep: number;
  themeColor: string;
  $setAction(action: string): CropperCanvasElement;
  $toCanvas(options?: {
    width?: number;
    height?: number;
    beforeDraw?: (
      context: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
    ) => void;
  }): Promise<HTMLCanvasElement>;
}

export interface CropperImageElement extends HTMLElement {
  src: string;
  alt: string;
  initialCenterSize: "contain" | "cover";
  rotatable: boolean;
  scalable: boolean;
  skewable: boolean;
  slottable: boolean;
  translatable: boolean;
  $ready(
    callback?: (image: HTMLImageElement) => void,
  ): Promise<HTMLImageElement>;
  $center(size?: "contain" | "cover"): CropperImageElement;
  $move(x: number, y?: number): CropperImageElement;
  $moveTo(x: number, y?: number): CropperImageElement;
  $rotate(angle: number | string, x?: number, y?: number): CropperImageElement;
  $zoom(scale: number, x?: number, y?: number): CropperImageElement;
  $scale(x: number, y?: number): CropperImageElement;
  getBoundingClientRect(): DOMRect;
}

export interface CropperSelectionElement extends HTMLElement {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio: number;
  initialAspectRatio: number;
  initialCoverage: number;
  dynamic: boolean;
  movable: boolean;
  resizable: boolean;
  zoomable: boolean;
  multiple: boolean;
  keyboard: boolean;
  outlined: boolean;
  precise: boolean;
  $center(): CropperSelectionElement;
  $move(x: number, y?: number): CropperSelectionElement;
  $moveTo(x: number, y?: number): CropperSelectionElement;
  $resize(width: number, height?: number): CropperSelectionElement;
  $resizeTo(width: number, height?: number): CropperSelectionElement;
  $zoom(scale: number, x?: number, y?: number): CropperSelectionElement;
  $toCanvas(options?: {
    width?: number;
    height?: number;
    beforeDraw?: (
      context: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
    ) => void;
  }): Promise<HTMLCanvasElement>;
  getBoundingClientRect(): DOMRect;
}

export interface CropperShadeElement extends HTMLElement {
  x: number;
  y: number;
  width: number;
  height: number;
  slottable: boolean;
  themeColor: string;
  $change(
    x: number,
    y: number,
    width?: number,
    height?: number,
  ): CropperShadeElement;
  $reset(): CropperShadeElement;
  $render(): CropperShadeElement;
}

export interface CropperHandleElement extends HTMLElement {
  action:
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
  plain: boolean;
  slottable: boolean;
  themeColor: string;
}

export interface CropperGridElement extends HTMLElement {
  rows: number;
  columns: number;
  bordered: boolean;
  covered: boolean;
  slottable: boolean;
  themeColor: string;
}

export interface CropperCrosshairElement extends HTMLElement {
  centered: boolean;
  slottable: boolean;
  themeColor: string;
}

export interface CropperViewerElement extends HTMLElement {
  resize: "both" | "horizontal" | "vertical" | "none";
  selection: string;
  slottable: boolean;
}
