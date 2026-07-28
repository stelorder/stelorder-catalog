import styled from "styled-components";
import { IntegrationsThemeType, StyledProp } from "../styles/theme";
import { STELPlanVariant } from "./STELPlan";

const colorBack = ({
  theme,
  variant,
}: {
  theme: IntegrationsThemeType;
  variant: STELPlanVariant;
}): string => {
  switch (variant) {
    case "free":
      return theme.colors.blue.blue20;

    case "lite":
      return theme.colors.basicManagement.bg100;
    case "business":
      return theme.colors.orderPrimary.orderPrimary90;
    default:
      return theme.colors.bn.bn100;
  }
};

export const StyledSTELPlan = styled.div<
  StyledProp<{ variant: STELPlanVariant }>
>`
  display: flex;
  width: 30.6px;
  height: 30.6px;
  padding: 3.715px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  border-radius: 5.047px;
  background-color: ${({ theme, $styled }) =>
    colorBack({ theme, variant: $styled.variant })};
`;
