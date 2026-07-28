import React from "react";
import { SimpleGridProps } from "../simple-grid";

export const SimpleGridContext = React.createContext<
  SimpleGridProps | undefined
>(undefined);

export const useSimpleGridContext = () => {
  const context = React.useContext(SimpleGridContext);
  if (!context) {
    throw new Error(
      "useSimpleGridContext must be used within a SimpleGridProvider",
    );
  }
  return context;
};
