import React from "react";
import { SelectOption } from "./form-select-types";

export function parseChildrenToOptions(
  children: React.ReactNode,
  optionsProp?: SelectOption[],
  hasListChildren?: boolean,
): SelectOption[] | null {
  if (optionsProp) return null;
  if (!children || hasListChildren) return null;
  const parsed: SelectOption[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = child.props as any;
      parsed.push({
        value: p.value ?? p.label ?? String(p.children ?? ""),
        label:
          p.label ?? (typeof p.children === "string" ? p.children : p.value),
        clickable: p.clickable,
        level: p.level,
      });
    }
  });
  return parsed.length > 0 ? parsed : null;
}
