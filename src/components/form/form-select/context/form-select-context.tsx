import React, { createContext, useContext, useMemo } from "react";
import { SelectOption } from "../form-select-types";

export type FormSelectContextValue = {
  selectOption: (option: SelectOption) => void;
  selectedOption?: SelectOption;
  disabled?: boolean;
  isSearchable?: boolean;
  searchTerm?: string;
};

const Ctx = createContext<FormSelectContextValue | undefined>(undefined);

export const FormSelectProvider: React.FC<
  React.PropsWithChildren<{ value: FormSelectContextValue }>
> = ({ value, children }) => {
  const ctx = useMemo(() => value, [value]);
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
};

export const useFormSelectContext = (): FormSelectContextValue => {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useFormSelectContext must be used within a FormSelect");
  return ctx;
};
