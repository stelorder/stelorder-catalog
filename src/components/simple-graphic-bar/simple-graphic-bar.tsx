import { HtmlProps } from "../styles/theme";
import { StyledSimpleBarChart } from "./simple-graphic-bar.styles";

export type SimpleBarChartProps<XK extends string, YK extends string> = {
  xKey: XK;
  yKey: YK;
  color: `#${string}` | string;
  width: number | string;
  height: number | string;
  data: Array<
    {
      [key in XK]: string;
    } & {
      [key in YK]: number;
    }
  >;
};

const SimpleBarChart = <XK extends string, YK extends string>({
  xKey,
  yKey,
  color,
  width,
  height,
  data,
  htmlProps,
}: SimpleBarChartProps<XK, YK> & HtmlProps<SVGElement>) => {
  return (
    <StyledSimpleBarChart
      $styled={{ xKey, yKey, color, width, height, data }}
      {...htmlProps}
    />
  );
};

export default SimpleBarChart;
