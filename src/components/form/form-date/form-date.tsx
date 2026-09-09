import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTheme } from "styled-components";

import { HtmlProps } from "../../styles/theme";
import { useFormGroupContext } from "../context/form-group-context";
import { CommonProps } from "../form-types";
import { mapState } from "../form-utils";

import {
  StyledCalendarDropdown,
  StyledDateDisplay,
  StyledDateInputContainer,
  StyledPlaceholderPart,
  StyledPlaceholderSlash,
} from "./form-date.style";

import { Icon } from "../../icon";
import { Calendar } from "../../calendar";
import { FormDateLocale } from "./form-date-types";

export type { FormDateLocale };

export type FormDateProps = {
  value?: string | string[];
  multiple?: boolean;
  placeholder?: string;
  locale?: FormDateLocale;
  minDate?: string;
  maxDate?: string;
  disabledDates?: string[];
  boxPosition?: "top" | "bottom";
  showTime?: boolean;
  onDateChange?: (value: string | string[]) => void;
} & CommonProps &
  HtmlProps<HTMLInputElement>;

const PLACEHOLDER_PARTS: Record<FormDateLocale, [string, string, string]> = {
  es: ["DD", "MM", "AAAA"],
  en: ["MM", "DD", "YYYY"],
  fr: ["JJ", "MM", "AAAA"],
};

const SELECT_DATE_LABEL: Record<FormDateLocale, string> = {
  es: "Seleccionar fecha",
  en: "Select date",
  fr: "Choisir une date",
};

type DateCell = { year: number; month: number; day: number };

function parseIso(iso: string): DateCell {
  const datePart = iso.split(" ")[0];
  const [y, m, d] = datePart.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

function formatDisplay(
  year: number,
  month: number,
  day: number,
  timePart: string,
  locale: FormDateLocale,
  showTime: boolean,
): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  const dateStr =
    locale === "en" ? `${mm}/${dd}/${year}` : `${dd}/${mm}/${year}`;
  if (showTime && timePart) {
    return `${dateStr} ${timePart}`;
  }
  return dateStr;
}

const FormDate: React.FC<FormDateProps> = ({
  value,
  multiple = false,
  placeholder,
  locale = "es",
  minDate,
  maxDate,
  disabledDates,
  boxPosition = "bottom",
  showTime = false,
  onDateChange,
  isValid,
  isInvalid,
  htmlProps,
}) => {
  const theme = useTheme();
  const { controlId } = useFormGroupContext();
  const resolvedId = htmlProps?.id ?? controlId;

  const [isOpen, setIsOpen] = useState(false);

  const normalizedValue = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const [selectedDates, setSelectedDates] = useState<string[]>(normalizedValue);

  useEffect(() => {
    setSelectedDates(normalizedValue);
  }, [normalizedValue]);

  const displayValue = useMemo(() => {
    if (selectedDates.length === 0) return "";
    return selectedDates
      .map((iso) => {
        const parts = iso.split(" ");
        const datePart = parts[0];
        const timePart = parts[1] || "";
        const { year, month, day } = parseIso(datePart);
        return formatDisplay(year, month, day, timePart, locale, !!showTime);
      })
      .join(", ");
  }, [selectedDates, locale, showTime]);

  const state = mapState(isValid, isInvalid);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const handleContainerClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!htmlProps?.disabled) {
        setIsOpen((prev) => !prev);
      }
    },
    [htmlProps?.disabled],
  );

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const dispatchHiddenInputChange = useCallback((val: string) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;
    if (hiddenInputRef.current && nativeInputValueSetter) {
      nativeInputValueSetter.call(hiddenInputRef.current, val);
      hiddenInputRef.current.dispatchEvent(
        new Event("input", { bubbles: true }),
      );
    }
  }, []);

  const handleAccept = useCallback(
    (acceptedVal: string | string[]) => {
      const datesArray = Array.isArray(acceptedVal)
        ? acceptedVal
        : acceptedVal
          ? [acceptedVal]
          : [];
      setSelectedDates(datesArray);

      const emitVal = multiple ? datesArray : (datesArray[0] ?? "");
      onDateChange?.(emitVal);

      const inputVal = datesArray.join(",");
      dispatchHiddenInputChange(inputVal);

      setIsOpen(false);
    },
    [multiple, onDateChange, dispatchHiddenInputChange],
  );

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const hiddenValue = useMemo(() => {
    return selectedDates.join(",");
  }, [selectedDates]);

  return (
    <StyledDateInputContainer
      $styled={{ state, isOpen }}
      ref={containerRef}
      onClick={handleContainerClick}
      className="form-control"
    >
      <input
        {...htmlProps}
        ref={hiddenInputRef}
        id={resolvedId}
        type="hidden"
        value={hiddenValue}
        readOnly
      />

      <StyledDateDisplay
        $styled={{ disabled: !!htmlProps?.disabled }}
        tabIndex={htmlProps?.disabled ? -1 : 0}
        role="combobox"
        aria-label={
          (htmlProps?.["aria-label"] as string | undefined) ||
          placeholder ||
          SELECT_DATE_LABEL[locale]
        }
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onKeyDown={(e: { key: string; preventDefault: () => void }) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!htmlProps?.disabled) {
              setIsOpen((prev) => !prev);
            }
          }
          if (e.key === "Escape") setIsOpen(false);
        }}
      >
        {displayValue ||
          (placeholder ? (
            <StyledPlaceholderPart>{placeholder}</StyledPlaceholderPart>
          ) : (
            <>
              <StyledPlaceholderPart>
                {PLACEHOLDER_PARTS[locale][0]}
              </StyledPlaceholderPart>
              <StyledPlaceholderSlash>{" / "}</StyledPlaceholderSlash>
              <StyledPlaceholderPart>
                {PLACEHOLDER_PARTS[locale][1]}
              </StyledPlaceholderPart>
              <StyledPlaceholderSlash>{" / "}</StyledPlaceholderSlash>
              <StyledPlaceholderPart>
                {PLACEHOLDER_PARTS[locale][2]}
              </StyledPlaceholderPart>
              {showTime && (
                <>
                  <StyledPlaceholderSlash>{"  "}</StyledPlaceholderSlash>
                  <StyledPlaceholderPart>{"00:00"}</StyledPlaceholderPart>
                </>
              )}
            </>
          ))}
      </StyledDateDisplay>

      {isValid && (
        <Icon
          variant="check"
          color={theme.colors.alertSuccess.alertSuccess100}
          width="18px"
          height="18px"
        />
      )}
      {isInvalid && (
        <Icon
          variant="markPadding"
          color={theme.colors.alertError.alertError100}
          width="18px"
          height="18px"
        />
      )}

      <StyledCalendarDropdown $styled={{ isOpen, boxPosition }}>
        <Calendar
          value={multiple ? selectedDates : (selectedDates[0] ?? undefined)}
          multiple={multiple}
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          isOpen={isOpen}
          showTime={showTime}
          onAccept={handleAccept}
          onCancel={handleCancel}
        />
      </StyledCalendarDropdown>
    </StyledDateInputContainer>
  );
};

export default FormDate;
