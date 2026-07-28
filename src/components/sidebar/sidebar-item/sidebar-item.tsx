import React from "react";
import { StyledSidebarItem } from "./sidebar-item.style";
import { HtmlProps } from "../../styles/theme";

export type SidebarItemProps = HtmlProps<HTMLDivElement> & {
  children: React.ReactNode;
  expand?: boolean;
};

export const SidebarItem = ({
  htmlProps,
  children,
  expand,
}: SidebarItemProps) => (
  <StyledSidebarItem $expand={expand} {...htmlProps}>
    {children}
  </StyledSidebarItem>
);
