import React, { useCallback, useEffect, useRef } from "react";
import { HtmlProps } from "../../styles/theme";
import { ValidatingState } from "../form-types";
import { mapState } from "../form-utils";
import { TextAreaStyles, TextAreaVariant } from "./form-textArea-types";
import { StyledTextArea } from "./form-textArea.style";

const ALLOWED_TAGS = new Set(["DIV", "BR", "SPAN"]);

function sanitizeNode(el: HTMLElement): void {
  const nodes = Array.from(el.querySelectorAll("*"));

  nodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;

    node.removeAttribute("style");
    node.removeAttribute("class");

    if (!ALLOWED_TAGS.has(node.tagName)) {
      const textNode = document.createTextNode(node.innerText);
      node.replaceWith(textNode);
    }
  });

  if (el.querySelectorAll("br").length === 1 && el.innerText.trim() === "") {
    el.innerHTML = "";
  }
}

export type FormTextAreaProps = {
  isValid?: boolean;
  isInvalid?: boolean;
  variant?: TextAreaVariant;
  width?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  styles?: TextAreaStyles;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  value?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  onChange?: (value: string) => void;
};

const FormTextArea: React.FC<FormTextAreaProps & HtmlProps<HTMLDivElement>> = ({
  isValid,
  isInvalid,
  variant = "default",
  width,
  height,
  minHeight,
  maxHeight,
  styles,
  disabled = false,
  placeholder,
  name,
  value,
  onChange,
  ariaLabel,
  ariaLabelledby,
  htmlProps,
}) => {
  const state: ValidatingState = mapState(isValid, isInvalid);
  const editorRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const autoResize = !height;

  const syncHidden = useCallback((text: string) => {
    if (hiddenRef.current) {
      hiddenRef.current.value = text;
    }
  }, []);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const nextValue = value ?? "";

    if (el.innerText !== nextValue) {
      el.innerText = nextValue;
      syncHidden(nextValue);
    }
  }, [value, syncHidden]);

  const handleInput = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    sanitizeNode(el);
    const text = el.innerText;
    syncHidden(text);
    onChange?.(text);
  }, [onChange, syncHidden]);
  const finalAriaLabel =
    ariaLabel || htmlProps?.["aria-label"] || placeholder || "Campo de texto";
  return (
    <>
      <StyledTextArea
        ref={editorRef}
        $styled={{
          state,
          variant,
          autoResize,
          width,
          height,
          minHeight,
          maxHeight,
          styles,
          disabled,
        }}
        contentEditable={!disabled}
        suppressContentEditableWarning
        data-placeholder={placeholder}
        aria-disabled={disabled}
        role="textbox"
        aria-label={ariaLabelledby ? undefined : finalAriaLabel}
        aria-labelledby={ariaLabelledby || htmlProps?.["aria-labelledby"]}
        aria-multiline="true"
        onInput={handleInput}
        {...(htmlProps as React.HTMLProps<HTMLDivElement>)}
      />
      <input
        ref={hiddenRef}
        type="hidden"
        name={name}
        defaultValue={value ?? ""}
      />
    </>
  );
};

export default FormTextArea;
