import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "cropper-canvas": DetailedHTMLProps<
        Omit<HTMLAttributes<HTMLElement>, "className"> & {
          class?: string;
          background?: boolean;
          disabled?: boolean;
          "scale-step"?: number;
          "theme-color"?: string;
          onAction?: (event: CustomEvent) => void;
          onActionstart?: (event: CustomEvent) => void;
          onActionmove?: (event: CustomEvent) => void;
          onActionend?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;

      "cropper-image": DetailedHTMLProps<
        Omit<HTMLAttributes<HTMLElement>, "className"> & {
          class?: string;
          src?: string;
          alt?: string;
          crossorigin?: string;
          decoding?: string;
          fetchpriority?: string;
          loading?: string;
          referrerpolicy?: string;
          sizes?: string;
          srcset?: string;
          "initial-center-size"?: "contain" | "cover";
          rotatable?: boolean;
          scalable?: boolean;
          skewable?: boolean;
          slottable?: boolean;
          translatable?: boolean;
          onTransform?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;

      "cropper-selection": DetailedHTMLProps<
        Omit<HTMLAttributes<HTMLElement>, "className" | "onChange"> & {
          class?: string;
          id?: string;
          x?: number;
          y?: number;
          width?: number;
          height?: number;
          "aspect-ratio"?: number;
          "initial-aspect-ratio"?: number;
          "initial-coverage"?: number | string;
          dynamic?: boolean;
          movable?: boolean;
          resizable?: boolean;
          zoomable?: boolean;
          multiple?: boolean;
          keyboard?: boolean;
          outlined?: boolean;
          precise?: boolean;
          onChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;

      "cropper-shade": DetailedHTMLProps<
        Omit<HTMLAttributes<HTMLElement>, "className"> & {
          class?: string;
          x?: number;
          y?: number;
          width?: number;
          height?: number;
          slottable?: boolean;
          "theme-color"?: string;
          hidden?: boolean;
        },
        HTMLElement
      >;

      "cropper-handle": DetailedHTMLProps<
        Omit<HTMLAttributes<HTMLElement>, "className"> & {
          class?: string;
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
          "theme-color"?: string;
        },
        HTMLElement
      >;

      "cropper-grid": DetailedHTMLProps<
        Omit<HTMLAttributes<HTMLElement>, "className"> & {
          class?: string;
          rows?: number;
          columns?: number;
          bordered?: boolean;
          covered?: boolean;
          slottable?: boolean;
          "theme-color"?: string;
          role?: string;
          cover?: boolean;
        },
        HTMLElement
      >;

      "cropper-crosshair": DetailedHTMLProps<
        Omit<HTMLAttributes<HTMLElement>, "className"> & {
          class?: string;
          centered?: boolean;
          slottable?: boolean;
          "theme-color"?: string;
        },
        HTMLElement
      >;

      "cropper-viewer": DetailedHTMLProps<
        Omit<HTMLAttributes<HTMLElement>, "className"> & {
          class?: string;
          resize?: "both" | "horizontal" | "vertical" | "none";
          selection?: string;
          slottable?: boolean;
        },
        HTMLElement
      >;
    }
  }
}
