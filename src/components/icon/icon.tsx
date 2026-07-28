/// <reference types="vite/client" />
import React, { lazy, PropsWithChildren, Suspense, useMemo } from "react";
import { StyledIcon } from "./icon.style";
import { HtmlProps } from "../styles/theme";
import * as Utils from "./icon-utils";

import { IconVariant, StrokeLinecap, StrokeLinejoin } from "./icon-constants";
export type SizePx = string; // reuse the central type via import (kept for clarity in this snippet)

export type IconProps = {
  variant: IconVariant;
  color?: string;
  width?: SizePx;
  height?: SizePx;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: StrokeLinecap;
  strokeLinejoin?: StrokeLinejoin;
};

const svgModules = import.meta.glob("../assets/icons/**/*.svg", {
  query: "?react",
  import: "default",
});

const LazyIcon = ({ variant }: { variant: IconVariant }) => {
  return lazy(async () => {
    const path = `../assets/icons/${variant}.svg`;
    const loader = svgModules[path];
    if (!loader) throw new Error(`Icon not found: ${variant}`);
    const Component = (await loader()) as React.FC<
      React.SVGProps<SVGSVGElement>
    >;
    return { default: Component };
  });
};

const Icon: React.FC<
  IconProps & PropsWithChildren<HtmlProps<SVGSVGElement>>
> = ({
  variant,
  color,
  width,
  height,
  stroke,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
  htmlProps,
}) => {
  const iconMemo = useMemo(() => LazyIcon({ variant }), [variant]);

  const toPx = (v?: SizePx) => v;

  const fallbackStyle: React.CSSProperties = {};
  if (width !== undefined) fallbackStyle.width = toPx(width);
  if (height !== undefined) fallbackStyle.height = toPx(height);

  return (
    <Suspense fallback={<div style={fallbackStyle} />}>
      <StyledIcon
        as={iconMemo}
        $styled={{
          color,
          width,
          height,
          stroke,
          strokeWidth,
          strokeLinecap,
          strokeLinejoin,
        }}
        {...htmlProps}
      />
    </Suspense>
  );
};

export type IconComponentType = typeof Icon & {
  Utils: typeof Utils;
};

const IconComponent = Icon as IconComponentType;
IconComponent.Utils = Utils;

export default IconComponent;
