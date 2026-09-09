import React, { useState } from "react";
import type { ListItemProps } from "./list-item.types";

import Icon from "../../icon/icon";

import {
  StyledListItem,
  StyledChildren,
  StyledItemContent,
  StyledMainContent,
  StyledTextContent,
  StyledLabel,
  StyledDescription,
  StyledEndContent,
} from "./list-item.style";
import { useListContext } from "../context/list-context";
import { HtmlProps } from "../..";

const Label: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
  <StyledLabel {...props} />
);

const Description: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (
  props,
) => <StyledDescription {...props} />;

const EndContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <StyledEndContent {...props} />
);

const ListItemBase: React.FC<ListItemProps & HtmlProps<HTMLDivElement>> = ({
  label,
  description,
  children,
  hasDivider,
  selected,
  disabled,
  clickable,
  expandable,
  defaultExpanded = false,
  startAdornment,
  endAdornment,
  htmlProps,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const isInteractive = (clickable || expandable) && !disabled;

  const { hasDivider: listHasDivider } = useListContext();

  const hasStructuredContent =
    label != null ||
    description != null ||
    startAdornment != null ||
    endAdornment != null ||
    expandable;

  return (
    <StyledListItem
      role={expandable ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-expanded={expandable ? expanded : undefined}
      $hasDivider={hasDivider !== undefined ? hasDivider : listHasDivider}
      $selected={selected}
      $disabled={disabled}
      $clickable={isInteractive}
      onClick={() => expandable && setExpanded(!expanded)}
      onKeyDown={(e) => {
        if (expandable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setExpanded(!expanded);
        }
      }}
      {...htmlProps}
      {...rest}
    >
      {hasStructuredContent && (
        <StyledItemContent>
          <StyledMainContent>
            {startAdornment}

            {(label != null || description != null) && (
              <StyledTextContent>
                {label != null && <StyledLabel>{label}</StyledLabel>}

                {description != null && (
                  <StyledDescription>{description}</StyledDescription>
                )}
              </StyledTextContent>
            )}
          </StyledMainContent>

          <StyledEndContent>
            {endAdornment}

            {expandable && (
              <Icon
                variant={"sort-asc"}
                htmlProps={{
                  style: {
                    display: expanded ? "inline-block" : "none",
                  },
                }}
              />
            )}
            {expandable && (
              <Icon
                variant={"sort-desc"}
                htmlProps={{
                  style: {
                    display: !expanded ? "inline-block" : "none",
                  },
                }}
              />
            )}
          </StyledEndContent>
        </StyledItemContent>
      )}

      {expandable ? (
        <StyledChildren $expanded={expanded}>{children}</StyledChildren>
      ) : (
        children
      )}
    </StyledListItem>
  );
};

type ListItemComponent = typeof ListItemBase & {
  Label: typeof Label;
  Description: typeof Description;
  EndContent: typeof EndContent;
};

const ListItem = ListItemBase as unknown as ListItemComponent;

ListItem.Label = Label;
ListItem.Description = Description;
ListItem.EndContent = EndContent;

export { ListItem, ListItemBase };
