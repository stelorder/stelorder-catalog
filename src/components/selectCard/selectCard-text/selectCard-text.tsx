import { HtmlProps } from "../../styles/theme";
import React, { PropsWithChildren } from "react";
import { StyledSelectCardText } from "./selectCard-text.style";

const SelectCardText: React.FC<
  PropsWithChildren<HtmlProps<HTMLDivElement>>
> = ({ children, htmlProps }) => (
  <StyledSelectCardText {...htmlProps}>{children}</StyledSelectCardText>
);

export default SelectCardText;
