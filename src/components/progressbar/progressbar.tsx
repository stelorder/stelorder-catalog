import React from "react";
import { HtmlProps } from "../styles/theme";
import { StyledProgressBar } from "./progressbar.styles";

export type ProgressBarProps = {
  now: number;
  color?: string;
  trackColor?: string;
  borderColor?: string;
  width?: string | number;
  height?: string | number;
  label?: boolean;
  ariaLabel?: string;
};

const ProgressBar: React.FC<ProgressBarProps & HtmlProps<HTMLDivElement>> = ({
  now,
  color,
  trackColor,
  borderColor,
  width,
  height,
  label,
  ariaLabel,
  htmlProps,
}) => {
  return (
    <StyledProgressBar
      $styled={{
        now,
        color,
        trackColor,
        borderColor,
        width,
        height,
        label,
        ariaLabel,
      }}
      {...htmlProps}
    />
  );
};

export default ProgressBar;
