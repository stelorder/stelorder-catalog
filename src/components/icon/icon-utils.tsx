import React, { HTMLAttributes, lazy, Suspense } from "react";

const FallbackIcon = (props: HTMLAttributes<Element>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect width="100%" height="100%" fill="#ccc" />
  </svg>
);

const IconNotFound = (props: HTMLAttributes<Element>) => (
  <span {...props} style={{ fontFamily: "Roboto" }}>
    Not found
  </span>
);

export const LazyIcon = (
  name: string,
  DefaultIcon?: React.FC<HTMLAttributes<SVGElement>>,
): React.FC<HTMLAttributes<SVGElement>> => {
  const Icon = lazy(() =>
    import(`../assets/icons/${name}.svg?react`)
      .then((module) => ({ default: module.default }))
      .catch(() => ({
        default: DefaultIcon || IconNotFound,
      })),
  );

  const LazyIconRender: React.FC<HTMLAttributes<SVGElement>> = (props) => (
    <Suspense fallback={<FallbackIcon {...props} />}>
      <Icon {...props} />
    </Suspense>
  );

  return LazyIconRender;
};
