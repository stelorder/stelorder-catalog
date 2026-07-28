/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import React, { useEffect, useId, useRef, useState } from "react";
import { HtmlProps } from "../styles/theme";
import { StyledPaginationContainer } from "./pagination.style";
import PaginationConfig, {
  PaginationConfigText,
} from "./pagination-config/pagination-config";
import { SelectOption } from "../form/form-select/form-select-types";
import PaginationControl, {
  PaginationControlText,
} from "./pagination-control/pagination-control";

export type PaginationText = {
  paginationConfigText?: PaginationConfigText;
  paginationControlText?: PaginationControlText;
};

export type PaginationConfigProps = {
  firstElementPageNumber: number;
  lastElementPageNumber: number;
  lastElementNumber: number;
};

export type PaginationProps = {
  paginationText?: PaginationText;
  fetchData: (
    page: number,
    elementsPerPage: number,
  ) => Promise<{ page: number; totalPages: number }>;
  disabled?: boolean;
  elementsPerPage: SelectOption[];
  paginationConfig: PaginationConfigProps;
  totalPages: number;
  onChangeIsLoading?: (isLoading: boolean) => void;
};

const Pagination: React.FC<PaginationProps & HtmlProps<HTMLDivElement>> = ({
  paginationText,
  fetchData,
  disabled,
  elementsPerPage,
  paginationConfig,
  totalPages,
  onChangeIsLoading,
  htmlProps,
}) => {
  const [page, setPage] = useState<Number>(1);
  const [totalPageState, setTotalPageState] = useState<number>(totalPages);
  const [pendingPage, setPendingPage] = useState<Number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSelectOption, setCurrentSelectOption] =
    useState<SelectOption | null>(null);
  const id = useId();
  const pageRef = useRef(page);

  useEffect(() => {
    pageRef.current = page;
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    if (onChangeIsLoading) {
      onChangeIsLoading(isLoading);
    }
  }, [isLoading, onChangeIsLoading]);

  // Lógica de actualización

  useEffect(() => {
    if (!currentSelectOption) return;
    setPendingPage(new Number(1));
  }, [currentSelectOption]);

  useEffect(() => {
    if (!pendingPage) return;
    setIsLoading(true);
    const fetchPage = async () => {
      try {
        const paginationData = await fetchData(
          pendingPage.valueOf(),
          currentSelectOption?.value &&
            !isNaN(Number(currentSelectOption.value))
            ? new Number(currentSelectOption.value).valueOf()
            : !isNaN(Number(elementsPerPage[0].value))
              ? Number(elementsPerPage[0].value)
              : 10,
        );

        setPage(new Number(paginationData.page));
        setTotalPageState(paginationData.totalPages);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setPendingPage(null);
      }
    };
    fetchPage();
  }, [pendingPage, currentSelectOption, elementsPerPage, fetchData]);

  return (
    <StyledPaginationContainer {...htmlProps}>
      <PaginationConfig
        {...paginationConfig}
        paginationText={paginationText?.paginationConfigText}
        disabled={disabled || isLoading}
        elementsSelectId={id}
        currentElementsPerPage={currentSelectOption ?? elementsPerPage[0]}
        onChangeElementsPerPage={(opt) => {
          if (disabled) return;
          setCurrentSelectOption(opt);
        }}
        elementsPerPage={elementsPerPage}
      />

      <PaginationControl
        paginationText={paginationText?.paginationControlText}
        currentPage={page.valueOf()}
        totalPages={totalPageState}
        disabled={disabled || isLoading}
        handleNextPage={() => {
          if (disabled) return;
          setPendingPage(page.valueOf() + 1);
        }}
        handlePreviousPage={() => {
          if (disabled) return;
          setPendingPage(page.valueOf() - 1);
        }}
        handleFirstPage={() => {
          if (disabled) return;
          setPendingPage(1);
        }}
        handleLastPage={() => {
          if (disabled) return;
          setPendingPage(totalPages);
        }}
      />
    </StyledPaginationContainer>
  );
};

export default Pagination;
