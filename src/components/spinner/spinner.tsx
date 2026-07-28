import React from "react";
import { useTheme } from "styled-components";
import { StyledSpinner } from "./spinner.style";
import { IntegrationsThemeType } from "../styles/theme";

export interface SpinnerProps {
  size?: number;
  strokeWidth?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, strokeWidth = 2 }) => {
  const theme = useTheme() as IntegrationsThemeType;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <StyledSpinner width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="lightgray"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={theme.colors.orderSecondary.orderSecondary70}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.5}
      />
    </StyledSpinner>
  );
};

export default Spinner;
