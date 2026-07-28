import { HtmlProps } from "../../styles/theme";
import React, { PropsWithChildren } from "react";
import { StyledSelectCardTitle } from "./selectCard-title.style";

const SelectCardTitle: React.FC<
  PropsWithChildren<HtmlProps<HTMLDivElement>>
> = ({ children, htmlProps }) => (
  <StyledSelectCardTitle {...htmlProps}>{children}</StyledSelectCardTitle>
);

export default SelectCardTitle;
