export type CalendarLocale = "es" | "en" | "fr";

export const MONTH_NAMES: Record<CalendarLocale, string[]> = {
  es: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  fr: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
};

export const DAY_NAMES: Record<CalendarLocale, string[]> = {
  es: ["lu", "ma", "mi", "ju", "vi", "sá", "do"],
  en: ["mo", "tu", "we", "th", "fr", "sa", "su"],
  fr: ["lu", "ma", "me", "je", "ve", "sa", "di"],
};

export const CANCEL_LABEL: Record<CalendarLocale, string> = {
  es: "Cancelar",
  en: "Cancel",
  fr: "Annuler",
};

export const ACCEPT_LABEL: Record<CalendarLocale, string> = {
  es: "Aceptar",
  en: "Accept",
  fr: "Valider",
};

export const PREV_MONTH_LABEL: Record<CalendarLocale, string> = {
  es: "Mes anterior",
  en: "Previous month",
  fr: "Mois précédent",
};

export const NEXT_MONTH_LABEL: Record<CalendarLocale, string> = {
  es: "Mes siguiente",
  en: "Next month",
  fr: "Mois suivant",
};

export const HOUR_LABEL: Record<CalendarLocale, string> = {
  es: "Hora:",
  en: "Hour:",
  fr: "Heure:",
};

export const MINUTE_LABEL: Record<CalendarLocale, string> = {
  es: "Minuto:",
  en: "Minute:",
  fr: "Minute:",
};

export const HOUR_INPUT_A11Y_LABEL: Record<CalendarLocale, string> = {
  es: "Hora",
  en: "Hour",
  fr: "Heure",
};

export const MINUTE_INPUT_A11Y_LABEL: Record<CalendarLocale, string> = {
  es: "Minuto",
  en: "Minute",
  fr: "Minute",
};

export const INC_HOUR_A11Y_LABEL: Record<CalendarLocale, string> = {
  es: "Incrementar hora",
  en: "Increment hour",
  fr: "Augmenter l'heure",
};

export const DEC_HOUR_A11Y_LABEL: Record<CalendarLocale, string> = {
  es: "Decrementar hora",
  en: "Decrement hour",
  fr: "Diminuer l'heure",
};

export const INC_MINUTE_A11Y_LABEL: Record<CalendarLocale, string> = {
  es: "Incrementar minuto",
  en: "Increment minute",
  fr: "Augmenter la minute",
};

export const DEC_MINUTE_A11Y_LABEL: Record<CalendarLocale, string> = {
  es: "Decrementar minuto",
  en: "Decrement minute",
  fr: "Diminuer la minute",
};
