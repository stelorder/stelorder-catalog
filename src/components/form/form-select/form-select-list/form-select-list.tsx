import React from "react";
import { List } from "../../../list";
import { useFormSelectContext } from "../context/form-select-context";

const SEARCH_HEIGHT = 40;
const DROPDOWN_MAX_HEIGHT = 320;

type FormSelectListProps = {
  children: React.ReactNode;
  dividers?: boolean;
  maxHeight?: number | string;
  htmlProps?: React.HTMLProps<HTMLDivElement>;
};

export const FormSelectList: React.FC<FormSelectListProps> = ({
  children,
  dividers = false,
  maxHeight: maxHeightProp,
  htmlProps,
}) => {
  const { isSearchable } = useFormSelectContext();

  const numericMaxHeight =
    maxHeightProp != null
      ? typeof maxHeightProp === "number"
        ? maxHeightProp
        : parseInt(maxHeightProp, 10)
      : DROPDOWN_MAX_HEIGHT;

  const effectiveMaxHeight = isSearchable
    ? Math.max(numericMaxHeight - SEARCH_HEIGHT, 100)
    : maxHeightProp;

  return (
    <List dividers={dividers} maxHeight={effectiveMaxHeight} {...htmlProps}>
      {children}
    </List>
  );
};
