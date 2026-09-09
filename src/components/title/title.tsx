import React from "react";
import { HtmlProps } from "../styles/theme";
import { StyledTitle } from "./title.style";

/**
 * - `default`: 16px/700 (`titleL700`).
 * - `primary`: 16px/500 (`titleL500`).
 * - `xl`: 20px/500 (`titleXl500`), pensada para títulos de modal.
 */
export type TitleVariant = "default" | "primary" | "xl";
export type TextAlign = "left" | "center" | "right";

const Title: React.FC<
  React.PropsWithChildren<
    {
      variant?: TitleVariant;
      textAlign?: TextAlign;
    } & HtmlProps<HTMLHeadingElement>
  >
> = ({ children, variant = "primary", textAlign = "left", htmlProps }) => {
  return (
    <StyledTitle $styled={{ variant, textAlign }} {...htmlProps}>
      {children}
    </StyledTitle>
  );
};

export default Title;
