import styled, { css } from "styled-components";
import { StyledProp } from "../../styles/theme";

export type FormCheckCardVariant = "radio" | "boolean" | "compact";

type FormCheckCardStyledProps = StyledProp<{
  variant: FormCheckCardVariant;
}>;

const cardVariantStyle = {
  radio: css`
    width: 399px;
    height: 80px;
    gap: 12px;
    border-radius: 10px;
    background-color: ${({ theme }) =>
      theme.colors.orderSecondary.orderSecondary0};
    border: 1px solid ${({ theme }) => theme.colors.bn.bn20};
    align-items: flex-start;
    padding: 18px;

    &:hover {
      border-color: ${({ theme }) =>
        theme.colors.orderSecondary.orderSecondary40};
    }

    &:has(input:checked) {
      background-color: ${({ theme }) => theme.colors.blue.blue10};
      border-color: ${({ theme }) => theme.colors.blue.blue80};
      box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.04);
    }
  `,
  boolean: css`
    width: 399px;
    height: 80px;
    gap: 12px;
    border-radius: 10px;
    background-color: ${({ theme }) =>
      theme.colors.orderSecondary.orderSecondary0};
    border: 1px solid ${({ theme }) => theme.colors.bn.bn20};
    flex-direction: row-reverse;
    align-items: center;
    padding: 18px 22px;

    &:hover {
      border-color: ${({ theme }) =>
        theme.colors.orderSecondary.orderSecondary40};
    }

    &:has(input:checked) {
      background-color: ${({ theme }) => theme.colors.blue.blue10};
      border-color: ${({ theme }) => theme.colors.blue.blue80};
      box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.04);
    }
  `,
  /**
   * Tile compacto de rejilla (selector de método de pago del POS): sin
   * indicador de radio visible, la selección se marca solo con el fondo.
   */
  compact: css`
    flex: 1 0 0;
    min-height: 41px;
    max-height: 60px;
    gap: 4px;
    border-radius: 6px;
    background-color: transparent;
    border: 1px solid
      ${({ theme }) => theme.colors.orderSecondary.orderSecondary10};
    align-items: center;
    justify-content: center;
    padding: 12px;

    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.orderSecondary.orderSecondary10};
    }

    &:has(input:checked) {
      background-color: ${({ theme }) =>
        theme.colors.orderSecondary.orderSecondary5};
    }
  `,
} satisfies Record<FormCheckCardVariant, ReturnType<typeof css>>;

export const StyledFormCheckCard = styled.label<FormCheckCardStyledProps>`
  display: inline-flex;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;

  ${({ $styled }) => cardVariantStyle[$styled.variant]}

  &:has(input:checked) [data-checkcard-status] {
    display: inline-flex;
  }

  &:has(input:disabled) {
    border-color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary0};
  }

  &:has(input:disabled) [data-checkcard-label] {
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
  }

  &:has(input:disabled:checked) {
    background-color: ${({ theme }) =>
      theme.colors.variables.contabilidad.fillCard_configuracionSelect.read};
    border-color: ${({ theme }) =>
      theme.colors.variables.contabilidad.strokeCard_configuracionSelect.read};
  }

  &:has(input:disabled:checked) [data-checkcard-status] {
    background-color: ${({ theme }) =>
      theme.colors.variables.contabilidad.fillCard_configuracionSelect.read};
    border-color: ${({ theme }) => theme.colors.blue.blue30};
  }
`;

export const StyledFormCheckCardHeader = styled.div`
  display: flex;
  align-self: stretch;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;

export const StyledFormCheckCardBody = styled.div<FormCheckCardStyledProps>`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 4px;

  ${({ $styled }) =>
    $styled.variant === "compact" &&
    css`
      align-items: center;
      justify-content: center;
    `}
`;
