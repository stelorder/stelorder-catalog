import React, { PropsWithChildren, useMemo } from "react";

export type ListContextValue = {
  hasDivider?: boolean;
};

const Ctx = React.createContext<ListContextValue | undefined>(undefined);

export const ListProvider: React.FC<
  PropsWithChildren<{ hasDivider?: boolean }>
> = ({ hasDivider, children }) => {
  const context = useMemo(() => ({ hasDivider }), [hasDivider]);
  return <Ctx.Provider value={context}>{children}</Ctx.Provider>;
};

export const useListContext = (): ListContextValue => {
  return React.useContext(Ctx) ?? { hasDivider: true };
};
