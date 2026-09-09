import React, { useCallback, useEffect, useRef } from "react";
import { SelectOption } from "./form-select-types";
import { HtmlProps } from "../../styles/theme";
import { mapState } from "../form-utils";
import { parseChildrenToOptions } from "./form-select-utils";
import { useClickOutside, useSelectFilter } from "./form-select-hooks";
import { FormSelectTrigger } from "./form-select-trigger/form-select-trigger";
import { FormSelectDropdown } from "./form-select-dropdown/form-select-dropdown";
import { FormSelectSearch } from "./form-select-search/form-select-search";
import { FormSelectList } from "./form-select-list/form-select-list";
import { FormSelectItem } from "./form-select-item/form-select-item";
import { FormSelectProvider } from "./context/form-select-context";
import { Container, HiddenInput, NoResults } from "./form-select.style";

const FormSelectBase: React.FC<
  {
    options?: SelectOption[];
    optionValue?: SelectOption;
    defaultOption?: SelectOption;
    handleChange: (option: SelectOption) => void;
    isValid?: boolean;
    isInvalid?: boolean;
    size?: "md" | "lg";
    boxPosition?: "top" | "bottom";
    scrollable?: boolean;
    filterable?: boolean;
    searchable?: boolean;
    noResultsLabel?: string;
    noResultsNode?: React.ReactNode;
    placeholderSearch?: string;
    dropdownMaxWidth?: string;
    children?: React.ReactNode;
  } & HtmlProps<HTMLInputElement>
> = ({
  options: optionsProp,
  optionValue,
  isValid,
  isInvalid,
  handleChange,
  defaultOption,
  htmlProps,
  size,
  boxPosition,
  scrollable,
  filterable,
  searchable,
  noResultsLabel,
  noResultsNode,
  placeholderSearch,
  dropdownMaxWidth,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const state = mapState(isValid, isInvalid);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeOpen = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) setSearchTerm("");
  }, [isOpen]);

  useClickOutside(containerRef, isOpen, closeOpen);

  const selectOption = useCallback(
    (option: SelectOption) => {
      if (option.clickable === false) return;
      handleChange(option);
      closeOpen();
    },
    [handleChange, closeOpen],
  );

  const isSearchable = filterable ?? searchable ?? false;

  const hasListChildren = React.useMemo(() => {
    if (!children) return false;
    return React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.type === FormSelectList,
    );
  }, [children]);

  const parsedOptions = React.useMemo(
    () => parseChildrenToOptions(children, optionsProp, hasListChildren),
    [children, optionsProp, hasListChildren],
  );

  const filteredOptions = useSelectFilter(
    optionsProp,
    parsedOptions,
    hasListChildren,
    isSearchable,
    searchTerm,
  );

  const ctxValue = React.useMemo(
    () => ({
      selectOption,
      selectedOption: optionValue,
      disabled: htmlProps?.disabled,
      isSearchable,
      searchTerm,
    }),
    [selectOption, optionValue, htmlProps?.disabled, isSearchable, searchTerm],
  );

  return (
    <Container
      $styled={{ state, isOpen, size }}
      ref={containerRef}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!htmlProps?.disabled) toggleOpen();
      }}
      className="form-control select"
    >
      <HiddenInput type="text" {...htmlProps} />
      <FormSelectTrigger
        selectedLabel={optionValue?.label}
        defaultLabel={defaultOption?.label}
      />
      <FormSelectDropdown
        isOpen={isOpen}
        boxPosition={boxPosition}
        maxWidth={dropdownMaxWidth}
      >
        {isSearchable && (
          <FormSelectSearch
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={placeholderSearch}
          />
        )}
        <FormSelectProvider value={ctxValue}>
          {hasListChildren ? (
            children
          ) : filteredOptions !== null && filteredOptions.length > 0 ? (
            <FormSelectList maxHeight={scrollable ? 260 : undefined}>
              {filteredOptions.map((option) => (
                <FormSelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  clickable={option.clickable !== false}
                  level={option.level}
                />
              ))}
            </FormSelectList>
          ) : noResultsNode ? (
            noResultsNode
          ) : (
            <NoResults>{noResultsLabel ?? "No results"}</NoResults>
          )}
        </FormSelectProvider>
      </FormSelectDropdown>
    </Container>
  );
};

type FormSelectType = typeof FormSelectBase & {
  List: typeof FormSelectList;
  Item: typeof FormSelectItem;
};

const FormSelect = FormSelectBase as unknown as FormSelectType;
FormSelect.List = FormSelectList;
FormSelect.Item = FormSelectItem;

export default FormSelect;
