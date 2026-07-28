import React from "react";
import { HtmlProps } from "../styles/theme";
import { StyledTitle } from "./title.style";

export type TitleVariant = "default" | "primary";
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
