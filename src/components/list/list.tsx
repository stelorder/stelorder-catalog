import React, {
  PropsWithChildren,
  useId,
  ComponentPropsWithoutRef,
} from "react";

import { StyledList, StyledListTitle, StyledContainer } from "./list.style";
import { ListProvider, useListContext } from "./context/list-context";
import { HtmlProps } from "../styles/theme";
import { ListGroup } from "./list-group/list-group";
import { ListItem } from "./list-item/list-item";

export interface ListProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "title"
> {
  title?: React.ReactNode;
  maxHeight?: number | string;
  dividers?: boolean;
  paddingBase?: number;
}

function ListBase({
  title,
  children,
  maxHeight,
  dividers,
  paddingBase: paddingBaseProp,
  ...rest
}: PropsWithChildren<ListProps & HtmlProps<HTMLFormElement>>) {
  const id = useId();
  const titleId = `list-title-${id}`;

  const isScrollable = maxHeight !== undefined;

  const role = isScrollable || title ? "region" : undefined;

  const { level: contextLevel = 0, paddingBase: contextPaddingBase = 0 } =
    useListContext();

  const currentLevel = contextLevel;
  const base = paddingBaseProp ?? contextPaddingBase;

  return (
    <StyledContainer>
      {title && <StyledListTitle id={titleId}>{title}</StyledListTitle>}
      <ListProvider hasDivider={dividers} level={currentLevel + 1}>
        <StyledList
          {...rest}
          $maxHeight={maxHeight}
          $dividers={dividers}
          $level={currentLevel}
          $paddingBase={base}
          tabIndex={isScrollable ? 0 : undefined}
          role={role}
          aria-labelledby={title ? titleId : undefined}
        >
          {children}
        </StyledList>
      </ListProvider>
    </StyledContainer>
  );
}

type ListComponent = typeof ListBase & {
  Group: typeof ListGroup;
  Item: typeof ListItem;
};

const List = ListBase as unknown as ListComponent;

List.Group = ListGroup;

List.Item = ListItem;

export default List;
