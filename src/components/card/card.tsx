import React, { PropsWithChildren } from "react";
import { StyledCard } from "./card.style";
import { breakpointsType, HtmlProps } from "../styles/theme";
import { useTheme } from "styled-components";
import CardBody from "./card-body/card-body";
import CardTitle from "./card-title/card-title";
import CardText from "./card-text/card-text";

export type TextAlign = "start" | "end" | "center";

export type CardBasicsProps = {
  text?: TextAlign;
  border?: string;
  shadow?: boolean;
  rounded?: boolean;
  hook?: boolean;
};

export type CardResponsiveProps = {
  [key in breakpointsType]?: CardBasicsProps;
};

export type CardProps = CardBasicsProps & CardResponsiveProps;

// Crear el componente base
const CardBase: React.FC<
  CardProps &
    PropsWithChildren<HtmlProps<HTMLDivElement>> & {
      className?: string;
    }
> = ({
  children,
  text,
  shadow,
  rounded,
  hook,
  border,
  htmlProps,
  className,
  ...props
}) => {
  const theme = useTheme();
  return (
    <StyledCard
      className={className}
      $styled={{
        text: (text ?? theme.defaults.card.text) as TextAlign,
        shadow: shadow ?? theme.defaults.card.shadow,
        rounded: rounded ?? theme.defaults.card.rounded,
        hook: hook ?? theme.defaults.card.hook,
        border: border,
        ...props,
      }}
      {...htmlProps}
      as={htmlProps?.as ?? theme.defaults.card.as}
    >
      {children}
    </StyledCard>
  );
};

type CardComponent = typeof CardBase & {
  Body: typeof CardBody;
  Title: typeof CardTitle;
  Text: typeof CardText;
};

const Card = CardBase as CardComponent;

Card.Body = CardBody;
Card.Title = CardTitle;
Card.Text = CardText;

export default Card;
