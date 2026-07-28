// form-textArea.style.ts
import styled, { css } from "styled-components";
import { StyledProp } from "../../styles/theme";
import { ValidatingState } from "../form-types";
import { createValidatingFormControlCssBlock } from "../form-utils";
import { TextAreaStyles, TextAreaVariant } from "./form-textArea-types";

export const StyledTextArea = styled.div<
  StyledProp<{
    state: ValidatingState;
    variant: TextAreaVariant;
    autoResize: boolean;
    width?: string;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
    styles?: TextAreaStyles;
    disabled: boolean;
  }>
>`
  position: relative;
  display: block;
  width: ${({ $styled }) => $styled.width ?? "100%"};

  ${({ $styled }) =>
    $styled.height
      ? css`
          height: ${$styled.height};
          overflow-y: auto;
          scrollbar-color: ${({ theme }) => theme.colors.bn.bn25} transparent;
          scrollbar-width: thin;
        `
      : css`
          min-height: ${$styled.minHeight ?? "40px"};
          ${$styled.maxHeight
            ? css`
                max-height: ${$styled.maxHeight};
                overflow-y: auto;
                scrollbar-color: ${({ theme }) => theme.colors.bn.bn25}
                  transparent;
                scrollbar-width: thin;
              `
            : css`
                overflow: visible;
              `}
        `}

  padding: 14px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.orderPrimary.orderPrimary20};
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};

  font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};

  outline: none;
  box-sizing: border-box;
  white-space: pre-line;
  word-break: break-word;
  overflow-wrap: break-word;

  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${({ $styled, theme }) =>
      $styled.styles?.default?.placeholderColor ??
      theme.colors.orderSecondary.orderSecondary40};
    pointer-events: none;
  }

  /* Default */
  ${({ $styled }) => {
    const def = $styled.styles?.default;
    if (!def) return css``;
    return css`
      ${def.borderColor && `border-color: ${def.borderColor};`}
      ${def.boxShadow && `box-shadow: ${def.boxShadow};`}
      ${def.backgroundColor && `background-color: ${def.backgroundColor};`}
      ${def.color && `color: ${def.color};`}
      ${def.padding && `padding: ${def.padding};`}
    `;
  }}

  ${({ $styled, theme }) => {
    const hover = $styled.styles?.hover;
    if (hover === false) return css``;
    if (hover === undefined)
      return css`
        &:hover:not([aria-disabled="true"]):not(:focus) {
          border-color: ${theme.colors.orderSecondary.orderSecondary40};
        }
      `;
    return css`
      &:hover:not([aria-disabled="true"]):not(:focus) {
        ${hover.borderColor && `border-color: ${hover.borderColor};`}
        ${hover.boxShadow && `box-shadow: ${hover.boxShadow};`}
        ${hover.backgroundColor &&
        `background-color: ${hover.backgroundColor};`}
        ${hover.color && `color: ${hover.color};`}
      }
    `;
  }}

  ${({ $styled, theme }) => {
    const focus = $styled.styles?.focus;
    if (focus === false) return css``;
    if (focus === undefined)
      return css`
        &:focus {
          border-color: ${theme.colors.orderPrimary.orderPrimary90};
        }
      `;
    return css`
      &:focus {
        ${focus.borderColor && `border-color: ${focus.borderColor};`}
        ${focus.boxShadow && `box-shadow: ${focus.boxShadow};`}
        ${focus.backgroundColor &&
        `background-color: ${focus.backgroundColor};`}
        ${focus.color && `color: ${focus.color};`}
      }
    `;
  }}

  ${({ $styled, theme }) => {
    const disabled = $styled.styles?.disabled;
    if (!$styled.disabled) return css``;
    if (disabled === false) return css``;
    if (disabled === undefined)
      return css`
        border: 1px solid ${theme.colors.bn.bn20};
        background-color: #f9f9fa;
        color: ${theme.colors.orderSecondary.orderSecondary70};
        cursor: not-allowed;
        pointer-events: none;
      `;
    return css`
      ${disabled.borderColor && `border: 1px solid ${disabled.borderColor};`}
      ${disabled.backgroundColor &&
      `background-color: ${disabled.backgroundColor};`}
      ${disabled.color && `color: ${disabled.color};`}
      ${disabled.boxShadow && `box-shadow: ${disabled.boxShadow};`}
      cursor: not-allowed;
      pointer-events: none;
    `;
  }}

  /* Variante inner */
  ${({ $styled }) =>
    $styled.variant === "inner" &&
    css`
      border: none;
      border-radius: 0;
      background-color: transparent;
      box-shadow: none;

      &:hover:not([aria-disabled="true"]):not(:focus) {
        border: none;
        box-shadow: none;
      }

      &:focus {
        border: none;
        box-shadow: none;
      }
    `}

  ${({ $styled, theme }) =>
    createValidatingFormControlCssBlock({ state: $styled.state, theme })}
`;
