import React, { useCallback } from "react";
import { SelectOption } from "./form-select-types";
import { StyledSelectComponent } from "./form-select.style";
import { HtmlProps } from "../../styles/theme";
import { mapState } from "../form-utils";

// Componente form select
const FormSelect: React.FC<
  {
    options: SelectOption[];
    optionValue?: SelectOption;
    defaultOption?: SelectOption;
    handleChange: (option: SelectOption) => void;
    isValid?: boolean;
    isInvalid?: boolean;
    boxPosition?: "top" | "bottom";
  } & HtmlProps<HTMLInputElement>
> = ({
  options,
  optionValue,
  isValid,
  isInvalid,
  handleChange,
  defaultOption,
  htmlProps,
  boxPosition,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const state = mapState(isValid, isInvalid);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const closeOpen = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const selectOption = useCallback(
    (option: SelectOption) => {
      handleChange(option);
      closeOpen();
    },
    [handleChange, closeOpen],
  );

  return (
    <StyledSelectComponent
      state={state}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      closeOpen={closeOpen}
      selectOption={selectOption}
      options={options}
      selectedOption={optionValue}
      defaultOption={defaultOption}
      htmlProps={htmlProps}
      boxPosition={boxPosition}
    />
  );
};

export default FormSelect;
