import React, { PropsWithChildren } from "react";
import { StyledCard } from "./card-body.style";
import { HtmlProps } from "../../styles/theme";

const CardBody: React.FC<PropsWithChildren<HtmlProps<HTMLDivElement>>> = ({
  children,
  htmlProps,
}) => {
  return <StyledCard {...htmlProps}>{children}</StyledCard>;
};

export default CardBody;
