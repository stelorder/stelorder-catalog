import React, { HTMLAttributes, Suspense } from "react";
import { getLazyIcon } from "./lazy-icon-cache.tsx";
import { IconVariant } from "./icon-constants.ts";

const FallbackIcon = (props: HTMLAttributes<Element>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect width="100%" height="100%" fill="#ccc" />
  </svg>
);

export const LazyIcon = (
  name: string,
  DefaultIcon?: React.FC<HTMLAttributes<SVGElement>>,
): React.FC<HTMLAttributes<SVGElement>> => {
  const Icon = getLazyIcon(name as IconVariant, DefaultIcon);

  const LazyIconRender: React.FC<HTMLAttributes<SVGElement>> = (props) => (
    <Suspense fallback={<FallbackIcon {...props} />}>
      <Icon {...props} />
    </Suspense>
  );

  return LazyIconRender;
};
