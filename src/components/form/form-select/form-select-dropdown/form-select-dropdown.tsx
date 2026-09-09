import React from "react";
import { StyledDropdown } from "./form-select-dropdown.style";

type FormSelectDropdownProps = {
  isOpen: boolean;
  boxPosition?: "top" | "bottom";
  maxWidth?: string;
  children: React.ReactNode;
  htmlProps?: React.HTMLProps<HTMLDivElement>;
};

export const FormSelectDropdown: React.FC<FormSelectDropdownProps> = ({
  isOpen,
  boxPosition = "bottom",
  maxWidth,
  children,
  htmlProps,
}) => (
  <StyledDropdown
    $styled={{ isOpen, boxPosition, maxWidth }}
    onClick={(e) => e.stopPropagation()}
    {...htmlProps}
  >
    {isOpen && children}
  </StyledDropdown>
);
