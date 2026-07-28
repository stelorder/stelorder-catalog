import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../../styles/theme";
import { StyledLabel } from "./navbar-tab.style";

export type NavbarLabelProps = {
  htmlFor?: string;
  className?: string;
};

const NavbarTab: React.FC<
  PropsWithChildren<NavbarLabelProps & HtmlProps<HTMLLabelElement>>
> = ({ children, htmlFor, className, htmlProps }) => {
  return (
    <StyledLabel htmlFor={htmlFor} className={className} {...htmlProps}>
      {children}
    </StyledLabel>
  );
};

export default NavbarTab;
