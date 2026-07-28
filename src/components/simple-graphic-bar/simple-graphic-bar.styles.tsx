import React, {
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Root as ScrollArea,
  Viewport as ScrollAreaViewport,
  Scrollbar as ScrollAreaScrollbar,
  Thumb as ScrollAreaThumb,
} from "@radix-ui/react-scroll-area";
import { useTheme } from "styled-components";
import { StyledProp } from "../styles/theme";
import { SimpleBarChartProps } from "./simple-graphic-bar";

type StyledSimpleBarChartProps<
  XK extends string,
  YK extends string,
> = StyledProp<SimpleBarChartProps<XK, YK>>;

export const StyledSimpleBarChart = <XK extends string, YK extends string>({
  $styled,
  ...htmlProps
}: StyledSimpleBarChartProps<XK, YK> & HTMLAttributes<SVGElement>) => {
  const theme = useTheme();

  const sizeProps = useMemo(() => {
    const w = $styled.width;
    const h = $styled.height;
    const result: {
      width?: number;
      height?: number;
      style: React.CSSProperties;
    } = { style: { ...htmlProps.style } };

    if (typeof w === "number") result.width = w;
    if (typeof h === "number") result.height = h;

    return result;
  }, [$styled.width, $styled.height, htmlProps.style]);

  // Valores resueltos para el primer contenedor:
  // - width: el del parámetro o 100% por defecto
  // - height: el del parámetro o no se establece (por defecto del contenedor)
  const resolvedContainerWidth = useMemo(() => {
    const w = $styled.width;
    if (typeof w === "number") return w; // px
    if (typeof w === "string") return w; // e.g. '100%', '400px'
    return "100%";
  }, [$styled.width]);

  const resolvedContainerHeight = useMemo(() => {
    const h = $styled.height;
    if (typeof h === "number") return h; // px
    if (typeof h === "string") return h; // e.g. '100%', '400px'
    return undefined; // sin altura => usa la del contenido (default actual)
  }, [$styled.height]);

  // Cálculo de anchos
  const totalBars = $styled.data.length; // total de barras
  const barWidth = 34; // ancho por barra

  const chartWidth = totalBars * barWidth; // ancho real del gráfico
  const hostRef = useRef<HTMLDivElement>(null);
  const [, setHostWidthPx] = useState<number>();
  const [hostHeightPx, setHostHeightPx] = useState<number>(); // NEW

  useEffect(() => {
    if (!hostRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) {
        setHostWidthPx(cr.width);
        setHostHeightPx(cr.height); // NEW
      }
    });
    ro.observe(hostRef.current);
    return () => ro.disconnect();
  }, []);

  const barChartHeight = useMemo(() => {
    // Use numeric prop height if provided; otherwise mirror the parent measured height.
    if (typeof $styled.height === "number") return $styled.height;
    if (typeof resolvedContainerHeight === "number")
      return resolvedContainerHeight;
    return hostHeightPx;
  }, [$styled.height, resolvedContainerHeight, hostHeightPx]);

  // Grosor de la barra horizontal
  const scrollbarSize = 8; // NEW

  return (
    <ScrollArea
      ref={hostRef}
      style={{
        width: resolvedContainerWidth, // asegura 100% por defecto
        height: resolvedContainerHeight,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ScrollAreaViewport
        tabIndex={0}
        style={{
          width: "100%",
          height: "100%",
          overflowX: "auto",
          overflowY: "auto",
          // evita que las barras se superpongan al contenido
          paddingBottom: `${scrollbarSize}px`,
          paddingRight: `${scrollbarSize}px`,
        }}
      >
        <div
          style={{
            width: chartWidth,
            display: "block",
            minWidth: "max-content",
          }}
        >
          <BarChart
            {...sizeProps}
            width={chartWidth}
            height={barChartHeight}
            xAxis={[
              {
                dataKey: $styled.xKey,
                scaleType: "band",
                categoryGapRatio: 0.255,
                tickLabelStyle: {
                  fill: theme.colors.orderSecondary.orderSecondary60,
                  textAlign: "center",
                  fontFamily: theme.fonts.h2500.fontFamily,
                  fontSize: theme.fonts.h2500.fontSize,
                  fontStyle: theme.fonts.h2500.fontStyle,
                  fontWeight: theme.fonts.h2500.fontWeight,
                  lineHeight: theme.fonts.h2500.lineHeight,
                },
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: { display: "none" },
                width: 0,
              },
            ]}
            series={[
              {
                dataKey: $styled.yKey,
                color: $styled.color,
              },
            ]}
            dataset={$styled.data}
            margin={{ top: 8, bottom: 8, left: 0 }}
            borderRadius={4}
            sx={{
              "& .MuiChartsLegend-root": { display: "none" },
              "& .MuiChartsTooltip-root": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              "& .MuiChartsAxis-directionY": { display: "none" },
              "& .MuiChartsAxis-directionX line": { stroke: "unset" },
            }}
          />
        </div>
      </ScrollAreaViewport>

      {/* horizontal scrollbar: ocupa el ancho del viewport, no del contenido */}
      <ScrollAreaScrollbar
        orientation="horizontal"
        style={{
          position: "absolute",
          left: 0,
          // deja espacio para la barra vertical
          right: `${scrollbarSize}px`,
          bottom: 0,
          height: `${scrollbarSize}px`,
          backgroundColor: "#e5e7eb",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ScrollAreaThumb
          style={{
            backgroundColor: "#6b7280",
            borderRadius: 4,
            height: "100%",
          }}
        />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
};
