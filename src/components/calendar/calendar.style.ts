import styled, { css } from "styled-components";
import { StyledProp } from "../styles/theme";

export const StyledCalendarContainer = styled.div`
  width: 265px;
  padding: 14px;
  background: ${({ theme }) => theme.colors.bn.bn0};
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  outline: 1px ${({ theme }) => theme.colors.orderSecondary.orderSecondary10}
    solid;
  outline-offset: -1px;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  &,
  & * {
    box-sizing: border-box;
  }
`;

export const StyledCalendarHeader = styled.div`
  align-self: stretch;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCalendarNavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 2px;
  border: none;
  background: ${({ theme }) => theme.colors.bn.bn0};
  border-radius: 4px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.orderPrimary.orderPrimary90};
    outline-offset: 1px;
  }
`;

export const StyledCalendarMonthYear = styled.span`
  font-family: ${({ theme }) => theme.defaults.cardText.fontFamily};
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  text-align: center;
`;

export const StyledCalendarDayNamesRow = styled.div`
  align-self: stretch;
  padding-bottom: 4px;
  padding-left: 3px;
  padding-right: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledCalendarDayName = styled.div`
  width: 33px;
  padding: 4px 14px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.defaults.cardText.fontFamily};
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  text-align: center;
`;

export const StyledCalendarGrid = styled.div`
  align-self: stretch;
  padding-left: 3px;
  padding-right: 3px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
`;

export const StyledCalendarEmptyCell = styled.div`
  width: 33px;
  height: 28px;
  padding: 4px 14px;
  border-radius: 6px;
  flex-shrink: 0;
`;

export const StyledCalendarDay = styled.button<
  StyledProp<{
    isPending: boolean;
    isWeekend: boolean;
    disabled?: boolean;
    isDisabledDate?: boolean;
    isToday?: boolean;
    isBeforeToday?: boolean;
  }>
>`
  width: 33px;
  position: relative;
  padding: 4px 14px;
  border-radius: 6px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;

  font-family: ${({ theme }) => theme.defaults.cardText.fontFamily};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  text-align: center;

  border: none;
  outline: none;
  background: transparent;

  color: ${({ $styled, theme }) =>
    $styled.isPending
      ? theme.colors.orderSecondary.orderSecondary100
      : $styled.isWeekend || $styled.isDisabledDate || $styled.isBeforeToday
        ? theme.colors.orderSecondary.orderSecondary70
        : theme.colors.orderSecondary.orderSecondary100};

  ${({ $styled, theme }) =>
    $styled.isPending &&
    css`
      background: ${theme.colors.orderPrimary.orderPrimary15};
      outline: 1px ${theme.colors.orderPrimary.orderPrimary100} solid;
      outline-offset: -1px;
    `}

  ${({ $styled }) =>
    ($styled.disabled || $styled.isDisabledDate) &&
    css`
      cursor: default;
      pointer-events: none;
    `}

  ${({ $styled }) =>
    $styled.disabled &&
    css`
      opacity: 0.35;
    `}

  &:hover:not(:disabled) {
    background: ${({ $styled, theme }) =>
      $styled.isPending
        ? theme.colors.orderPrimary.orderPrimary15
        : theme.colors.orderSecondary.orderSecondary10};
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.orderPrimary.orderPrimary100} !important;
    outline-offset: -2px !important;
  }

  ${({ $styled, theme }) =>
    $styled.isToday &&
    !$styled.isPending &&
    css`
      &::after {
        content: "";
        position: absolute;
        width: 4px;
        height: 4px;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        background: ${theme.colors.orderPrimary.orderPrimary100};
        border-radius: 50%;
      }
    `}
`;

export const StyledCalendarFooter = styled.div`
  align-self: stretch;
  padding-top: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

export const StyledTimeSelectionRow = styled.div`
  align-self: stretch;
  padding-top: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

export const StyledTimeFieldContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
  padding-bottom: 10px;
`;

export const StyledTimeFieldLabel = styled.div`
  width: 48px;
  height: 32px;
  padding: 2px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: ${({ theme }) => theme.defaults.cardText.fontFamily};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
`;

export const StyledTimeFieldInputWrapper = styled.div`
  flex: 1 1 0;
  height: 32px;
  padding: 6px 6px 6px 10px;
  background: ${({ theme }) => theme.colors.bn.bn0};
  border-radius: 6px;
  outline: 1px ${({ theme }) => theme.colors.orderSecondary.orderSecondary20}
    solid;
  outline-offset: -1px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;

  &:focus-within {
    outline-color: ${({ theme }) =>
      theme.colors.orderPrimary.orderPrimary90} !important;
  }
`;

export const StyledTimeInput = styled.input`
  flex: 1 1 0;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  font-family: ${({ theme }) => theme.defaults.cardText.fontFamily};
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  width: 100%;
`;

export const StyledSpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 20px;
`;

export const StyledSpinnerButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  width: 14px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;
