import React, { PropsWithChildren } from "react";
import { StyledCardText } from "./card-text.style";
import { HtmlProps } from "../../styles/theme";

const CardText: React.FC<PropsWithChildren<HtmlProps<HTMLDivElement>>> = ({
  children,
  htmlProps,
}) => <StyledCardText {...htmlProps}>{children}</StyledCardText>;

export default CardText;
