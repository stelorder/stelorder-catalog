import React, { type PropsWithChildren, useState } from "react";
import { HtmlProps } from "../../styles/theme";
import { ValidatingState } from "../form-types";
import { mapState } from "../form-utils";
import { ComplexTextAreaStyles } from "./form-complexTexArea-types";
import FormComplexTextAreaItem, {
  type FormComplexTextAreaItemPosition,
  type FormComplexTextAreaItemProps,
} from "./form-complexTextArea-item/form-complexTextArea-item";
import {
  StyledComplexTextAreaWrapper,
  StyledMiddleRow,
  StyledTextAreaCell,
} from "./form-complexTextArea.style";
import FormTextArea from "../form-textArea/form-textArea";
import {
  TextAreaStyles,
  TextAreaVariant,
} from "../form-textArea/form-textArea-types";

export type FormComplexTextAreaProps = PropsWithChildren<{
  isValid?: boolean;
  isInvalid?: boolean;
  width?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  styles?: ComplexTextAreaStyles;
  columnGap?: string;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  textAreaVariant?: TextAreaVariant;
  textAreaHtmlProps?: HtmlProps<HTMLDivElement>["htmlProps"];
}>;

const getItemsByPosition = (
  children: React.ReactNode,
  position: FormComplexTextAreaItemPosition,
) =>
  React.Children.toArray(children).filter(
    (child): child is React.ReactElement<FormComplexTextAreaItemProps> =>
      React.isValidElement<FormComplexTextAreaItemProps>(child) &&
      child.props.position === position,
  );

const renderSlots = (
  items: React.ReactElement<FormComplexTextAreaItemProps>[],
) =>
  React.Children.map(items, (item) => (
    <FormComplexTextAreaItem {...item.props} />
  ));

const FormComplexTextAreaBase: React.FC<
  FormComplexTextAreaProps & HtmlProps<HTMLDivElement>
> = ({
  isValid,
  isInvalid,
  width,
  height,
  minHeight = "38px",
  maxHeight,
  styles,
  columnGap,
  disabled = false,
  placeholder,
  name,
  value,
  onChange,
  textAreaVariant = "inner",
  textAreaHtmlProps,
  htmlProps,
  children,
}) => {
  const state: ValidatingState = mapState(isValid, isInvalid);
  const [isFocused, setIsFocused] = useState(false);
  const topItems = getItemsByPosition(children, "top");
  const bottomItems = getItemsByPosition(children, "bottom");
  const leftItems = getItemsByPosition(children, "left");
  const rightItems = getItemsByPosition(children, "right");

  const textAreaStyles: TextAreaStyles | undefined = styles?.textarea
    ? {
        default: styles.textarea.default,
        hover: styles.textarea.hover,
        focus: styles.textarea.focus,
        disabled: styles.textarea.disabled,
      }
    : undefined;

  return (
    <StyledComplexTextAreaWrapper
      $styled={{ state, width, isFocused, columnGap, styles }}
      {...htmlProps}
      onFocus={(event) => {
        setIsFocused(true);
        htmlProps?.onFocus?.(event);
      }}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;
        if (
          !(nextTarget instanceof Node) ||
          !event.currentTarget.contains(nextTarget)
        ) {
          setIsFocused(false);
        }
        htmlProps?.onBlur?.(event);
      }}
    >
      {renderSlots(topItems)}

      <StyledMiddleRow
        $styled={{
          hasLeft: leftItems.length > 0,
          hasRight: rightItems.length > 0,
          columnGap,
        }}
      >
        {renderSlots(leftItems)}

        <StyledTextAreaCell
          $styled={{
            minHeight: height ?? minHeight,
            maxHeight: height ? undefined : maxHeight,
            textAreaVariant,
          }}
        >
          <FormTextArea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            height={height}
            minHeight={minHeight}
            maxHeight={maxHeight}
            variant={textAreaVariant}
            styles={textAreaStyles}
            htmlProps={textAreaHtmlProps}
          />
        </StyledTextAreaCell>

        {renderSlots(rightItems)}
      </StyledMiddleRow>

      {renderSlots(bottomItems)}
    </StyledComplexTextAreaWrapper>
  );
};

type FormComplexTextAreaComponent = typeof FormComplexTextAreaBase & {
  Item: typeof FormComplexTextAreaItem;
};
const FormComplexTextArea =
  FormComplexTextAreaBase as FormComplexTextAreaComponent;
FormComplexTextArea.Item = FormComplexTextAreaItem;

export default FormComplexTextArea;
