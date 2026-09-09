import { useEffect, useMemo, RefObject } from "react";
import { SelectOption } from "./form-select-types";

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void,
): void {
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, ref]);
}

export function useSelectFilter(
  options: SelectOption[] | undefined,
  parsedOptions: SelectOption[] | null,
  hasListChildren: boolean,
  isSearchable: boolean,
  searchTerm: string,
): SelectOption[] | null {
  return useMemo(() => {
    const effectiveOptions = options ?? parsedOptions ?? [];
    if (hasListChildren) return null;
    if (!isSearchable || !searchTerm) return effectiveOptions;
    return effectiveOptions.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, parsedOptions, searchTerm, isSearchable, hasListChildren]);
}
