import { Children, PropsWithChildren, ReactNode, isValidElement } from "react";
import {
  FormCheckCardVariant,
  StyledFormCheckCard,
  StyledFormCheckCardBody,
  StyledFormCheckCardHeader,
} from "./form-checkCard.style";
import { HtmlProps } from "../../styles/theme";
import FormCheckCardControl from "./form-checkCard-control/form-checkCard-control";
import FormCheckCardLabel from "./form-checkCard-label/form-checkCard-label";
import FormCheckCardDescription from "./form-checkCard-description/form-checkCard-description";
import FormCheckCardStatus from "./form-checkCard-status/form-checkCard-status";

export type FormCheckCardProps = PropsWithChildren<
  {
    variant?: FormCheckCardVariant;
    disabled?: boolean;
  } & HtmlProps<HTMLInputElement>
>;

function FormCheckCardBase({
  variant = "radio",
  disabled,
  htmlProps,
  children,
}: FormCheckCardProps) {
  const childrenArray = Children.toArray(children);

  const extractChild = (type: unknown): ReactNode | null => {
    const idx = childrenArray.findIndex(
      (child) => isValidElement(child) && child.type === type,
    );
    if (idx !== -1) {
      const [child] = childrenArray.splice(idx, 1);
      return child;
    }
    return null;
  };

  const labelChild = extractChild(FormCheckCardLabel);
  const statusChild = extractChild(FormCheckCardStatus);
  const descriptionChild = extractChild(FormCheckCardDescription);
  const restChildren = childrenArray;

  return (
    <StyledFormCheckCard $styled={{ variant }}>
      <FormCheckCardControl
        variant={variant}
        disabled={disabled}
        htmlProps={htmlProps}
      />
      <StyledFormCheckCardBody $styled={{ variant }}>
        {(labelChild || statusChild) && (
          <StyledFormCheckCardHeader>
            {labelChild}
            {statusChild}
          </StyledFormCheckCardHeader>
        )}
        {descriptionChild && descriptionChild}
        {restChildren}
      </StyledFormCheckCardBody>
    </StyledFormCheckCard>
  );
}

type FormCheckCardComponent = typeof FormCheckCardBase & {
  Control: typeof FormCheckCardControl;
  Label: typeof FormCheckCardLabel;
  Description: typeof FormCheckCardDescription;
  Status: typeof FormCheckCardStatus;
};

const FormCheckCard = FormCheckCardBase as FormCheckCardComponent;
FormCheckCard.Control = FormCheckCardControl;
FormCheckCard.Label = FormCheckCardLabel;
FormCheckCard.Description = FormCheckCardDescription;
FormCheckCard.Status = FormCheckCardStatus;

export default FormCheckCard;
