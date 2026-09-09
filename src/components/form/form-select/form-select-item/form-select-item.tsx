import React, { PropsWithChildren, useCallback } from "react";
import { useFormSelectContext } from "../context/form-select-context";
import type { ListItemProps } from "../../../list/list-item/list-item.types";
import { HtmlProps } from "../../..";
import { StyledFormSelectItem } from "./form-select-item.style";

export type FormSelectItemProps = PropsWithChildren<
  ListItemProps &
    HtmlProps<HTMLDivElement> & {
      value: string;
      level?: "Default" | "Tabulado";
      htmlProps?: React.HTMLProps<HTMLDivElement>;
      searchValue?: string;
    }
>;

export const FormSelectItem: React.FC<FormSelectItemProps> = ({
  value,
  level,
  htmlProps,
  label,
  clickable = true,
  children,
  startAdornment,
  endAdornment,
  description,
  disabled: disabledProp,
  hasDivider,
  selected: selectedProp,
  expandable,
  defaultExpanded,
  searchValue,
  ...rest
}) => {
  const {
    selectOption,
    selectedOption,
    disabled: contextDisabled,
    searchTerm,
  } = useFormSelectContext();
  const disabled = disabledProp ?? contextDisabled;
  const isSelected = selectedProp ?? selectedOption?.value === value;
  const stringLabel =
    typeof label === "string"
      ? label
      : typeof children === "string"
        ? children
        : value;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && clickable) {
        selectOption({ value, label: stringLabel, clickable, level });
      }
    },
    [disabled, clickable, selectOption, value, stringLabel, level],
  );

  const mergedHtmlProps = expandable
    ? { ...htmlProps }
    : { ...htmlProps, onClick: handleClick };

  const hasLabelContent = !(children && !label && typeof children !== "string");

  const searchableText =
    searchValue ??
    (typeof label === "string"
      ? label
      : typeof children === "string"
        ? children
        : undefined);

  if (
    searchTerm &&
    searchableText &&
    !searchableText.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    return null;
  }

  return (
    <StyledFormSelectItem
      label={hasLabelContent ? (label ?? stringLabel) : undefined}
      description={hasLabelContent ? description : undefined}
      clickable={clickable}
      selected={isSelected}
      disabled={disabled}
      hasDivider={hasDivider}
      expandable={expandable}
      defaultExpanded={defaultExpanded}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      data-option={true}
      {...rest}
      {...mergedHtmlProps}
    >
      {children}
    </StyledFormSelectItem>
  );
};
