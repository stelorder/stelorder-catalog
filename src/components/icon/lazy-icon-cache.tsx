import React, { HTMLAttributes, lazy } from "react";
import { IconVariant } from "./icon-constants.ts";

const svgModules = import.meta.glob("../assets/icons/**/*.svg", {
  query: "?react",
  import: "default",
});

type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;
export const resolvedIcons = new Map<IconVariant, SvgComponent>();
export const pendingIcons = new Map<IconVariant, Promise<SvgComponent>>();

function loadIcon(variant: IconVariant): Promise<SvgComponent> {
  const resolvedIcon = resolvedIcons.get(variant);
  if (resolvedIcon) {
    return Promise.resolve(resolvedIcon);
  }
  let pendingIcon = pendingIcons.get(variant);
  if (!pendingIcon) {
    const path = `../assets/icons/${variant}.svg`;
    const loader = svgModules[path];
    pendingIcon = loader
      ? loader().then((module) => {
          const Component = module as SvgComponent;
          resolvedIcons.set(variant, Component);
          pendingIcons.delete(variant);
          return Component;
        })
      : Promise.reject(new Error(`Icon not found: ${variant}`));
    pendingIcons.set(variant, pendingIcon);
  }
  return pendingIcon;
}

const IconNotFound = (props: HTMLAttributes<Element>) => (
  <span {...props} style={{ fontFamily: "Roboto" }}>
    Not found
  </span>
);

const lazyIconCache = new Map<
  IconVariant,
  React.LazyExoticComponent<SvgComponent>
>();

export function getLazyIcon(
  variant: IconVariant,
  defaultIcon?: React.FC<HTMLAttributes<SVGElement>>,
): SvgComponent | React.LazyExoticComponent<SvgComponent> {
  const isTest =
    typeof process !== "undefined" &&
    (process.env.NODE_ENV === "test" || Boolean(process.env.JEST_WORKER_ID));

  if (isTest) {
    // In test environments avoid dynamic imports and React.lazy; return a lightweight
    // synchronous SVG component so stories/tests render quickly without suspending.
    let testComp = resolvedIcons.get(variant);
    if (!testComp) {
      const TestIcon: SvgComponent = (props) => (
        <svg {...props} data-testid={`icon-${variant}`} viewBox="0 0 24 24" />
      );
      resolvedIcons.set(variant, TestIcon);
      testComp = TestIcon;
    }
    return testComp;
  }

  let lazyIcon = lazyIconCache.get(variant);
  if (!lazyIcon) {
    lazyIcon = lazy(async () => ({
      default: await (async () => {
        try {
          return await loadIcon(variant);
        } catch {
          return defaultIcon || IconNotFound;
        }
      })(),
    }));
    lazyIconCache.set(variant, lazyIcon);
  }
  return lazyIcon;
}

export function preloadIcon(variant: IconVariant) {
  return loadIcon(variant);
}

export function preloadIcons(variants: IconVariant[]) {
  return Promise.all(variants.map(loadIcon));
}
