import React from "react";
import { HtmlProps, IntegrationsThemeType } from "../styles/theme";
import type { CSSObject } from "styled-components";
import { useTheme } from "styled-components";
import { StyledIconWrapper } from "./icon-wrapper.style";

export type IconWrapperStyles = {
  default?: CSSObject;
  hover?: CSSObject | false;
  focus?: CSSObject | false;
};

const IconWrapper: React.FC<
  React.PropsWithChildren<
    {
      color?: string;
      height?: string;
      width?: string;
      radius?: string;
      border?: string;
      styles?: IconWrapperStyles;

      ariaLabel?: string;
    } & HtmlProps<HTMLDivElement>
  >
> = ({
  color,
  height,
  width,
  radius = "50px",
  border,
  styles,
  ariaLabel,
  children,
  htmlProps,
}) => {
  const theme = useTheme() as IntegrationsThemeType;
  return (
    <StyledIconWrapper
      $styled={{
        color,
        height,
        width,
        radius,
        border,
        styles,
        theme,
      }}
      role="img"
      aria-label={ariaLabel ? ariaLabel : "icon-wrapper"}
      {...htmlProps}
    >
      {children}
    </StyledIconWrapper>
  );
};

export default IconWrapper;
