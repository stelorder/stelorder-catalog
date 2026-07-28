import styled, { css } from "styled-components";
import { StyledProp } from "../../styles/theme";
import { ValidatingState } from "../form-types";
import { createValidatingFormControlCssBlock } from "../form-utils";

export const StyledInput = styled.input`
  flex: 1 0 0;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  font-feature-settings: "liga" off;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
`;

type StyledIconProps = StyledProp<{
  state: "valid" | "invalid" | "default" | undefined;
  visible?: boolean;
  formValidable?: boolean;
}>;

export const StyledIcon = styled.span.attrs<StyledIconProps>((props) => ({
  $styled: {
    ...props?.$styled,
    visible: props.$styled.visible ?? true,
    formValidable: props.$styled.formValidable ?? false,
  },
}))<StyledIconProps>`
  display: ${({ $styled }) => ($styled.visible ? "flex" : "none")};
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  width: 18px;
  height: 18px;
  justify-content: center;
  align-items: center;
  color: ${({ $styled, theme }) =>
    $styled.state === "valid"
      ? theme.colors.alertSuccess.alertSuccess100
      : $styled.state === "invalid"
        ? theme.colors.alertError.alertError100
        : theme.colors.orderSecondary.orderSecondary30}!important;

  ${({ $styled }) =>
    $styled.formValidable &&
    $styled.state === "valid" &&
    css`
      .was-validated .form-control:valid ~ div & {
        display: flex !important;
      }
    `}
  ${({ $styled }) =>
    $styled.formValidable &&
    $styled.state === "invalid" &&
    css`
      .was-validated .form-control:invalid ~ div & {
        display: flex !important;
      }
    `}
`;

export const StyledControlFlex = styled.div<
  StyledProp<{ state?: ValidatingState }>
>`
  display: flex;
  align-items: center;
  padding: var(--4xs-6, 6px) var(--xs-12, 12px);
  gap: var(--4xs-6, 6px);
  flex: 1 0 0;
  background: ${({ theme }) => theme.colors.bn.bn0};
  border-radius: 6px;
  border: 1px solid
    ${({ theme }) => theme.colors.orderSecondary.orderSecondary20};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};

  /* Estados de borde y focus */
  &:hover {
    border-color: ${({ theme }) =>
      theme.colors.orderSecondary.orderSecondary40};
  }

  &:focus-within {
    outline: none;
    border-color: #fd893a;
  }

  ${({ $styled, theme }) =>
    createValidatingFormControlCssBlock({
      state: $styled?.state,
      theme,
    })}
`;

export const StyledControl = styled.input`
  border: none;
  background: transparent;

  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  font-family: ${({ theme }) => theme.defaults.cardText.fontFamily};
  font-size: 14px;
  line-height: 140%;
  font-weight: 400;
  width: 100%;
  padding: 0;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
