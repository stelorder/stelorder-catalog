import React from "react";
import { HtmlProps, IntegrationsThemeType } from "../styles/theme";
import { StyledSTELPlan } from "./STELPlan.style";
import { Icon } from "../icon";
import { useTheme } from "styled-components";

export type STELPlanVariant = "free" | "lite" | "business" | "pro";

const STELPlan: React.FC<
  React.PropsWithChildren<
    {
      variant?: STELPlanVariant;
    } & HtmlProps<HTMLHeadingElement>
  >
> = ({ variant = "free", htmlProps }) => {
  const theme = useTheme() as IntegrationsThemeType;
  const iconColorByVariant = (v: STELPlanVariant): string => {
    switch (v) {
      case "free":
        return theme.colors.blue.blue70;
      case "lite":
        return theme.colors.orderSecondary.orderSecondary90;
      case "business":
        // Naranja por defecto
        return theme.colors.orderSecondary.orderSecondary0;
      case "pro":
      default:
        return theme.colors.orderSecondary.orderSecondary0;
    }
  };

  return (
    <StyledSTELPlan
      $styled={{ variant }}
      role="img"
      aria-label={`STEL plan ${variant}`}
      {...htmlProps}
    >
      <Icon
        variant="stel"
        width="24.974px"
        height="24.536px"
        aria-hidden="true"
        color={iconColorByVariant(variant)}
      />
    </StyledSTELPlan>
  );
};

export default STELPlan;
