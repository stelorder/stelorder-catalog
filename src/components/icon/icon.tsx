/// <reference types="vite/client" />
import React, { PropsWithChildren, Suspense, useMemo } from "react";
import { StyledIcon } from "./icon.style";
import { HtmlProps } from "../styles/theme";
import * as Utils from "./icon-utils";

import { IconVariant, StrokeLinecap, StrokeLinejoin } from "./icon-constants";
import { getLazyIcon, resolvedIcons } from "./lazy-icon-cache.tsx";
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
  const iconMemo = useMemo(() => getLazyIcon(variant), [variant]);
  const resolved = resolvedIcons.get(variant);

  const styledProps = {
    $styled: {
      color,
      width,
      height,
      stroke,
      strokeWidth,
      strokeLinecap,
      strokeLinejoin,
    },
    ...htmlProps,
  };

  if (resolved) {
    return <StyledIcon as={resolved} {...styledProps} />;
  }
  const toPx = (v?: SizePx) => v;

  const fallbackStyle: React.CSSProperties = {};
  if (width !== undefined) fallbackStyle.width = toPx(width);
  if (height !== undefined) fallbackStyle.height = toPx(height);

  return (
    <Suspense fallback={<div style={fallbackStyle} />}>
      <StyledIcon as={iconMemo} {...styledProps} />
    </Suspense>
  );
};

export type IconComponentType = typeof Icon & {
  Utils: typeof Utils;
};

const IconComponent = Icon as IconComponentType;
IconComponent.Utils = Utils;

export default IconComponent;
