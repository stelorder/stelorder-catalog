import styled from "styled-components";
import { CardProps, TextAlign } from "./card";
import { StyledProp } from "../styles/theme";

type StyledCardProps = {
  text: TextAlign;
};

export const StyledCard = styled.div<StyledProp<StyledCardProps & CardProps>>`
  background: ${({ theme }) => theme.colors.bn.bn0};
  ${({ $styled, theme }) =>
    $styled.border
      ? `border: ${$styled.border};`
      : `border: 1px solid ${theme.colors.orderSecondary.orderSecondary10};`}
  width: 100%;
  text-align: ${({ $styled }) => $styled.text};

  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  ${({ $styled }) =>
    $styled.rounded &&
    `
    border-radius: 10px;
  `}

  ${({ $styled }) =>
    $styled.shadow &&
    `
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `} 
  
  ${({ $styled, theme }) =>
    $styled.hook &&
    `
    border-radius: 12px;
    padding: 12px 22px;
    border: 1px solid transparent;
    background: 
      linear-gradient(white, white) padding-box,
      linear-gradient(137deg, ${theme.colors.highlighted.highlighted1}, ${theme.colors.highlighted.highlighted2} 60%) border-box;
  `}
`;
