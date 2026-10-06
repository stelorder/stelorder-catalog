import styled, { css, useTheme } from "styled-components";
import { IntegrationsThemeType, StyledProp } from "../../styles/theme";
import { DefaultTheme } from "styled-components/dist/types";
import React, { HtmlHTMLAttributes } from "react";
import { createValidatingFormControlCssBlock } from "../form-utils";
import { AlignLabel, SwitchVariant, ValidatingState } from "../form-types";
import { StyledLabel } from "../form-label/form-label.style";

type StyledFormCheckboxType = StyledProp<{
  state?: ValidatingState;
  type?: "checkbox" | "radio" | SwitchVariant;
  label?: string;
  labelPosition: AlignLabel;
  labelGap: number;
}>;

export const StyledFormCheckbox = ({
  $styled: {
    type = "checkbox",
    state,
    labelPosition = "left",
    label,
    labelGap,
  },
  ...htmlProps
}: StyledFormCheckboxType) => {
  if (type === "switch-pill") {
    return (
      <StyledComponentSwitchPill
        {...htmlProps}
        className="form-control"
        label={label}
        labelPosition={labelPosition}
        labelGap={labelGap}
      />
    );
  }

  return type !== "switch" ? (
    <StyledComponentCheckAndRadio
      {...htmlProps}
      $styled={{ type, state: state, labelPosition, labelGap }}
      type={type}
      className="form-control"
    />
  ) : (
    <StyledComponentSwitch
      {...htmlProps}
      className="form-control"
      state={state}
      label={label}
      labelPosition={labelPosition}
      labelGap={labelGap}
    />
  );
};

const StyledComponentCheckAndRadio = styled.input<StyledFormCheckboxType>`
  ${({ theme, $styled }) =>
    basicStyle({
      type: $styled.type as "checkbox" | "radio" | "switch",
      state: $styled.state,
      theme,
    })};
`;

const StyledSwitchContainer = styled.div<
  StyledProp<{
    state?: ValidatingState;
  }>
>`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.bn.bn20} !important;
  height: 20px;
  ${({ theme, $styled }) =>
    basicStyle({ type: "switch", theme, state: $styled.state })};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) =>
      theme.colors.orderPrimary.orderPrimary90};
    transition: all 0.3s ease-in-out;
    z-index: 1;
  }

  &:has(input:checked)::after {
    left: 0;
  }

  --switch-w: 46px;
  --switch-h: 20px;
  --gap: 4px;
  --switch-icon: calc(var(--switch-h) - var(--gap));

  width: var(--switch-w);
  height: var(--switch-h);
`;

const SwitchIcon = styled.span`
  position: absolute;
  --gap-icon: calc(var(--gap) / 2);

  width: var(--switch-icon);
  height: var(--switch-icon);
  box-sizing: border-box;

  border-radius: 50%;
  display: block;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  transition: all 0.3s ease-in-out;

  top: 50%;
  transform: translateY(-50%);
  right: calc(100% - var(--switch-icon) - (var(--gap)) + (var(--gap-icon)));

  input:checked + & {
    right: var(--gap-icon);
  }
`;

const StyledSwitch = styled.input`
  display: none;
`;

const StyledComponentSwitch: React.FC<
  HtmlHTMLAttributes<HTMLInputElement> & {
    state?: ValidatingState;
    label?: string;
    labelPosition: AlignLabel;
    labelGap: number;
  }
> = (props) => {
  const theme = useTheme() as IntegrationsThemeType;

  return (
    <label
      htmlFor={props.id}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: props.labelGap,
      }}
    >
      {props.label && (
        <StyledLabel
          style={{
            order: props.labelPosition === "left" ? 0 : 1,
            verticalAlign: "middle",
            color: theme.colors.orderSecondary.orderSecondary100,
          }}
          as="span"
        >
          {props.label}
        </StyledLabel>
      )}
      <StyledSwitchContainer $styled={{ state: props?.state }}>
        <StyledSwitch {...props} type="checkbox" />
        <SwitchIcon />
      </StyledSwitchContainer>
    </label>
  );
};

const basicStyle = ({
  state = "default",
  type,
  theme,
}: {
  type: "checkbox" | "radio" | "switch";
  theme: DefaultTheme;
  state?: ValidatingState;
}) => css`
  appearance: none;
  flex-shrink: 0;
  padding: 0;
  margin-top: 2px;
  background-repeat: no-repeat;
  &:checked {
    background-color: ${theme.colors.orderPrimary.orderPrimary90};
  }
  ${
    type !== "switch" &&
    css`
      border: 1px solid ${theme.colors.bn.bn30};

      &:checked {
        border: 1px solid ${theme.colors.orderPrimary.orderPrimary90};
      }
    `
  }
  ${
    type !== "switch"
      ? checkRadioBaseStyle({
          theme,
          type: type as "checkbox" | "radio",
        })
      : checkSwitchBaseStyle()
  }

  ${createValidatingFormControlCssBlock({
    state,
    theme,
  })}
`;

const checkSwitchBaseStyle = () => css`
  border-radius: 100px;
  width: 50px;
`;

const checkRadioBaseStyle = ({
  theme,
  type,
}: {
  theme: IntegrationsThemeType;
  type: "checkbox" | "radio";
}) => css`
  width: 14px;
  height: 14px;
  fill: ${theme.colors.bn.bn0};
  ${
    type === "checkbox" &&
    css`
      border-radius: 2px;
      &:checked {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3E%3C/svg%3E");
      }
    `
  }
  ${
    type === "radio" &&
    css`
      border-radius: 50%;
      &:checked {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Ccircle cx='10' cy='10' r='5' fill='%23fff'/%3E%3C/svg%3E");
      }
    `
  }
`;

// ========== Switch Pill Styles ==========

const StyledSwitchPillTrack = styled.div`
  position: relative;
  overflow: visible;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.bn.bn30};
  height: 12px;
  width: 32px;
  transition: background-color 0.3s ease-in-out;

  &:has(input:checked) {
    background-color: ${({ theme }) =>
      theme.colors.orderSecondary.orderSecondary10};
  }
`;

const StyledSwitchPillThumb = styled.span`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.bn.bn80};
  transition: all 0.3s ease-in-out;
  left: -2px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;

  input:checked + & {
    background-color: ${({ theme }) =>
      theme.colors.orderSecondary.orderSecondary100};
    left: calc(100% - 16px + 2px);
  }
`;

const StyledSwitchPillInput = styled.input`
  display: none;
`;

const StyledComponentSwitchPill: React.FC<
  HtmlHTMLAttributes<HTMLInputElement> & {
    label?: string;
    labelPosition: AlignLabel;
    labelGap: number;
  }
> = (props) => {
  const theme = useTheme() as IntegrationsThemeType;

  return (
    <label
      htmlFor={props.id}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: props.labelGap,
      }}
    >
      {props.label && (
        <StyledLabel
          style={{
            order: props.labelPosition === "left" ? 0 : 1,
            verticalAlign: "middle",
            color: theme.colors.orderSecondary.orderSecondary100,
          }}
          as="span"
        >
          {props.label}
        </StyledLabel>
      )}
      <StyledSwitchPillTrack>
        <StyledSwitchPillInput {...props} type="checkbox" />
        <StyledSwitchPillThumb />
      </StyledSwitchPillTrack>
    </label>
  );
};
