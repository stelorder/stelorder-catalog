import React, { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Icon } from "../icon";
import {
  CalendarLocale,
  MONTH_NAMES,
  DAY_NAMES,
  CANCEL_LABEL,
  ACCEPT_LABEL,
  PREV_MONTH_LABEL,
  NEXT_MONTH_LABEL,
  HOUR_LABEL,
  MINUTE_LABEL,
  HOUR_INPUT_A11Y_LABEL,
  MINUTE_INPUT_A11Y_LABEL,
  INC_HOUR_A11Y_LABEL,
  DEC_HOUR_A11Y_LABEL,
  INC_MINUTE_A11Y_LABEL,
  DEC_MINUTE_A11Y_LABEL,
} from "./translations";

import { Button } from "../button";
import {
  StyledCalendarContainer,
  StyledCalendarDay,
  StyledCalendarDayName,
  StyledCalendarDayNamesRow,
  StyledCalendarEmptyCell,
  StyledCalendarFooter,
  StyledCalendarGrid,
  StyledCalendarHeader,
  StyledCalendarMonthYear,
  StyledCalendarNavButton,
  StyledTimeSelectionRow,
  StyledTimeFieldContainer,
  StyledTimeFieldLabel,
  StyledTimeFieldInputWrapper,
  StyledTimeInput,
  StyledSpinnerContainer,
  StyledSpinnerButton,
} from "./calendar.style";

export type { CalendarLocale } from "./translations";

export type CalendarProps = {
  value?: string | string[];
  multiple?: boolean;
  locale?: CalendarLocale;
  minDate?: string;
  maxDate?: string;
  disabledDates?: string[] | ((isoDate: string) => boolean);
  isOpen?: boolean;
  showTime?: boolean;
  onAccept?: (value: string | string[]) => void;
  onCancel?: () => void;
};

type DateCell = { year: number; month: number; day: number };
type DateCellWithTime = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

function parseValueString(val: string): DateCellWithTime {
  const [datePart, timePart] = val.split(" ");
  const [y, m, d] = (datePart || "").split("-").map(Number);
  const [h, min] = (timePart || "").split(":").map(Number);

  const now = new Date();
  return {
    year: Number.isNaN(y) ? now.getFullYear() : y,
    month: Number.isNaN(m) ? now.getMonth() : m - 1,
    day: Number.isNaN(d) ? now.getDate() : d,
    hour: Number.isNaN(h) ? now.getHours() : h,
    minute: Number.isNaN(min) ? now.getMinutes() : min,
  };
}

function formatMonthYear(
  year: number,
  month: number,
  locale: CalendarLocale,
): string {
  return `${MONTH_NAMES[locale][month]} ${year}`;
}

function buildCalendarDays(
  year: number,
  month: number,
): { emptyCount: number; days: DateCell[] } {
  const firstDay = new Date(year, month, 1).getDay();
  const emptyCount = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return {
    emptyCount,
    days: Array.from({ length: daysInMonth }, (_, i) => ({
      year,
      month,
      day: i + 1,
    })),
  };
}

function toIso(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function formatValueString(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  showTime: boolean,
): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  const dateStr = `${year}-${mm}-${dd}`;
  if (showTime) {
    const hh = String(hour).padStart(2, "0");
    const minStr = String(minute).padStart(2, "0");
    return `${dateStr} ${hh}:${minStr}`;
  }
  return dateStr;
}

function isWeekendDay(year: number, month: number, day: number): boolean {
  const dow = new Date(year, month, day).getDay();
  return dow === 0 || dow === 6;
}

