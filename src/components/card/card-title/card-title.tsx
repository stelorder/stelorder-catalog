import { HtmlProps } from "../../styles/theme";
import { StyledCardTitle } from "./card-title.style";
import React, { PropsWithChildren } from "react";

const CardTitle: React.FC<PropsWithChildren<HtmlProps<HTMLDivElement>>> = ({
  children,
  htmlProps,
}) => <StyledCardTitle {...htmlProps}>{children}</StyledCardTitle>;

export default CardTitle;
