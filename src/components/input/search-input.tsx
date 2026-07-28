import { HtmlProps } from "../styles/theme";
import { StyledSearchInput } from "./search-input.style";
import React, { PropsWithChildren } from "react";

export type SearchInputSize = "m" | "l" | "xl";

export type SearchInputProps = {
  size?: SearchInputSize;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  children,
  size = "m",
  value,
  onChange,
  placeholder,
  htmlProps,
  ...rest
}: PropsWithChildren<SearchInputProps & HtmlProps<HTMLInputElement>>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <StyledSearchInput
      type="text"
      $styled={{ size }}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      {...htmlProps}
      {...rest}
    >
      {children}
    </StyledSearchInput>
  );
}
