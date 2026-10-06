import React, { HtmlHTMLAttributes, PropsWithChildren } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledSearchableTable } from "./searchable-table.style";
import SearchInput from "../input";
import { StyledTableWrapper } from "../table/table.style";
import Icon from "../icon/icon";

interface SearchableTableProps extends HtmlHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

const SearchableTable: React.FC<SearchableTableProps> = ({
  children,
  ...htmlProps
}) => {
  return (
    <StyledTableWrapper>
      <StyledSearchableTable {...htmlProps}>{children}</StyledSearchableTable>
    </StyledTableWrapper>
  );
};

const SortIcon = ({ currentSort }: { currentSort?: "asc" | "desc" | null }) => {
  if (currentSort === "asc")
    return <Icon variant="sort-asc" aria-hidden="true" />;
  if (currentSort === "desc")
    return <Icon variant="sort-desc" aria-hidden="true" />;
  return <Icon variant="sort-ini" aria-hidden="true" />;
};

// Columna CON búsqueda
interface SearchableColumnProps extends PropsWithChildren<
  HtmlProps<HTMLTableCellElement>
> {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
  sortButtonAriaLabel?: string;
}

export const SearchableColumn: React.FC<SearchableColumnProps> = ({
  children,
  placeholder = "Buscar...",
  value = "",
  onChange,
  sortable = false,
  sortDirection,
  onSort,
  sortButtonAriaLabel = "Ordenar",
  htmlProps,
}) => {
  return (
    <th {...htmlProps}>
      <div>
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {children}
          {sortable && (
            <button
              onClick={onSort}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              type="button"
              aria-label={sortButtonAriaLabel}
            >
              <SortIcon currentSort={sortDirection} />
            </button>
          )}
        </span>
        <SearchInput
          value={value}
          onChange={(v) => onChange?.(v)}
          placeholder={placeholder}
          size="m"
          htmlProps={{
            style: {
              width: "100%",
              boxSizing: "border-box",
            },
          }}
        />
      </div>
    </th>
  );
};

// Columna SIN búsqueda
interface ColumnProps extends PropsWithChildren<
  HtmlProps<HTMLTableCellElement>
> {
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
  sortButtonAriaLabel?: string;
}

export const Column: React.FC<ColumnProps> = ({
  children,
  sortable = false,
  sortDirection,
  onSort,
  sortButtonAriaLabel = "Ordenar",
  htmlProps,
}) => {
  return (
    <th {...htmlProps}>
      <div>
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {children}
          {sortable && (
            <button
              onClick={onSort}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              type="button"
              aria-label={sortButtonAriaLabel}
            >
              <SortIcon currentSort={sortDirection} />
            </button>
          )}
        </span>
      </div>
    </th>
  );
};

type ActionColumnProps = PropsWithChildren<HtmlProps<HTMLTableCellElement>>;

export const ActionColumn: React.FC<ActionColumnProps> = ({
  children,
  htmlProps,
}) => {
  return (
    <th data-action-column="true" style={htmlProps?.style} {...htmlProps}>
      {children}
    </th>
  );
};

export default SearchableTable;
