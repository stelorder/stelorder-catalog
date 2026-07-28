import React, { PropsWithChildren } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledSelectCard } from "./selectCard.style";
import SelectCardTitle from "./selectCard-title/selectCard-title";
import SelectCardText from "./selectCard-text/selectCard-text";
import { CardProps } from "../card/card";

type SelectCardBaseProps = PropsWithChildren<
  CardProps &
    HtmlProps<HTMLDivElement> & {
      selected?: boolean;
      disabled?: boolean;
      required?: boolean;
      onSelect?: (selected: boolean) => void;
    }
>;

const SelectCardBase: React.FC<SelectCardBaseProps> = ({
  children,
  htmlProps,
  selected = false,
  disabled = false,
  required = false,
  onSelect,
  ...cardProps
}) => {
  const handleClick = () => {
    if (disabled) return;
    if (required && selected) return;
    onSelect?.(!selected);
  };

  return (
    <StyledSelectCard
      {...cardProps}
      $styled={{ selected, disabled }}
      aria-disabled={disabled || undefined}
      data-selected={selected ? "" : undefined}
      htmlProps={{
        ...htmlProps,
        onClick: handleClick,
      }}
    >
      {children}
    </StyledSelectCard>
  );
};

type SelectCardComponent = typeof SelectCardBase & {
  Title: typeof SelectCardTitle;
  Text: typeof SelectCardText;
};

const SelectCard = SelectCardBase as SelectCardComponent;

SelectCard.Title = SelectCardTitle;
SelectCard.Text = SelectCardText;

export default SelectCard;
