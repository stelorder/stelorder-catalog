import React, { useCallback, useEffect, useId, useRef } from "react";
import styled, { css } from "styled-components";
import { SelectOption } from "./form-select-types";
import { ValidatingState } from "../form-types";
import { StyledProp } from "../../styles/theme";
import { createValidatingFormControlCssBlock } from "../form-utils";

const StyledSelectContainer = styled.div<
  StyledProp<{ state: ValidatingState; isOpen?: boolean }>
>`
  display: flex;
  min-height: 32px;
  position: relative;

  padding: 6px 12px;
  align-items: stretch;
  gap: 8px;

  border-radius: 6px;
  border: 1px solid
    ${({ theme }) => theme.colors.orderSecondary.orderSecondary20};
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary90};
  cursor: pointer;

  &:has(:focus) {
    border-color: ${({ theme }) => theme.colors.orderPrimary.orderPrimary90};
  }

  ${({ $styled }) =>
    $styled.isOpen &&
    css`
      border-color: ${({ theme }) => theme.colors.orderPrimary.orderPrimary90};
    `}

  &,
  & * {
    box-sizing: border-box;
  }
  ${({ $styled, theme }) =>
    createValidatingFormControlCssBlock({ state: $styled.state, theme })}
  &:has(:disabled) {
    border: 1px solid ${({ theme }) => theme.colors.bn.bn20};
    background-color: #f9f9fa;
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  }
`;

const StyledSelectInput = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  width: 0;
`;

const StyledDropdownIcon = styled.span`
  width: 10px;
  height: 14px;
  flex: 0 0 auto;
  color: ${({ theme }) => theme.colors.bn.bn60};
`;

const StyledOptionSelected = styled.div`
  flex: 1 0 auto;
  align-content: center;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary70};
  font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
`;

const StyledSelectDropdown = styled.ul<
  StyledProp<{ isOpen?: boolean; boxPosition?: "top" | "bottom" }>
>`
  position: absolute;
  left: 0;
  background-color: ${({ theme }) => theme.colors.bn.bn0};
  z-index: 10;
  display: block;
  list-style: none;
  margin: 0;
  padding: 4px;
  border-radius: 8px !important;
  border: 1px solid
    ${({ theme }) => theme.colors.orderSecondary.orderSecondary20};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1) !important;
  width: 100%;
  ${({ $styled }) =>
    !$styled?.isOpen &&
    css`
      display: none;
    `}
  ${({ $styled }) =>
    $styled?.boxPosition === "top" &&
    css`
      top: -10px;
      transform: translateY(-100%);
    `}
  ${({ $styled }) =>
    $styled?.boxPosition === "bottom" &&
    css`
      bottom: -10px;
      transform: translateY(100%);
    `}
`;

const StyledSelectOption = styled.li`
  padding: 8px 12px;
  display: block;
  cursor: pointer;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary80};
  font-family: ${({ theme }) => theme.fonts.h1400.fontFamily};
  font-size: ${({ theme }) => theme.fonts.h1400.fontSize};
  font-weight: ${({ theme }) => theme.fonts.h1400.fontWeight};
  line-height: ${({ theme }) => theme.fonts.h1400.lineHeight};
  &:hover {
    background-color: #fff6ef;
    color: ${({ theme }) => theme.colors.orderSecondary.orderSecondary100};
  }
`;

export const StyledSelectComponent: React.FC<{
  isOpen: boolean;
  toggleOpen: () => void;
  closeOpen: () => void;
  selectOption: (option: SelectOption) => void;
  options: SelectOption[];
  selectedOption?: SelectOption;
  defaultOption?: SelectOption;
  htmlProps?: React.HTMLProps<HTMLInputElement>;
  state: ValidatingState;
  boxPosition?: "top" | "bottom";
}> = (props) => {
  const {
    isOpen,
    toggleOpen,
    closeOpen,
    selectOption,
    htmlProps,
    options,
    boxPosition = "bottom",
  } = props;
  const id = useId();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeOpen();
      }
    },
    [closeOpen],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <StyledSelectContainer
      $styled={{ state: props.state, isOpen }}
      ref={containerRef}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!htmlProps?.disabled) toggleOpen();
      }}
      className="form-control select"
    >
      <StyledSelectInput type="text" {...htmlProps} />
      <StyledOptionSelected>
        {props.selectedOption
          ? props.selectedOption.label
          : props.defaultOption?.label && props.defaultOption.label}
      </StyledOptionSelected>
      <StyledDropdownIcon>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.08736 0.837358C1.31516 0.609552 1.68451 0.609552 1.91232 0.837358L4.99984 3.92488L8.08736 0.837358C8.31516 0.609552 8.68451 0.609552 8.91232 0.837358C9.14012 1.06516 9.14012 1.43451 8.91232 1.66232L5.41232 5.16232C5.18451 5.39012 4.81516 5.39012 4.58736 5.16232L1.08736 1.66232C0.859552 1.43451 0.859552 1.06516 1.08736 0.837358Z"
            fill="#878787"
          />
        </svg>
      </StyledDropdownIcon>
      <StyledSelectDropdown $styled={{ isOpen, boxPosition }}>
        {isOpen &&
          options.map((option, index) => (
            <StyledSelectOption
              key={`${id}-option-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!htmlProps?.disabled) selectOption(option);
              }}
            >
              {option.label}
            </StyledSelectOption>
          ))}
      </StyledSelectDropdown>
    </StyledSelectContainer>
  );
};
