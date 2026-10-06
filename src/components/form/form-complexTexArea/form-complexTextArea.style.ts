import styled, { css } from "styled-components";
import { StyledProp } from "../../styles/theme";
import { ValidatingState } from "../form-types";
import { createValidatingFormControlCssBlock } from "../form-utils";
import type { TextAreaVariant } from "../form-textArea/form-textArea-types";
import { ComplexTextAreaStyles } from "./form-complexTexArea-types";

type WrapperStyled = {
  state: ValidatingState;
  width?: string;
  isFocused: boolean;
  columnGap?: string;
  styles?: ComplexTextAreaStyles;
};

type CellStyled = {
  minHeight?: string;
  maxHeight?: string;
  textAreaVariant: TextAreaVariant;
  styles?: ComplexTextAreaStyles;
};

export const StyledComplexTextAreaWrapper = styled.div<
  StyledProp<WrapperStyled>
>`
  display: grid;
  grid-template-rows: auto minmax(0, auto) auto;
  width: ${({ $styled }) => $styled.width ?? "100%"};
  border-radius: 6px;
  border: 1px solid
    ${({ theme, $styled }) => {
      const def = $styled.styles?.container?.default;
      return def?.borderColor ?? theme.colors.orderPrimary.orderPrimary20;
    }};
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  box-sizing: border-box;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  ${({ $styled }) => {
    const def = $styled.styles?.container?.default;
    if (!def) return "";
    return css`
      ${def.boxShadow ? `box-shadow: ${def.boxShadow};` : ""}
      ${def.backgroundColor ? `background-color: ${def.backgroundColor};` : ""}
    `;
  }}

  ${({ $styled, theme }) => {
    const hover = $styled.styles?.container?.hover;
    if (hover === false) {
      return "";
    }
    if (hover === undefined) {
      return css`
        &:hover:not(:focus-within) {
          border-color: ${theme.colors.orderSecondary.orderSecondary40};
        }
      `;
    }
    return css`
      &:hover:not(:focus-within) {
        ${hover.borderColor ? `border-color: ${hover.borderColor};` : ""}
        ${hover.boxShadow ? `box-shadow: ${hover.boxShadow};` : ""}
        ${
          hover.backgroundColor
            ? `background-color: ${hover.backgroundColor};`
            : ""
        }
      }
    `;
  }}

  ${({ $styled, theme }) => {
    if (!$styled.isFocused) return "";
    const focus = $styled.styles?.container?.focus;
    if (focus === false) {
      return "";
    }
    if (focus === undefined) {
      return css`
        border-color: ${theme.colors.orderPrimary.orderPrimary90};
      `;
    }
    return css`
      ${focus.borderColor ? `border-color: ${focus.borderColor};` : ""}
      ${focus.boxShadow ? `box-shadow: ${focus.boxShadow};` : ""}
      ${
        focus.backgroundColor
          ? `background-color: ${focus.backgroundColor};`
          : ""
      }
    `;
  }}

  ${({ $styled, theme }) =>
    createValidatingFormControlCssBlock({ state: $styled.state, theme })}
`;

export const StyledMiddleRow = styled.div<
  StyledProp<{ hasLeft: boolean; hasRight: boolean; columnGap?: string }>
>`
  display: grid;
  grid-template-columns:
    ${({ $styled }) => ($styled.hasLeft ? "auto " : "")}
    minmax(0, 1fr)
    ${({ $styled }) => ($styled.hasRight ? " auto" : "")};
  column-gap: ${({ $styled }) => $styled.columnGap ?? "0"};
  align-items: stretch;
  min-width: 0;
`;

export const StyledTextAreaCell = styled.div<StyledProp<CellStyled>>`
  min-width: 0;
  display: flex;
  align-items: stretch;
  min-height: ${({ $styled }) => $styled.minHeight ?? "38px"};
  ${({ $styled }) =>
    $styled.maxHeight ? `max-height: ${$styled.maxHeight};` : ""}
  ${({ $styled }) => ($styled.maxHeight ? `overflow-y: auto;` : "")}

  ${({ $styled }) =>
    $styled.textAreaVariant === "inner" &&
    css`
      div[contenteditable] {
        display: block;
        width: 100%;
        min-height: ${$styled.minHeight ?? "38px"};
        padding: 10px 12px;
        border: none;
        background-color: transparent;
        box-sizing: border-box;
        outline: none;
        word-break: break-word;
        overflow-wrap: break-word;
        overflow-x: hidden;
        white-space: pre-line;
        font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
        font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
        font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
        line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
        color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};

        &:empty::before {
          content: attr(data-placeholder);
          color: ${({ theme }) =>
            $styled.styles?.textarea?.default?.placeholderColor ??
            theme.colors.orderSecondary.orderSecondary40};
          pointer-events: none;
        }

        ${() => {
          const def = $styled.styles?.textarea?.default;
          if (!def) return "";
          return css`
            ${def.padding ? `padding: ${def.padding};` : ""}
            ${def.color ? `color: ${def.color};` : ""}
            ${
              def.backgroundColor
                ? `background-color: ${def.backgroundColor};`
                : ""
            }
            ${def.boxShadow ? `box-shadow: ${def.boxShadow};` : ""}
          `;
        }}

        ${() => {
          const hover = $styled.styles?.textarea?.hover;
          if (hover === false || hover === undefined) return "";
          return css`
            &:hover:not([aria-disabled="true"]):not(:focus) {
              ${hover.padding ? `padding: ${hover.padding};` : ""}
              ${hover.color ? `color: ${hover.color};` : ""}
              ${
                hover.backgroundColor
                  ? `background-color: ${hover.backgroundColor};`
                  : ""
              }
              ${hover.boxShadow ? `box-shadow: ${hover.boxShadow};` : ""}
            }
          `;
        }}

        ${() => {
          const focus = $styled.styles?.textarea?.focus;
          if (focus === false || focus === undefined) return "";
          return css`
            &:focus {
              ${focus.padding ? `padding: ${focus.padding};` : ""}
              ${focus.color ? `color: ${focus.color};` : ""}
              ${
                focus.backgroundColor
                  ? `background-color: ${focus.backgroundColor};`
                  : ""
              }
              ${focus.boxShadow ? `box-shadow: ${focus.boxShadow};` : ""}
            }
          `;
        }}

        ${() => {
          const disabled = $styled.styles?.textarea?.disabled;
          if (disabled === false || disabled === undefined) return "";
          return css`
            &[aria-disabled="true"] {
              ${disabled.padding ? `padding: ${disabled.padding};` : ""}
              ${disabled.color ? `color: ${disabled.color};` : ""}
              ${
                disabled.backgroundColor
                  ? `background-color: ${disabled.backgroundColor};`
                  : ""
              }
              ${disabled.boxShadow ? `box-shadow: ${disabled.boxShadow};` : ""}
            }
          `;
        }}
      }
    `}
`;
