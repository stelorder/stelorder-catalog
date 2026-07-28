import React from "react";
import { SimpleGrid } from "../../simple-grid";
import { HtmlProps } from "../../styles/theme";
import {
  StyledArrowControl,
  StyledCurrentPageControl,
  StyledNormalControl,
} from "./pagination-control.style";

export type PaginationControlText = {
  firstPage: string;
  lastPage: string;
};

export type PaginationControlProps = {
  paginationText?: PaginationControlText;
  currentPage: number;
  totalPages: number;
  disabled?: boolean;
  handleNextPage?: () => void;
  handlePreviousPage?: () => void;
  handleFirstPage?: () => void;
  handleLastPage?: () => void;
} & HtmlProps<HTMLDivElement>;

const PaginationControl: React.FC<PaginationControlProps> = ({
  paginationText,
  currentPage,
  totalPages,
  disabled,
  handleNextPage,
  handlePreviousPage,
  handleFirstPage,
  handleLastPage,
  htmlProps,
}) => {
  return (
    <SimpleGrid
      itemsPerLine={5}
      gap={8}
      htmlProps={{
        ...htmlProps,
        role: "navigation",
        "aria-label": "Pagination Navigation",
        style: { ...htmlProps?.style, width: "auto" },
      }}
    >
      <SimpleGrid.Item col="auto">
        <StyledNormalControl
          onClick={() =>
            !disabled && currentPage > 1 && handleFirstPage && handleFirstPage()
          }
          disabled={disabled || !handleFirstPage || currentPage <= 1}
        >
          {paginationText?.firstPage || "Primera"}
        </StyledNormalControl>
      </SimpleGrid.Item>
      <SimpleGrid.Item col="auto">
        <StyledArrowControl
          $styled={{ type: "prev" }}
          onClick={() =>
            !disabled &&
            handlePreviousPage &&
            currentPage > 1 &&
            handlePreviousPage()
          }
          className={
            disabled || !handlePreviousPage || currentPage <= 1
              ? "disabled"
              : ""
          }
        />
      </SimpleGrid.Item>
      <SimpleGrid.Item col="auto">
        <StyledCurrentPageControl>{currentPage}</StyledCurrentPageControl>
      </SimpleGrid.Item>
      <SimpleGrid.Item col="auto">
        <StyledArrowControl
          $styled={{ type: "next" }}
          onClick={() =>
            !disabled &&
            handleNextPage &&
            currentPage < totalPages &&
            handleNextPage()
          }
          className={
            disabled || !handleNextPage || currentPage >= totalPages
              ? "disabled"
              : ""
          }
        />
      </SimpleGrid.Item>
      <SimpleGrid.Item col="auto">
        <StyledNormalControl
          onClick={() =>
            !disabled &&
            handleLastPage &&
            currentPage < totalPages &&
            handleLastPage()
          }
          disabled={disabled || !handleLastPage || currentPage >= totalPages}
        >
          {paginationText?.lastPage || "Última"}
        </StyledNormalControl>
      </SimpleGrid.Item>
    </SimpleGrid>
  );
};

export default PaginationControl;
