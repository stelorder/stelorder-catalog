import styled, { css } from "styled-components";
import { StyledProp } from "../styles/theme";
import { Card } from "../card";

export const StyledSelectCard = styled(Card)<
  StyledProp<{ selected?: boolean; disabled?: boolean }>
>`
  padding: 12px;
  border-radius: 10px;

  ${({ $styled, theme }) =>
    $styled.selected &&
    css`
      border: 1px solid ${theme.colors.orderPrimary.orderPrimary90};
    `}

  ${({ $styled, theme }) =>
    $styled.disabled &&
    css`
      border: 1px solid ${theme.colors.orderSecondary.orderSecondary20};
    `}
  background-color: ${({ $styled }) =>
    $styled.disabled ? "#F9F9FA" : "inherit"};
  height: -webkit-fill-available;
`;