export const Calendar: React.FC<CalendarProps> = ({
  value,
  multiple = false,
  locale = "es",
  minDate,
  maxDate,
  disabledDates,
  isOpen,
  showTime = false,
  onAccept,
  onCancel,
}) => {
  const today = useMemo(() => new Date(), []);

  const normalizedValue = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const [pendingDates, setPendingDates] = useState<string[]>(normalizedValue);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const id = useId();

  const [selectedHour, setSelectedHour] = useState<number>(() => {
    if (normalizedValue.length > 0) {
      return parseValueString(normalizedValue[0]).hour;
    }
    return today.getHours();
  });

  const [selectedMinute, setSelectedMinute] = useState<number>(() => {
    if (normalizedValue.length > 0) {
      return parseValueString(normalizedValue[0]).minute;
    }
    return today.getMinutes();
  });

  const [hourInput, setHourInput] = useState(() =>
    String(selectedHour).padStart(2, "0"),
  );
  const [minuteInput, setMinuteInput] = useState(() =>
    String(selectedMinute).padStart(2, "0"),
  );

  useEffect(() => {
    setHourInput(String(selectedHour).padStart(2, "0"));
  }, [selectedHour]);

  useEffect(() => {
    setMinuteInput(String(selectedMinute).padStart(2, "0"));
  }, [selectedMinute]);

  useEffect(() => {
    if (isOpen || isOpen === undefined) {
      setPendingDates(normalizedValue);
      if (normalizedValue.length > 0) {
        const firstParsed = parseValueString(normalizedValue[0]);
        setViewYear(firstParsed.year);
        setViewMonth(firstParsed.month);
        setSelectedHour(firstParsed.hour);
        setSelectedMinute(firstParsed.minute);
      } else {
        setViewYear(today.getFullYear());
        setViewMonth(today.getMonth());
        setSelectedHour(today.getHours());
        setSelectedMinute(today.getMinutes());
      }
    }
  }, [isOpen, normalizedValue, today]);

  const checkDisabledDate = useCallback(
    (iso: string): boolean => {
      if (typeof disabledDates === "function") {
        return disabledDates(iso);
      } else if (Array.isArray(disabledDates)) {
        return disabledDates.includes(iso);
      }
      return false;
    },
    [disabledDates],
  );

  const updatePendingTimes = useCallback(
    (h: number, m: number) => {
      setPendingDates((prev) => {
        return prev.map((val) => {
          const parsed = parseValueString(val);
          return formatValueString(
            parsed.year,
            parsed.month,
            parsed.day,
            h,
            m,
            showTime,
          );
        });
      });
    },
    [showTime],
  );

  const handleHourChange = useCallback(
    (newHour: number) => {
      setSelectedHour(newHour);
      updatePendingTimes(newHour, selectedMinute);
    },
    [selectedMinute, updatePendingTimes],
  );

  const handleMinuteChange = useCallback(
    (newMinute: number) => {
      setSelectedMinute(newMinute);
      updatePendingTimes(selectedHour, newMinute);
    },
    [selectedHour, updatePendingTimes],
  );

  const handleHourInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === "") {
        setHourInput("");
        return;
      }
      if (/^\d{1,2}$/.test(val)) {
        setHourInput(val);

        const num = Number.parseInt(val, 10);
        if (val.length === 2) {
          if (num >= 0 && num <= 23) {
            handleHourChange(num);
          } else {
            setHourInput("23");
            handleHourChange(23);
          }
        }
      }
    },
    [handleHourChange],
  );

  const handleHourInputBlur = useCallback(() => {
    if (hourInput === "") {
      setHourInput(String(selectedHour).padStart(2, "0"));
      return;
    }
    const num = Number.parseInt(hourInput, 10);
    if (!Number.isNaN(num) && num >= 0 && num <= 23) {
      const padded = String(num).padStart(2, "0");
      setHourInput(padded);
      handleHourChange(num);
    } else {
      setHourInput(String(selectedHour).padStart(2, "0"));
    }
  }, [hourInput, selectedHour, handleHourChange]);

  const handleMinuteInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === "") {
        setMinuteInput("");
        return;
      }
      if (/^\d{1,2}$/.test(val)) {
        setMinuteInput(val);

        const num = Number.parseInt(val, 10);
        if (val.length === 2) {
          if (num >= 0 && num <= 59) {
            handleMinuteChange(num);
          } else {
            setMinuteInput("59");
            handleMinuteChange(59);
          }
        }
      }
    },
    [handleMinuteChange],
  );

  const handleMinuteInputBlur = useCallback(() => {
    if (minuteInput === "") {
      setMinuteInput(String(selectedMinute).padStart(2, "0"));
      return;
    }
    const num = Number.parseInt(minuteInput, 10);
    if (!Number.isNaN(num) && num >= 0 && num <= 59) {
      const padded = String(num).padStart(2, "0");
      setMinuteInput(padded);
      handleMinuteChange(num);
    } else {
      setMinuteInput(String(selectedMinute).padStart(2, "0"));
    }
  }, [minuteInput, selectedMinute, handleMinuteChange]);

  const incrementHour = useCallback(() => {
    const next = (selectedHour + 1) % 24;
    handleHourChange(next);
  }, [selectedHour, handleHourChange]);

  const decrementHour = useCallback(() => {
    const next = (selectedHour - 1 + 24) % 24;
    handleHourChange(next);
  }, [selectedHour, handleHourChange]);

  const incrementMinute = useCallback(() => {
    const next = (selectedMinute + 1) % 60;
    handleMinuteChange(next);
  }, [selectedMinute, handleMinuteChange]);

  const decrementMinute = useCallback(() => {
    const next = (selectedMinute - 1 + 60) % 60;
    handleMinuteChange(next);
  }, [selectedMinute, handleMinuteChange]);

  const handlePrevMonth = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const handleNextMonth = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const handleDayClick = useCallback(
    (e: React.MouseEvent, cell: DateCell) => {
      e.stopPropagation();
      const dateStr = toIso(cell.year, cell.month, cell.day);
      if (minDate && dateStr < minDate.split(" ")[0]) return;
      if (maxDate && dateStr > maxDate.split(" ")[0]) return;
      if (disabledDates && checkDisabledDate(dateStr)) return;

      setPendingDates((prev) => {
        const matchesDay = (d: string) => d.startsWith(dateStr);
        if (multiple) {
          const exists = prev.some(matchesDay);
          if (exists) {
            return prev.filter((d) => !matchesDay(d));
          } else {
            const formatted = formatValueString(
              cell.year,
              cell.month,
              cell.day,
              selectedHour,
              selectedMinute,
              showTime,
            );
            return [...prev, formatted].sort((a, b) => a.localeCompare(b));
          }
        } else {
          const formatted = formatValueString(
            cell.year,
            cell.month,
            cell.day,
            selectedHour,
            selectedMinute,
            showTime,
          );
          return [formatted];
        }
      });
    },
    [
      minDate,
      maxDate,
      multiple,
      disabledDates,
      checkDisabledDate,
      selectedHour,
      selectedMinute,
      showTime,
    ],
  );

  const handleAcceptClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple) {
        onAccept?.(pendingDates);
      } else if (pendingDates.length > 0) {
        onAccept?.(pendingDates[0]);
      } else {
        onAccept?.("");
      }
    },
    [pendingDates, multiple, onAccept],
  );

  const handleCancelClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onCancel?.();
    },
    [onCancel],
  );

  const { emptyCount, days } = useMemo(
    () => buildCalendarDays(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  return (
    <StyledCalendarContainer onClick={(e) => e.stopPropagation()}>
      <StyledCalendarHeader>
        <StyledCalendarNavButton
          type="button"
          aria-label={PREV_MONTH_LABEL[locale]}
          onClick={handlePrevMonth}
        >
          <Icon
            variant="chevron-right_left"
            color="#FA6B00"
            width="18px"
            height="18px"
          />
        </StyledCalendarNavButton>

        <StyledCalendarMonthYear>
          {formatMonthYear(viewYear, viewMonth, locale)}
        </StyledCalendarMonthYear>

        <StyledCalendarNavButton
          type="button"
          aria-label={NEXT_MONTH_LABEL[locale]}
          onClick={handleNextMonth}
        >
          <Icon
            variant="chevron-left_right"
            color="#FA6B00"
            width="18px"
            height="18px"
          />
        </StyledCalendarNavButton>
      </StyledCalendarHeader>

      <StyledCalendarDayNamesRow>
        {DAY_NAMES[locale].map((name) => (
          <StyledCalendarDayName key={name}>{name}</StyledCalendarDayName>
        ))}
      </StyledCalendarDayNamesRow>

      <StyledCalendarGrid>
        {Array.from({ length: emptyCount }, (_, i) => (
          <StyledCalendarEmptyCell key={`${id}-empty-${i}`} />
        ))}

        {days.map((cell) => {
          const iso = toIso(cell.year, cell.month, cell.day);
          const isDisabled =
            !!(minDate && iso < minDate.split(" ")[0]) ||
            !!(maxDate && iso > maxDate.split(" ")[0]);
          const isDisabledDate = !!disabledDates && checkDisabledDate(iso);
          const isPending = pendingDates.some((d) => d.startsWith(iso));
          const isWeekend = isWeekendDay(cell.year, cell.month, cell.day);

          const todayIso = toIso(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          );
          const isToday = iso === todayIso;
          const isBeforeToday = iso < todayIso;

          return (
            <StyledCalendarDay
              key={iso}
              type="button"
              $styled={{
                isPending,
                isWeekend,
                disabled: isDisabled,
                isDisabledDate,
                isToday,
                isBeforeToday,
              }}
              disabled={isDisabled || isDisabledDate}
              aria-label={iso}
              aria-pressed={isPending}
              onClick={(e) => handleDayClick(e, cell)}
            >
              {cell.day}
            </StyledCalendarDay>
          );
        })}
      </StyledCalendarGrid>

      {showTime && (
        <StyledTimeSelectionRow>
          <StyledTimeFieldContainer>
            <StyledTimeFieldLabel>{HOUR_LABEL[locale]}</StyledTimeFieldLabel>
            <StyledTimeFieldInputWrapper>
              <StyledTimeInput
                type="text"
                value={hourInput}
                onChange={handleHourInputChange}
                onBlur={handleHourInputBlur}
                aria-label={HOUR_INPUT_A11Y_LABEL[locale]}
              />
              <StyledSpinnerContainer>
                <StyledSpinnerButton
                  type="button"
                  onClick={incrementHour}
                  aria-label={INC_HOUR_A11Y_LABEL[locale]}
                >
                  <Icon
                    variant="chevron-up"
                    color="inherit"
                    stroke="#FA6B00"
                    width="18px"
                    height="18px"
                  />
                </StyledSpinnerButton>
                <StyledSpinnerButton
                  type="button"
                  onClick={decrementHour}
                  aria-label={DEC_HOUR_A11Y_LABEL[locale]}
                >
                  <Icon
                    variant="chevron-down"
                    color="inherit"
                    stroke="#FA6B00"
                    width="18px"
                    height="18px"
                  />
                </StyledSpinnerButton>
              </StyledSpinnerContainer>
            </StyledTimeFieldInputWrapper>
          </StyledTimeFieldContainer>

          <StyledTimeFieldContainer>
            <StyledTimeFieldLabel>{MINUTE_LABEL[locale]}</StyledTimeFieldLabel>
            <StyledTimeFieldInputWrapper>
              <StyledTimeInput
                type="text"
                value={minuteInput}
                onChange={handleMinuteInputChange}
                onBlur={handleMinuteInputBlur}
                aria-label={MINUTE_INPUT_A11Y_LABEL[locale]}
              />
              <StyledSpinnerContainer>
                <StyledSpinnerButton
                  type="button"
                  onClick={incrementMinute}
                  aria-label={INC_MINUTE_A11Y_LABEL[locale]}
                >
                  <Icon
                    variant="chevron-up"
                    color="inherit"
                    stroke="#FA6B00"
                    width="18px"
                    height="18px"
                  />
                </StyledSpinnerButton>
                <StyledSpinnerButton
                  type="button"
                  onClick={decrementMinute}
                  aria-label={DEC_MINUTE_A11Y_LABEL[locale]}
                >
                  <Icon
                    variant="chevron-down"
                    color="inherit"
                    stroke="#FA6B00"
                    width="18px"
                    height="18px"
                  />
                </StyledSpinnerButton>
              </StyledSpinnerContainer>
            </StyledTimeFieldInputWrapper>
          </StyledTimeFieldContainer>
        </StyledTimeSelectionRow>
      )}

      <StyledCalendarFooter>
        <Button
          variant="gray"
          htmlProps={{
            type: "button",
            onClick: handleCancelClick,
            style: {
              flex: "1 1 0",
              height: "40px",
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          {CANCEL_LABEL[locale]}
        </Button>
        <Button
          variant="secondary"
          htmlProps={{
            type: "button",
            onClick: handleAcceptClick,
            style: {
              flex: "1 1 0",
              height: "40px",
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          {ACCEPT_LABEL[locale]}
        </Button>
      </StyledCalendarFooter>
    </StyledCalendarContainer>
  );
};

export default Calendar;
