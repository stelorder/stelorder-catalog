import React, { PropsWithChildren, useLayoutEffect } from "react";
import { StyledSimpleGridItem } from "./simple-grid-item.style";
import { useSimpleGridContext } from "../context/simple-grid-context";
import { useTheme } from "styled-components";
import { breakpointsType, HtmlProps } from "../../styles/theme";

export type ItemAlign = "start" | "center" | "end" | "stretch";

type Dir = "t" | "b" | "s" | "e";

export type Spacing = {
  [key in Dir]?: number | "auto";
};

type Spacings = {
  m?: Spacing;
  p?: Spacing;
};

export type SimpleGridItemBasicProps = {
  col?: number | "auto"; // cuántas columnas ocupa
  align?: ItemAlign;
} & Spacings;

export type SimpleGridItemResponsiveProps = {
  [key in breakpointsType]?: SimpleGridItemBasicProps;
};

export type SimpleGridItemProps = SimpleGridItemBasicProps &
  SimpleGridItemResponsiveProps;

const SimpleGridItem: React.FC<
  PropsWithChildren<SimpleGridItemProps> & HtmlProps<HTMLDivElement>
> = ({ col, children, htmlProps, ...props }) => {
  const simpleGridContext = useSimpleGridContext();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  // asegúrate de tener un id para poder escribir la variable CSS --{id}-height
  const generatedId = React.useMemo(
    () => `simple-grid-item-${Math.random().toString(36).slice(2)}`,
    [],
  );

  // usa el id de props si existe, si no el generado
  const id = htmlProps?.id ?? generatedId;

  // Medimos en useLayoutEffect (se ejecuta antes del paint) y actualizamos la variable CSS.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setHeight = () => {
      el.style.setProperty(`--${id}-height`, `${el.clientHeight}px`);
    };

    setHeight();

    // actualizar al redimensionar
    const ro = new ResizeObserver(() => setHeight());
    ro.observe(el);

    return () => ro.disconnect();
  }, [id]);

  return (
    <StyledSimpleGridItem
      ref={ref}
      $styled={{
        total:
          simpleGridContext?.itemsPerLine || theme.defaults.grid.itemsPerLine,
        gap: simpleGridContext?.gap ?? theme.defaults.grid.gap,
        col: col ?? theme.defaults.grid.col,
        ref: ref,
        ...props,
      }}
      {...htmlProps}
      id={id}
    >
      {children}
    </StyledSimpleGridItem>
  );
};

export default SimpleGridItem;
