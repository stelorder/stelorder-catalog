import React from "react";
import { HtmlProps } from "../../styles/theme";
import { SimpleGrid } from "../../simple-grid";
import {
  StyledPaginationConfigInfo,
  StyledPaginationConfigPerPage,
  StyledPaginationConfigSelectScope,
} from "./pagination-config.style";
import { SelectOption } from "../../form/form-select/form-select-types";
import { Form } from "../../form";

export type PaginationConfigText = {
  listingTextTemplate: (
    firstElementPageNumber: number,
    lastElementPageNumber: number,
    lastElementNumber: number,
  ) => string;
  perPageText: string;
};

export type PaginationConfigProps = {
  paginationText?: PaginationConfigText;
  disabled?: boolean;
  firstElementPageNumber: number;
  lastElementPageNumber: number;
  lastElementNumber: number;
  elementsSelectId: string;
  elementsPerPage: SelectOption[];
  currentElementsPerPage: SelectOption;
  onChangeElementsPerPage: (elementsPerPageOption: SelectOption) => void;
} & HtmlProps<HTMLDivElement>;

const PaginationConfig: React.FC<PaginationConfigProps> = ({
  paginationText,
  disabled,
  firstElementPageNumber,
  lastElementPageNumber,
  lastElementNumber,
  elementsSelectId,
  elementsPerPage,
  onChangeElementsPerPage,
  currentElementsPerPage,
  htmlProps,
}) => {
  return (
    <SimpleGrid itemsPerLine={3} gap={8} htmlProps={htmlProps} alignY="center">
      <SimpleGrid.Item col="auto">
        <StyledPaginationConfigInfo>
          {paginationText?.listingTextTemplate(
            firstElementPageNumber,
            lastElementPageNumber,
            lastElementNumber,
          ) ||
            `Mostrando ${firstElementPageNumber} a ${lastElementPageNumber} de ${lastElementNumber}`}
        </StyledPaginationConfigInfo>
      </SimpleGrid.Item>
      <SimpleGrid.Item col="auto">
        <StyledPaginationConfigSelectScope id="scoped">
          <Form.Label htmlFor={elementsSelectId}>
            <Form.Select
              options={elementsPerPage}
              optionValue={currentElementsPerPage}
              handleChange={onChangeElementsPerPage}
              defaultOption={{ label: "Select...", value: "" }}
              htmlProps={{
                id: elementsSelectId,
                name: elementsSelectId,
                disabled: !!disabled,
              }}
            />
          </Form.Label>
        </StyledPaginationConfigSelectScope>
      </SimpleGrid.Item>
      <SimpleGrid.Item col="auto">
        <StyledPaginationConfigPerPage>
          {paginationText?.perPageText || "por página"}
        </StyledPaginationConfigPerPage>
      </SimpleGrid.Item>
    </SimpleGrid>
  );
};

export default PaginationConfig;
