import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../styles/theme";
import { StyledScrollListItem } from "./scroll-list-item.style";

export const ScrollListItem: React.FC<
  PropsWithChildren<HtmlProps<HTMLDivElement>>
> = ({ children, htmlProps }) => {
  return <StyledScrollListItem {...htmlProps}>{children}</StyledScrollListItem>;
};
