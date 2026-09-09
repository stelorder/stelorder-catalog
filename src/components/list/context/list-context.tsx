import React, { PropsWithChildren, useMemo } from "react";

export type ListContextValue = {
  hasDivider?: boolean;
  level?: number;
  paddingBase?: number;
};

const Ctx = React.createContext<ListContextValue | undefined>(undefined);

export const ListProvider: React.FC<
  PropsWithChildren<{
    hasDivider?: boolean;
    level?: number;
    paddingBase?: number;
  }>
> = ({ hasDivider, level, paddingBase, children }) => {
  const context = useMemo(
    () => ({ hasDivider, level, paddingBase }),
    [hasDivider, level, paddingBase],
  );
  return <Ctx.Provider value={context}>{children}</Ctx.Provider>;
};

export const useListContext = (): ListContextValue => {
  return (
    React.useContext(Ctx) ?? { hasDivider: true, level: 0, paddingBase: 0 }
  );
};
