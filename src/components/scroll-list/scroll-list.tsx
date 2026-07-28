import React, { ElementType, PropsWithChildren, useId } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledScrollList, StyledScrollListTitle } from "./scroll-list.style";
import { ScrollListItem } from "./scroll-list-item/scroll-list-item";

const ScrollList: React.FC<
  PropsWithChildren<
    {
      title: string;
      containerElement?: ElementType;
    } & HtmlProps<HTMLDivElement>
  >
> = ({ title, containerElement = "section", children, htmlProps }) => {
  const id = useId();
  const Container = containerElement;
  const titleId = `${id}-title`;

  return (
    <Container style={{ height: "100%" }}>
      <StyledScrollListTitle id={titleId}>{title}</StyledScrollListTitle>
      <StyledScrollList
        {...htmlProps}
        role={htmlProps?.role ?? "region"}
        aria-labelledby={htmlProps?.["aria-labelledby"] ?? titleId}
        tabIndex={htmlProps?.tabIndex ?? 0}
      >
        {React.Children.toArray(children).map((child, index) => (
          <ScrollListItem key={`${id}-item-${index}`}>{child}</ScrollListItem>
        ))}
      </StyledScrollList>
    </Container>
  );
};

export default ScrollList;
