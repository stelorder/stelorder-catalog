import styled, { css } from "styled-components";
import { IntegrationsThemeType, StyledProp } from "../../../styles/theme";
import { FormCheckCardVariant } from "../form-checkCard.style";

type ControlStyledProps = StyledProp<{
  variant: FormCheckCardVariant;
}>;

export const StyledFormCheckCardControl = styled.input<ControlStyledProps>`
  ${({ $styled, theme }) => controlStyle({ theme, variant: $styled.variant })}
`;

const controlStyle = ({
  theme,
  variant,
}: {
  theme: IntegrationsThemeType;
  variant: FormCheckCardVariant;
}) => css`
  appearance: none;
  box-sizing: border-box;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;

  ${variant === "radio" && radioControlStyle(theme)}
  ${variant === "boolean" && booleanControlStyle(theme)}
  ${variant === "compact" && compactControlStyle}
`;

const radioControlStyle = (theme: IntegrationsThemeType) => css`
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background-color: ${theme.colors.bn.bn5};
  border: 1px solid ${theme.colors.bn.bn20};

  &:checked {
    background-color: ${theme.colors.orderSecondary.orderSecondary0};
    border: 6px solid ${theme.colors.orderPrimary.orderPrimary90};
  }

  &:disabled:checked {
    border-color: ${theme.colors.orderPrimary.orderPrimary60};
  }
`;

/** Sin indicador visible: la tarjeta marca la selección solo con el fondo. */
const compactControlStyle = css`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
`;

const booleanControlStyle = (theme: IntegrationsThemeType) => css`
  position: relative;
  width: 46px;
  height: 20px;
  border-radius: 100px;
  background-color: ${theme.colors.bn.bn20};
  transition: background-color 0.2s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${theme.colors.orderSecondary.orderSecondary0};
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
    transition: left 0.2s ease-in-out;
  }

  &:checked {
    background-color: ${theme.colors.orderPrimary.orderPrimary90};
  }

  &:checked::before {
    left: calc(100% - 14px - 3px);
  }

  &:disabled:checked {
    background-color: ${theme.colors.orderPrimary.orderPrimary60};
  }
`;
