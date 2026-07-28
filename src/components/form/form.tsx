import { FormEvent, PropsWithChildren, useCallback, useState } from "react";
import { StyledForm } from "./form.style";
import { HtmlProps } from "../styles/theme";

export type FormProps = {
  validated?: boolean;
  notHandleValidation?: boolean;
};

function FormBase({
  children,
  validated,
  notHandleValidation = false,
  htmlProps,
}: PropsWithChildren<FormProps & HtmlProps<HTMLFormElement>>) {
  const [wasValidated, setWasValidated] = useState<boolean>(false);
  const { onSubmit: onSubmitFunc, ...restHtmlProps } = htmlProps || {};
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      if (!notHandleValidation) setWasValidated(true);
      e.currentTarget.checkValidity();
      onSubmitFunc?.(e);
    },
    [onSubmitFunc, notHandleValidation],
  );
  return (
    <StyledForm
      {...restHtmlProps}
      onSubmit={onSubmit}
      className={
        validated ? "was-validated" : wasValidated ? "was-validated" : undefined
      }
    >
      {children}
    </StyledForm>
  );
}

type FormComponent = typeof FormBase & {
  Group: typeof FormGroup;
  Label: typeof FormLabel;
  Control: typeof FormControl;
  Feedback: typeof FormFeedback;
  Checkbox: typeof FormCheckbox;
  Select: typeof FormSelect;
  TextArea: typeof FormTextArea;
  Color: typeof FormColor;
};

const Form = FormBase as unknown as FormComponent;

// Asignación estática (evita problemas de import cíclico)
import FormGroup from "./form-group/form-group";
import FormLabel from "./form-label/form-label";
import FormControl from "./form-control/form-control";
import FormFeedback from "./form-feedback/form-feedback";
import FormCheckbox from "./form-checkbox/form-checkbox";
import FormSelect from "./form-select/form-select";
import FormTextArea from "./form-textArea/form-textArea";
import FormColor from "./form-color/form-color";

Form.Group = FormGroup;
Form.Label = FormLabel;
Form.Control = FormControl;
Form.Feedback = FormFeedback;
Form.Checkbox = FormCheckbox;
Form.Select = FormSelect;
Form.TextArea = FormTextArea;
Form.Color = FormColor;
export default Form;
