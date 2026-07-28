import { PropsWithChildren } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledBadge } from "./badge.style";

export type BadgeType = "info" | "success" | "warning" | "error" | "highlight";

export type BadgeProps = {
  variant?: BadgeType;
};

function Badge({
  variant,
  children,
  htmlProps,
}: BadgeProps & PropsWithChildren<HtmlProps<HTMLDivElement>>) {
  return (
    <StyledBadge $styled={{ variant }} {...htmlProps}>
      {" "}
      {children}{" "}
    </StyledBadge>
  );
}

export default Badge;
