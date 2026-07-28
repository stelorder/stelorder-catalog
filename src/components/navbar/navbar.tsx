import { PropsWithChildren, useEffect, useRef } from "react";
import { HtmlProps } from "../styles/theme";

function NavbarBase({
  children,
  options,
  htmlProps,
}: PropsWithChildren<{ options?: TooltipProps } & HtmlProps<HTMLFormElement>>) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!tooltipRef.current) return;
    const prev = tooltipRef.current;
    const clickOutside = (e: MouseEvent) => {
      if (e.target === prev) return;
      const dropdown = prev?.querySelector(".tooltip-message") as HTMLElement;
      if (!dropdown) return;
      if (!prev?.contains(e.target as Node)) {
        dropdown.classList.remove("show");
      }
    };
    // Utilizamos eventos nativos en lugar de sintéticos de React, ya que lo registramos directamente sobre document
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, []);

  return (
    <StyledNavbar {...htmlProps}>
      {children}
      {options && (
        <Navbar.Tab>
          <Tooltip
            {...options}
            onHoverDisplay={false}
            ref={tooltipRef}
            htmlProps={{
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!tooltipRef.current) return;

                const dropdown =
                  tooltipRef.current?.querySelector(".tooltip-message");
                dropdown?.classList.toggle("show");
              },
            }}
          >
            <Icon
              variant="threePoint"
              color="#FFF"
              width="20px"
              height="20px"
            />
          </Tooltip>
        </Navbar.Tab>
      )}
    </StyledNavbar>
  );
}

type NavbarComponent = typeof NavbarBase & {
  Tab: typeof NavbarTab;
};

const Navbar = NavbarBase as unknown as NavbarComponent;

// Asignación estática (evita problemas de import cíclico)
import { StyledNavbar } from "./navbar.style";
import NavbarTab from "./navbar-tab/navbar-tab";
import Tooltip, { TooltipProps } from "../tooltip/tooltip";
import { Icon } from "../icon";

Navbar.Tab = NavbarTab;

export default Navbar;
