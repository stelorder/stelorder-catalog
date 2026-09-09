import React from "react";
import {
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
} from "./form-select-search.style";

type FormSelectSearchProps = {
  value: string;
  onChange: (value: string) => void;
  htmlProps?: React.HTMLProps<HTMLInputElement>;
  placeholder?: string;
};

export const FormSelectSearch: React.FC<FormSelectSearchProps> = ({
  value,
  onChange,
  htmlProps,
  placeholder,
}) => (
  <SearchContainer>
    <SearchInputWrapper>
      <SearchInput
        type="text"
        placeholder={placeholder || "Buscar"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        {...htmlProps}
      />
    </SearchInputWrapper>
  </SearchContainer>
);
