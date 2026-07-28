import React from "react";

import { HtmlProps } from "../styles/theme";

import { StyledSidebar } from "./sidebar.style";
import { SidebarItem } from "./sidebar-item/sidebar-item";

export type SidebarProps = HtmlProps<HTMLDivElement> & {
  children: React.ReactNode;

  width?: string;

  height?: string;
};

const SidebarBase = ({ htmlProps, children, width, height }: SidebarProps) => (
  <StyledSidebar {...htmlProps} $width={width} $height={height}>
    {children}
  </StyledSidebar>
);

type SidebarComponent = typeof SidebarBase & {
  Item: typeof SidebarItem;
};
const Sidebar = SidebarBase as unknown as SidebarComponent;

Sidebar.Item = SidebarItem;

export default Sidebar;
