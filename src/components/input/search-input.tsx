import { HtmlProps } from "../styles/theme";
import {
  StyledSearchInput,
  StyledSearchInputShell,
} from "./search-input.style";
import React, { PropsWithChildren, ReactNode } from "react";

export type SearchInputSize = "m" | "l" | "xl";

/**
 * Aspecto del campo:
 * - `filled` (por defecto): fondo gris claro, sin borde, radio 8px.
 * - `outlined`: caja blanca de 30px con borde suave y radio 6px; el texto se
 *   refuerza en hover/foco y el borde pasa a `orderPrimary90` al enfocar.
 *   Pensada para buscadores sobre barras de cabecera.
 */
export type SearchInputVariant = "filled" | "outlined";

export type SearchInputProps = {
  size?: SearchInputSize;
  variant?: SearchInputVariant;
  /** Ocupa el ancho disponible en lugar del ancho fijo del `size`. */
  fluid?: boolean;
  /**
   * Contenido fijo a la izquierda del campo (normalmente un `Icon` de lupa).
   * Al pasarlo, el aspecto de la variante lo dibuja la caja que agrupa adorno y
   * campo, y el campo queda transparente dentro de ella.
   */
  startAdornment?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  children,
  size = "m",
  variant = "filled",
  fluid = false,
  startAdornment,
  value,
  onChange,
  placeholder,
  htmlProps,
  ...rest
}: PropsWithChildren<SearchInputProps & HtmlProps<HTMLInputElement>>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const field = (
    <StyledSearchInput
      type="text"
      $styled={{ size, variant, fluid, inShell: startAdornment !== undefined }}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      {...htmlProps}
      {...rest}
    >
      {children}
    </StyledSearchInput>
  );

  if (startAdornment === undefined) {
    return field;
  }

  return (
    <StyledSearchInputShell $styled={{ size, variant, fluid }}>
      {startAdornment}
      {field}
    </StyledSearchInputShell>
  );
}
