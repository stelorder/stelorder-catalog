import type { ComponentPropsWithoutRef, ReactNode } from "react";
import React from "react";

export interface ListItemProps extends ComponentPropsWithoutRef<"div"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
  hasDivider?: boolean;
  selected?: boolean;
  clickable?: boolean;
  expandable?: boolean;
  defaultExpanded?: boolean;
  children?: ReactNode;
}
